from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from src.models import QuestionRequest
from src.rag_engine import get_answer

# ── Fix for SQLite version on Render (required for ChromaDB) ──
import sys
try:
    __import__('pysqlite3')
    sys.modules['sqlite3'] = sys.modules.pop('pysqlite3')
except ImportError:
    pass

app = FastAPI(
    title="Harshit's Portfolio RAG API",
    description="AI chatbot backend for Harshit Kumar Mehta's portfolio",
    version="1.0.0"
)

# ── Allow Next.js frontend to call this API ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://portfolio2-0-eta-blue.vercel.app"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "Harshit's RAG backend is running!"}


@app.post("/ask")
async def ask(request: QuestionRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question cannot be empty")

    return StreamingResponse(
        get_answer(request.question), 
        media_type="text/plain",
        headers={
            "X-Accel-Buffering": "no",  # Disable buffering for Nginx/Proxies
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )