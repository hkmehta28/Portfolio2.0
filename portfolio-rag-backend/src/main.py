from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from src.models import QuestionRequest
from src.rag_engine import get_answer

app = FastAPI(
    title="Harshit's Portfolio RAG API",
    description="AI chatbot backend for Harshit Kumar Mehta's portfolio",
    version="1.0.0"
)

# ── Allow Next.js frontend to call this API ──
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace * with your frontend URL in production
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

    return StreamingResponse(get_answer(request.question), media_type="text/plain")