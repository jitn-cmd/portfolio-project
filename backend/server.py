from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone

# Email imports
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


# ==============================
# ENV LOAD
# ==============================

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ==============================
# MONGODB CONNECTION
# ==============================

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# ==============================
# FASTAPI INIT
# ==============================

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ==============================
# MODELS
# ==============================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str
    email: str
    message: str


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ==============================
# EMAIL FUNCTION (Professional HTML)
# ==============================

def send_email(name: str, email: str, message: str):
    sender = os.getenv("EMAIL_USER")
    password = os.getenv("EMAIL_PASS")

    if not sender or not password:
        logger.error("Email credentials missing in .env")
        return

    msg = MIMEMultipart("alternative")
    msg["From"] = sender
    msg["To"] = sender
    msg["Subject"] = f"📩 New Portfolio Contact: {name}"

    # Plain text fallback (best practice)
    text_content = f"""
New Contact Form Submission

Name: {name}
Email: {email}

Message:
{message}
"""

    # Professional HTML Template
    html_content = f"""
    <html>
      <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6fb;">
        <div style="max-width:600px; margin:40px auto; background:white; border-radius:8px; padding:30px; box-shadow:0 5px 15px rgba(0,0,0,0.05);">

          <h2 style="text-align:center; color:#5b6cff; margin-bottom:30px;">
            New Contact Form Submission
          </h2>

          <div style="background:#f7f8fc; padding:15px 20px; border-radius:6px; margin-bottom:20px;">
            <p style="margin:5px 0;"><strong>Name:</strong> {name}</p>
            <p style="margin:5px 0;"><strong>Email:</strong> 
              <a href="mailto:{email}" style="color:#5b6cff; text-decoration:none;">
                {email}
              </a>
            </p>
          </div>

          <div style="border-left:4px solid #5b6cff; padding-left:15px; margin-top:20px;">
            <h4 style="margin-bottom:10px;">Message:</h4>
            <p style="color:#444; line-height:1.6;">
              {message}
            </p>
          </div>

          <hr style="margin:30px 0; border:none; border-top:1px solid #eee;">

          <p style="font-size:12px; color:#999; text-align:center;">
            This message was sent from your portfolio contact form
          </p>

        </div>
      </body>
    </html>
    """

    msg.attach(MIMEText(text_content, "plain"))
    msg.attach(MIMEText(html_content, "html"))

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()
    server.login(sender, password)
    server.send_message(msg)
    server.quit()


# ==============================
# ROUTES
# ==============================

@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check["timestamp"], str):
            check["timestamp"] = datetime.fromisoformat(check["timestamp"])
    return status_checks


@api_router.post("/contact", response_model=Contact)
async def create_contact(input: ContactCreate):
    contact_obj = Contact(**input.model_dump())
    doc = contact_obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()

    # Save to MongoDB
    await db.contacts.insert_one(doc)

    # Send Professional Email
    send_email(contact_obj.name, contact_obj.email, contact_obj.message)

    return contact_obj


# ==============================
# APP CONFIG
# ==============================

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()