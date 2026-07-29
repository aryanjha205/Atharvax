from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from .database import engine, Base, get_db
from sqlalchemy.orm import Session
from . import models

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Atharvax API", version="1.0.0")

# CORS setup for Vercel
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AdminLoginRequest(BaseModel):
    pin: str

@app.post("/api/admin/login")
async def admin_login(req: AdminLoginRequest):
    admin_pin = os.getenv("ADMIN_PIN", "70458")
    if req.pin == admin_pin:
        # In a real app, generate and return a JWT token here
        return {"success": True, "token": "admin-demo-token-123"}
    raise HTTPException(status_code=401, detail="Invalid PIN")

from sqlalchemy import text

@app.get("/api/health")
async def health_check(db: Session = Depends(get_db)):
    # Check DB connection
    db_status = "ok"
    try:
        db.execute(text("SELECT 1"))
    except Exception:
        db_status = "error"
    return {"status": "ok", "service": "Atharvax API", "database": db_status}

@app.get("/api")
async def root():
    return {"message": "Welcome to Atharvax API"}

# We will import other routers here later as we build them out
