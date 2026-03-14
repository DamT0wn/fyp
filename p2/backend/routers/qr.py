from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import qrcode
from io import BytesIO

router = APIRouter()


class QRRequest(BaseModel):
    url: str


@router.post("/generate-qr")
def generate_qr(data: QRRequest):
    # Create QR code
    img = qrcode.make(data.url)

    # Save to memory
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)

    # Return image directly
    return StreamingResponse(buffer, media_type="image/png")