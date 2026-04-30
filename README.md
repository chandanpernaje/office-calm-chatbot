# 🧘 Office Calm Chatbot

An AI-powered chatbot to help office workers manage **workplace stress**, **anger**, and **conflicts**. Built with **FastAPI**, **MongoDB**, and **Google Gemini AI**.

🔗 **Live:** [office-calm-chatbot.vercel.app](https://office-calm-chatbot.vercel.app)

---

## ✨ Features

- 🤖 **AI-driven emotional analysis** — Two-step Gemini pipeline (hidden analysis → empathetic response)
- 🔒 **Topic-focused** — Only answers office stress/workplace questions; rejects off-topic queries
- 💾 **Chat history** — MongoDB-backed session management with sidebar navigation
- 🌐 **Multi-lingual** — English, Hindi, and Kannada support
- 🆘 **Crisis detection** — Flags self-harm language and provides emergency resources
- 📱 **Responsive UI** — Dark glassmorphism theme, mobile-friendly

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React, Vite, Tailwind CSS / Vanilla CSS, Lucide Icons, Google Fonts (Inter) |
| **Backend** | Python 3.10+, FastAPI, Uvicorn |
| **AI/ML** | Google Gemini 2.5 Flash, google-generativeai SDK |
| **Database** | MongoDB, PyMongo |

---

## 📁 Project Structure

```
office-calm-chatbot/
├── app.py                  # Main FastAPI application
├── .env                    # API keys & config (not in git)
├── requirements.txt        # Python dependencies
├── vercel.json             # Vercel deployment config
├── agents/
│   ├── db.py               # MongoDB connection helpers
│   └── ...
├── templates/
│   └── index.html          # Jinja2 HTML template
└── static/
    └── style.css           # Dark theme styles
```

---

## 🚀 Setup Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/chandanpernaje/office-calm-chatbot.git
   cd office-calm-chatbot
   ```

2. **Create virtual environment & install dependencies:**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate        # Windows
   pip install -r requirements.txt
   ```

3. **Configure environment** — Create a `.env` file:
   ```env
   GEMINI_API_KEY=your_google_ai_key
   GEMINI_MODEL=gemini-1.5-flash
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB=office_calm_chatbot
   ```

4. **Start MongoDB** (must be running locally)

5. **Run the server:**
   ```bash
   uvicorn app:app --reload --port 9000
   ```

6. **Open:** [http://127.0.0.1:9000](http://127.0.0.1:9000)

---

## 📡 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/` | Main chat UI |
| `POST` | `/api/chat` | Send message & get AI response |
| `POST` | `/api/sessions/create` | Create new chat session |
| `GET` | `/api/sessions` | List all sessions |
| `GET` | `/api/sessions/{id}/history` | Get session messages |
| `DELETE` | `/api/sessions/{id}` | Delete a session |

---

## ☁️ Deploy to Vercel

1. Push to GitHub
2. Connect repo in [Vercel Dashboard](https://vercel.com)
3. Add environment variables:
   - `GEMINI_API_KEY` — Your Google AI Studio key
   - `GEMINI_MODEL` — e.g. `gemini-1.5-flash`
   - `MONGO_URI` — MongoDB Atlas connection string
   - `MONGO_DB` — Database name
4. Deploy automatically on push!
