# 🔍 TruthLens AI

### AI-Powered Fake News Detection & Claim Analysis

TruthLens AI is a full-stack web application that uses **Google Gemini AI** to analyze news content and provide an AI-assisted assessment of potentially misleading information.

It provides **prediction, confidence score, AI explanation, extracted claims, claim analysis, authentication, analysis history, and PDF reports**.

Website Link : https://truthlens-ai-nine-gold.vercel.app/

---

## ✨ Features

- 🤖 **AI News Analysis** — Analyze news articles using Google Gemini
- 📊 **Prediction & Confidence** — View classification and confidence score
- 🧠 **AI Explanation** — Understand why the content received its prediction
- 📌 **Claim Extraction** — Extract important claims from articles
- 🔎 **Claim Analysis** — Analyze individual claims
- 🔐 **JWT Authentication** — Secure registration and login
- 📚 **Analysis History** — Store, view, and delete previous analyses
- 📄 **PDF Reports** — Generate downloadable analysis reports
- 🔔 **Toast Notifications** — User-friendly success/error feedback
- 🌐 **Cloud Deployment** — Frontend and backend deployed independently

---

## 🏗️ Architecture

```text
              ┌──────────────┐
              │     User     │
              └──────┬───────┘
                     │
                     ▼
          ┌────────────────────┐
          │ React + Vite       │
          │ Frontend           │
          └─────────┬──────────┘
                    │ Axios
                    ▼
          ┌────────────────────┐
          │ FastAPI Backend    │
          │ Python             │
          └──────┬─────┬───────┘
                 │     │
          ┌──────▼─┐ ┌─▼─────────┐
          │ Gemini │ │ SQLite +  │
          │  API   │ │ SQLAlchemy│
          └────────┘ └───────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Python
- FastAPI
- Uvicorn
- SQLAlchemy
- Pydantic
- JWT
- Google Gemini API

### Database
- SQLite
- SQLAlchemy ORM

### Deployment
- GitHub
- Vercel
- Render

---

## 📂 Project Structure

```text
truthlens-ai/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── api/
│   ├── models/
│   ├── schemas/
│   ├── services/
│   ├── database.py
│   ├── app.py
│   └── requirements.txt
│
├── .gitignore
└── README.md
```

---

## 🔄 How It Works

```text
News Article
     ↓
FastAPI API
     ↓
Gemini AI
     ↓
┌─────────────────────┐
│ Prediction          │
│ Confidence          │
│ AI Explanation      │
│ Extracted Claims    │
│ Claim Analysis      │
└─────────────────────┘
     ↓
Save Analysis
     ↓
User History / PDF
```

---

## 🔐 Authentication

TruthLens AI uses **JWT-based authentication**.

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Protected API Requests
   ↓
User-Specific History
```

Authenticated requests use:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Backend health check |
| `POST` | `/auth/register` | Register user |
| `POST` | `/auth/login` | Login user |
| `POST` | `/analyze` | Analyze news |
| `GET` | `/analysis/history` | Get user history |
| `DELETE` | `/analysis/{id}` | Delete analysis |

Interactive API documentation:

```text
/docs
```

---

## 🚀 Local Setup

### 1. Clone

```bash
git clone https://github.com/AtharvCodeCraft/truthlens-ai.git
cd truthlens-ai
```

### 2. Backend

```bash
cd backend
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `backend/.env`:

```env
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
FRONTEND_URL=http://localhost:5173
```

Run:

```bash
python -m uvicorn app:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Run:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🌐 Deployment

### Frontend — Vercel

Environment variable:

```env
VITE_API_URL=https://your-backend-url
```

Build command:

```bash
npm run build
```

Output directory:

```text
dist
```

### Backend — Render

Build command:

```bash
pip install -r requirements.txt
```

Start command:

```bash
uvicorn app:app --host 0.0.0.0 --port $PORT
```

Environment variables:

```env
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
FRONTEND_URL=https://your-frontend-url
```

---

## 🛡️ Security

- JWT authentication
- Password hashing
- Protected API endpoints
- User-specific analysis history
- CORS configuration
- Environment variables for secrets
- Gemini API key kept on the backend
- `.env` excluded from Git

**Never commit API keys or `.env` files to GitHub.**

---

## 📈 Current Status

- [x] React frontend
- [x] FastAPI backend
- [x] Gemini AI integration
- [x] News analysis
- [x] Claim extraction
- [x] AI explanation
- [x] Confidence score
- [x] JWT authentication
- [x] User registration/login
- [x] Analysis history
- [x] Delete analysis
- [x] PDF reports
- [x] CORS configuration
- [x] Frontend deployment
- [x] Backend deployment

---

## 🔮 Future Improvements

- [ ] Real-time web fact verification
- [ ] News URL analysis
- [ ] Source credibility scoring
- [ ] Supporting/contradicting evidence
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Browser extension
- [ ] Automated testing
- [ ] API rate limiting
- [ ] Production monitoring

---

## ⚠️ Disclaimer

TruthLens AI is an **AI-assisted information analysis tool**.

A result such as **"Likely Fake"** does not prove that the information is false, and **"Likely Real"** does not guarantee that it is true.

Important claims should always be verified using reliable and authoritative sources.

---

## 👨‍💻 Author

**Atharv Patil**

Computer Engineering Student  
Cloud Computing & Automation

**Interests:** AI • Full-Stack Development • Cloud Computing • DevOps • Automation • DSA

---

## ⭐ Support

If you find TruthLens AI useful, consider giving the repository a ⭐ on GitHub.

---

### 📜 License

Developed for educational, research, and demonstration purposes.
