# Firebase Quick Start - 5 Minutes ⚡

Get Firebase authentication running in 5 minutes. Follow these steps exactly.

## ⏱️ Timeline
- **Step 1:** Create Firebase project (1 min)
- **Step 2:** Get credentials (1 min)
- **Step 3:** Update .env.local (1 min)
- **Step 4:** Enable auth methods (1 min)
- **Step 5:** Test (1 min)

---

## Step 1: Create Firebase Project (1 min)

1. Go to https://console.firebase.google.com/
2. Click **"Create a project"**
3. Enter project name: `Intrex`
4. Click **"Continue"**
5. Disable Google Analytics (optional)
6. Click **"Create project"**
7. Wait for project to be created (~30 seconds)

✅ **Done!** You now have a Firebase project.

---

## Step 2: Get Your Credentials (1 min)

1. In Firebase Console, click the **gear icon** (Settings) in top-left
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **"Web"** icon (looks like `</>`
5. Register app with name: `Intrex`
6. Click **"Register app"**
7. Copy the entire config object that appears

**Your config looks like this:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "intrex-abc123.firebaseapp.com",
  projectId: "intrex-abc123",
  storageBucket: "intrex-abc123.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123..."
};
```

✅ **Done!** You have your credentials.

---

## Step 3: Update .env.local (1 min)

1. Open `p2/frontend/.env.local`
2. Replace the placeholder values with your credentials:

```env
VITE_GOOGLE_CLIENT_ID=1022280350068-as9rh8oltbvvv7dojgb5dfvucpc0dfvb.apps.googleusercontent.com

# Firebase Configuration - REPLACE THESE
VITE_FIREBASE_API_KEY=AIzaSyD...
VITE_FIREBASE_AUTH_DOMAIN=intrex-abc123.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=intrex-abc123
VITE_FIREBASE_STORAGE_BUCKET=intrex-abc123.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123...
```

**Mapping:**
- `apiKey` → `VITE_FIREBASE_API_KEY`
- `authDomain` → `VITE_FIREBASE_AUTH_DOMAIN`
- `projectId` → `VITE_FIREBASE_PROJECT_ID`
- `storageBucket` → `VITE_FIREBASE_STORAGE_BUCKET`
- `messagingSenderId` → `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `appId` → `VITE_FIREBASE_APP_ID`

✅ **Done!** Credentials are configured.

---

## Step 4: Enable Authentication Methods (1 min)

### Enable Email/Password:
1. In Firebase Console, go to **"Authentication"** (left sidebar)
2. Click **"Get started"**
3. Click **"Email/Password"** provider
4. Toggle **"Enable"** to ON
5. Click **"Save"**

### Enable Google:
1. Click **"Google"** provider
2. Toggle **"Enable"** to ON
3. Enter project support email (any email is fine)
4. Click **"Save"**

### Add Your Domain:
1. Go to **"Settings"** tab in Authentication
2. Scroll to **"Authorized domains"**
3. Click **"Add domain"**
4. Enter: `localhost:5173`
5. Click **"Add"**

✅ **Done!** Authentication is enabled.

---

## Step 5: Test It (1 min)

### Start the servers:
```bash
# Terminal 1: Backend
cd p2/backend
python main.py

# Terminal 2: Frontend
cd p2/frontend
npm run dev
```

### Test Firebase Login:
1. Open http://localhost:5173/firebase-login
2. Click **"Create Account"** → go to signup
3. Enter:
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `password123`
   - Confirm: `password123`
4. Click **"Create Account"**
5. You should be redirected to dashboard ✅

### Test Google Login:
1. Go back to http://localhost:5173/firebase-login
2. Click **"Sign in with Google"**
3. Complete Google authentication
4. You should be redirected to dashboard ✅

---

## ✅ You're Done!

Firebase authentication is now working! 

### What You Can Do Now:
- ✅ Sign up with email/password
- ✅ Sign in with email/password
- ✅ Sign in with Google
- ✅ Stay logged in after refresh
- ✅ Access protected routes

### Routes Available:
- `/firebase-login` - Login page
- `/firebase-signup` - Signup page
- `/dashboard` - Protected dashboard

---

## 🐛 Troubleshooting

### "Firebase is not defined"
```bash
npm install firebase
```

### "VITE_FIREBASE_API_KEY is undefined"
- Check `.env.local` has all 6 Firebase variables
- Restart `npm run dev`

### "Auth domain mismatch"
- In Firebase Console > Authentication > Settings
- Add `localhost:5173` to Authorized domains

### "Google login not working"
- Make sure Google provider is enabled in Firebase
- Check `localhost:5173` is in authorized domains

### "Can't create account"
- Make sure Email/Password provider is enabled
- Check password is at least 6 characters

---

## 📚 Next Steps

### Optional: Backend Integration
To verify Firebase tokens in your backend:

```python
from firebase_admin import auth

def verify_firebase_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
```

### Optional: Production Deployment
1. Create a production Firebase project
2. Update `.env.local` with production credentials
3. Add production domain to authorized domains
4. Deploy frontend and backend

---

## 📞 Need Help?

- **Firebase Docs:** https://firebase.google.com/docs/auth
- **Firebase Console:** https://console.firebase.google.com/
- **React Firebase:** https://github.com/CSFrequency/react-firebase-hooks

---

## Summary

You now have:
- ✅ Firebase project created
- ✅ Email/password authentication
- ✅ Google OAuth authentication
- ✅ Persistent login sessions
- ✅ Protected routes
- ✅ Working authentication system

**Total time: ~5 minutes** ⚡

Enjoy your Firebase-powered authentication! 🚀
