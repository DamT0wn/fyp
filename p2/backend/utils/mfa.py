import pyotp
import qrcode
import base64
from io import BytesIO


# -----------------------------
# Generate MFA Secret + QR Code
# -----------------------------
def generate_mfa_setup(email: str):
    """
    Create a secret key and QR code for authenticator apps.
    """
    secret = pyotp.random_base32()
    totp = pyotp.TOTP(secret)
    uri = totp.provisioning_uri(
        name=email,
        issuer_name="Intrex"
    )
    
    # Print URI for verification
    print(f"MFA URI: {uri}")
    print(f"URI Length: {len(uri)}")
    
    # Generate QR with explicit size control
    qr = qrcode.QRCode(
        version=1,  # Smallest version that fits
        error_correction=qrcode.constants.ERROR_CORRECT_L,  # Low error correction = simpler QR
        box_size=10,
        border=4,
    )
    qr.add_data(uri)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffer = BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)
    
    qr_base64 = base64.b64encode(buffer.getvalue()).decode()
    
    print(f"Base64 length: {len(qr_base64)}")
    
    return {
        "secret": secret,
        "qr_code": qr_base64
    }


# -----------------------------
# Verify OTP Code
# -----------------------------
def verify_mfa_code(secret: str, code: str) -> bool:
    """
    Verify a 6-digit OTP code from authenticator app.
    """
    totp = pyotp.TOTP(secret)
    return totp.verify(code)
