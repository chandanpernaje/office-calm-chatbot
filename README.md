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


## ? Features Implemented

### 1. Topic Validation — Office Stress Only
- **Strict Scope Enforcement**: Uses an internal AI analyzer step to block non-office topics.
- **Polite Rejection**: Off-topic messages (weather, jokes, recipes, coding, etc.) get politely rejected with a message explaining the chatbot's scope.
- **Tested Accuracy**: "What is the weather today?" ? ? Rejected | "My boss shouted at me" ? ? Answered

### 2. Backend Chat History (MongoDB)
- **Persistent Sessions**: New chat_sessions collection stores all conversations.
- **Schema**: Each session stores session_id, 	itle, messages[], and timestamps.
- **RESTful API**: Endpoints include POST /api/sessions/create, GET /api/sessions, GET /api/sessions/{id}/history, and DELETE /api/sessions/{id}.
- **AI Memory**: Chat history is automatically used as context for multi-turn Gemini responses.

### 3. Input Validation
- **Empty Message Protection**: Prevents submission of empty queries.
- **Character Limits**: Maximum 2000 character limit (with character counter built into the UI).
- **Dual Validation**: Full validation enforced on both the frontend and backend.

### 4. Premium UI Redesign
- **Sidebar Navigation**: Complete session management sidebar with historical chats and delete options.
- **Welcome Screen**: Clean interface with floating icons, quick-start query chips, and scope tags.
- **Modern Messaging**: Message bubbles with User/Bot labels and avatars.
- **Dark Theme**: Premium indigo dark theme with glassmorphism effects and soft shadows.
- **Fully Responsive**: Mobile-first design with a sliding hamburger menu.
