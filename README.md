# Office Calm Chatbot (Python + Gemini)

This is a small web chatbot that:

- Uses **Gemini (LLM)** via your **Gemini API key**
- Runs a **hidden admin/developer “analysis” step** on the server before generating the user-facing reply
- Supports **Kannada** responses when the user writes Kannada

## Setup (Windows)

1) Open PowerShell in this folder:

`d:\v\office-calm-chatbot`

2) Create virtual environment and install deps:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3) Create `.env` file (copy from `.env.example`) and add your key:

```text
GEMINI_API_KEY=YOUR_KEY_HERE
GEMINI_MODEL=gemini-1.5-flash
```

4) Run the server:

```powershell
uvicorn app:app --reload
```

5) Open:

`http://127.0.0.1:8000`

## Where the “admin/developer prompt” lives

All hidden prompts are only in `app.py`:

- `ADMIN_ANALYSIS_PROMPT` (internal analysis JSON)
- `DEVELOPER_RESPONSE_PROMPT` (final reply rules)

The browser never receives these prompts.

