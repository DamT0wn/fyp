"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


class InterviewBase(BaseModel):
    pass


class InterviewCreate(InterviewBase):
    eye_contact_score: float
    head_stability_score: float
    smile_score: float
    face_presence_percentage: float
    speech_rate: float
    filler_percentage: float
    pitch_mean: float
    pitch_variance: float
    energy_stability: float
    confidence_score: int
    strengths: Optional[str] = None
    improvements: Optional[str] = None
    video_duration: Optional[float] = None
    transcript: Optional[str] = None


class InterviewResponse(InterviewBase):
    id: int
    timestamp: datetime
    eye_contact_score: float
    head_stability_score: float
    smile_score: float
    face_presence_percentage: float
    speech_rate: float
    filler_percentage: float
    pitch_mean: float
    pitch_variance: float
    energy_stability: float
    confidence_score: int
    strengths: Optional[str]
    improvements: Optional[str]
    video_duration: Optional[float]
    transcript: Optional[str]

    class Config:
        from_attributes = True


# User schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str


class UserCreate(UserBase):
    password: str
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(UserBase):
    id: int
    full_name: Optional[str]
    created_at: datetime
    resume_filename: Optional[str]
    resume_uploaded_at: Optional[datetime]
    phone: Optional[str]
    location: Optional[str]
    is_active: int
    profile_picture: Optional[str] = None
    google_id: Optional[str] = None
    oauth_provider: Optional[str] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


class TokenData(BaseModel):
    email: Optional[str] = None


class ResumeUploadResponse(BaseModel):
    message: str
    filename: str
    resume_text: str
    uploaded_at: datetime



class AnalysisResult(BaseModel):
    """Analysis result schema for video processing"""
    confidence_score: int
    eye_contact_score: float
    head_stability_score: float
    smile_score: float
    face_presence_percentage: float
    speech_rate: float
    filler_percentage: float
    pitch_mean: float
    pitch_variance: float
    energy_stability: float
    strengths: Optional[str] = None
    improvements: Optional[str] = None
    video_duration: Optional[float] = None
    transcript: Optional[str] = None



class FacialMetrics(BaseModel):
    """Facial analysis metrics"""
    eye_contact_score: float
    head_stability_score: float
    smile_score: float
    face_presence_percentage: float


class SpeechMetrics(BaseModel):
    """Speech analysis metrics"""
    speech_rate: float
    filler_percentage: float
    pitch_mean: float
    pitch_variance: float
    energy_stability: float


class HistoryResponse(BaseModel):
    """Interview history response"""
    interviews: List[InterviewResponse]
    total: int

    class Config:
        from_attributes = True
