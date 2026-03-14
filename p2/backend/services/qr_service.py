import qrcode
import base64
from io import BytesIO


def generate_qr_base64(data: str) -> str:
    # Create QR code
    qr = qrcode.QRCode(
        version=1,
        box_size=10,
        border=4
    )

    qr.add_data(data)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    # Save image to memory
    buffer = BytesIO()
    img.save(buffer, format="PNG")

    # Convert to Base64
    qr_base64 = base64.b64encode(buffer.getvalue()).decode("utf-8")

    return qr_base64