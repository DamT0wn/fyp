"""
Quick migration script to add MFA columns to existing database
"""
import sqlite3

db_path = "interview_analyzer.db"

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    # Add mfa_enabled column
    cursor.execute("ALTER TABLE users ADD COLUMN mfa_enabled BOOLEAN DEFAULT 0")
    print("✓ Added mfa_enabled column")
except sqlite3.OperationalError as e:
    print(f"mfa_enabled column might already exist: {e}")

try:
    # Add mfa_secret column
    cursor.execute("ALTER TABLE users ADD COLUMN mfa_secret TEXT")
    print("✓ Added mfa_secret column")
except sqlite3.OperationalError as e:
    print(f"mfa_secret column might already exist: {e}")

conn.commit()
conn.close()

print("\n✓ Migration complete! Restart your server.")
