"""
File validation utilities for secure file uploads
"""
import os
from fastapi import HTTPException, UploadFile
from typing import List, Optional

# Try to import magic, but make it optional
try:
    import magic
    MAGIC_AVAILABLE = True
except ImportError:
    MAGIC_AVAILABLE = False
    print("⚠️  Warning: python-magic not available. MIME type validation will be skipped.")

# File size limits (in bytes)
MAX_RESUME_SIZE = 5 * 1024 * 1024  # 5MB
MAX_VIDEO_SIZE = 100 * 1024 * 1024  # 100MB
MAX_AUDIO_SIZE = 50 * 1024 * 1024  # 50MB

# Allowed MIME types
ALLOWED_RESUME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
]

ALLOWED_VIDEO_TYPES = [
    'video/mp4',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
    'video/x-matroska'
]

ALLOWED_AUDIO_TYPES = [
    'audio/mpeg',
    'audio/wav',
    'audio/x-wav',
    'audio/mp4',
    'audio/webm'
]

# Allowed file extensions
ALLOWED_RESUME_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt']
ALLOWED_VIDEO_EXTENSIONS = ['.mp4', '.mov', '.avi', '.webm', '.mkv']
ALLOWED_AUDIO_EXTENSIONS = ['.mp3', '.wav', '.m4a', '.webm']


class FileValidator:
    """File validation class with comprehensive security checks"""
    
    @staticmethod
    def validate_file_size(file_size: int, max_size: int, file_type: str = "File") -> None:
        """Validate file size"""
        if file_size > max_size:
            max_size_mb = max_size / (1024 * 1024)
            actual_size_mb = file_size / (1024 * 1024)
            raise HTTPException(
                status_code=413,
                detail=f"{file_type} size ({actual_size_mb:.2f}MB) exceeds maximum allowed size ({max_size_mb:.0f}MB)"
            )
    
    @staticmethod
    def validate_file_extension(filename: str, allowed_extensions: List[str]) -> None:
        """Validate file extension"""
        file_ext = os.path.splitext(filename)[1].lower()
        if file_ext not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail=f"File extension '{file_ext}' not allowed. Allowed extensions: {', '.join(allowed_extensions)}"
            )
    
    @staticmethod
    def validate_mime_type(file_path: str, allowed_types: List[str]) -> None:
        """Validate MIME type using python-magic (checks file content, not just extension)"""
        if not MAGIC_AVAILABLE:
            print(f"⚠️  MIME type validation skipped (python-magic not available)")
            return
        
        try:
            mime = magic.Magic(mime=True)
            detected_type = mime.from_file(file_path)
            
            if detected_type not in allowed_types:
                raise HTTPException(
                    status_code=400,
                    detail=f"File type '{detected_type}' not allowed. This may indicate a security risk."
                )
        except Exception as e:
            # If magic fails, we'll rely on extension validation
            print(f"MIME type detection failed: {str(e)}")
    
    @staticmethod
    def validate_filename(filename: str) -> str:
        """Sanitize and validate filename"""
        # Remove any path components
        filename = os.path.basename(filename)
        
        # Remove or replace dangerous characters
        dangerous_chars = ['..', '/', '\\', '<', '>', ':', '"', '|', '?', '*']
        for char in dangerous_chars:
            filename = filename.replace(char, '_')
        
        # Ensure filename is not empty
        if not filename or filename == '_':
            raise HTTPException(
                status_code=400,
                detail="Invalid filename"
            )
        
        return filename
    
    @staticmethod
    async def validate_resume(file: UploadFile) -> None:
        """Comprehensive resume file validation"""
        # Validate filename
        safe_filename = FileValidator.validate_filename(file.filename)
        
        # Validate extension
        FileValidator.validate_file_extension(safe_filename, ALLOWED_RESUME_EXTENSIONS)
        
        # Read file to check size
        content = await file.read()
        file_size = len(content)
        
        # Reset file pointer
        await file.seek(0)
        
        # Validate size
        FileValidator.validate_file_size(file_size, MAX_RESUME_SIZE, "Resume")
    
    @staticmethod
    async def validate_video(file: UploadFile) -> None:
        """Comprehensive video file validation"""
        # Validate filename
        safe_filename = FileValidator.validate_filename(file.filename)
        
        # Validate extension
        FileValidator.validate_file_extension(safe_filename, ALLOWED_VIDEO_EXTENSIONS)
        
        # Read file to check size
        content = await file.read()
        file_size = len(content)
        
        # Reset file pointer
        await file.seek(0)
        
        # Validate size
        FileValidator.validate_file_size(file_size, MAX_VIDEO_SIZE, "Video")
    
    @staticmethod
    async def validate_audio(file: UploadFile) -> None:
        """Comprehensive audio file validation"""
        # Validate filename
        safe_filename = FileValidator.validate_filename(file.filename)
        
        # Validate extension
        FileValidator.validate_file_extension(safe_filename, ALLOWED_AUDIO_EXTENSIONS)
        
        # Read file to check size
        content = await file.read()
        file_size = len(content)
        
        # Reset file pointer
        await file.seek(0)
        
        # Validate size
        FileValidator.validate_file_size(file_size, MAX_AUDIO_SIZE, "Audio")


def validate_resume_file(file: UploadFile) -> None:
    """Quick validation for resume files (synchronous)"""
    safe_filename = FileValidator.validate_filename(file.filename)
    FileValidator.validate_file_extension(safe_filename, ALLOWED_RESUME_EXTENSIONS)


def validate_video_file(file: UploadFile) -> None:
    """Quick validation for video files (synchronous)"""
    safe_filename = FileValidator.validate_filename(file.filename)
    FileValidator.validate_file_extension(safe_filename, ALLOWED_VIDEO_EXTENSIONS)
