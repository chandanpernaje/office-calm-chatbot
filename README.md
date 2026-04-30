# Office Calm Chatbot

An AI-powered chatbot to help office workers manage stress, anger, and conflict. Built with FastAPI, MongoDB, and Google Gemini.

## Features
- AI-driven emotional analysis.
- Multi-lingual support (English, Kannada, Hindi).
- Practical calming and communication strategies.
- Automatic Purchase Order (PO) creation from emails.

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
   MONGO_DB=office_procurement
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

## API Endpoints
- `POST /api/chat`: Chat with the AI.
- `POST /api/purchase/process_email`: Process procurement emails.
- `GET /api/purchase/orders`: List created POs.
