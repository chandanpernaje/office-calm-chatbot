# Office Calm Chatbot

An AI-powered chatbot to help office workers manage stress, anger, and conflict. Built with FastAPI, MongoDB, and Google Gemini.

## 🛠️ Tech Stack
- **Backend:** Python 3.12, FastAPI, Uvicorn
- **Frontend:** HTML5, CSS3 (Vanilla, No Frameworks), Vanilla JavaScript
- **Database:** MongoDB (PyMongo)
- **AI Model:** Google Gemini 1.5 Flash
- **Deployment:** Vercel (Serverless Functions)

## Features
- AI-driven emotional analysis.
- Multi-lingual support (English, Kannada, Hindi).
- Practical calming and communication strategies.
- Strict scope validation enforcing office-stress only topics.

## Setup Locally
1. **Clone the repo.**
2. **Install requirements:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Configure Environment:** Create a `.env` file in the root:
   ```env
   GEMINI_API_KEY=your_key_here
   MONGO_URI=mongodb://localhost:27017
   MONGO_DB=office_calm_db
   ```
4. **Run:**
   ```bash
   python -m uvicorn app:app --reload
   ```

## Deploying to Vercel
This project is configured for Vercel using `vercel.json`.

1. **Environment Variables**: Add these in the Vercel Dashboard:
   - `GEMINI_API_KEY`: Your Google AI Studio key.
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `MONGO_DB`: Your database name.
2. **Push to GitHub**: Connect your repo to Vercel, and it will deploy automatically.
