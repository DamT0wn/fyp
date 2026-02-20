"""
FastAPI main application entry point
Handles CORS, routing, and application lifecycle
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from routers import upload, live, results
from database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Interview Analyzer",
    description="Local AI-powered interview analysis system",
    version="1.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory if it doesn't exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("temp", exist_ok=True)

# Include routers
app.include_router(upload.router, prefix="/api", tags=["upload"])
app.include_router(live.router, prefix="/api", tags=["live"])
app.include_router(results.router, prefix="/api", tags=["results"])

@app.get("/")
def read_root():
    return {"message": "AI Interview Analyzer API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
