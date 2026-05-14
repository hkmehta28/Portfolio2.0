# 🧠 Portfolio — AI-Powered Personal Portfolio with RAG Chatbot

> A modern personal portfolio with an embedded RAG-based AI chatbot that answers questions about me — built with FastAPI, LangChain, ChromaDB, and OpenAI.

🔗 **Live:** [portfolio2-0-eta-blue.vercel.app](https://portfolio2-0-eta-blue.vercel.app/)

---

## 📌 Overview

Portfolio 2.0 is not just a static portfolio — it features an intelligent chatbot trained on my personal data (resume, projects, skills, experience) that can answer recruiter and developer questions in real time. The chatbot uses a **Retrieval-Augmented Generation (RAG)** pipeline to fetch relevant context from a vector store and generate accurate, grounded responses via OpenAI's language models.

---

## ✨ Features

- **RAG-based AI Chatbot** — answers questions about my skills, projects, and background using retrieved context, not hallucinated facts
- **Streaming Responses** — token-by-token streaming for a fast, conversational feel
- **Semantic Search** — ChromaDB vector store with OpenAI embeddings for high-relevance document retrieval
- **FastAPI Backend** — lightweight, async Python backend serving the chatbot API
- **LangChain Orchestration** — modular chain construction for retrieval + generation
- **React Frontend** — clean, responsive UI with the chatbot embedded directly in the portfolio

---

## 🏗️ Architecture

```
User Question
      │
      ▼
  React Frontend
      │  (HTTP / streaming)
      ▼
  FastAPI Backend
      │
      ├──► LangChain RetrievalQA Chain
      │         │
      │         ├──► ChromaDB (vector store)
      │         │       └── OpenAI Embeddings
      │         │
      │         └──► OpenAI LLM (GPT)
      │                 └── Streamed response
      ▼
  Answer rendered in UI
```

---

## 🛠️ Tech Stack

| Layer             | Technology                      |
| ----------------- | ------------------------------- |
| Frontend          | React.js, CSS                   |
| Backend           | FastAPI (Python)                |
| RAG Orchestration | LangChain                       |
| Vector Store      | ChromaDB (in-memory)            |
| Embeddings        | OpenAI `text-embedding-ada-002` |
| LLM               | OpenAI GPT (via LangChain)      |
| Deployment        | Vercel (frontend)               |

---

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- OpenAI API key

### 1. Clone the repo

```bash
git clone https://github.com/hkmehta28/Portfolio2.0.git
cd Portfolio2.0
```

### 2. Backend setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend will be available at `http://localhost:8000`.

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`.

---

## 💬 How the Chatbot Works

1. **Data Ingestion** — Personal documents (resume, project descriptions, bio) are loaded and split into chunks using LangChain's text splitters.
2. **Embedding** — Each chunk is converted into a vector using OpenAI embeddings and stored in ChromaDB.
3. **Retrieval** — When a user asks a question, the top-k most semantically relevant chunks are retrieved from ChromaDB.
4. **Generation** — The retrieved context is passed to the OpenAI LLM via a LangChain chain, which generates a grounded, accurate response.
5. **Streaming** — The response is streamed token-by-token back to the frontend for a real-time experience.

---

## 🔑 Environment Variables

| Variable         | Description         |
| ---------------- | ------------------- |
| `OPENAI_API_KEY` | Your OpenAI API key |

---

## 📈 What I Learned / Key Decisions

- **In-memory ChromaDB** — chose in-memory initialization for simplicity in a serverless-adjacent deployment; avoids persistent disk dependency
- **Streaming via FastAPI** — used `StreamingResponse` with a generator to pipe LangChain's streaming output directly to the client
- **RAG over fine-tuning** — RAG was the right choice here: my personal data changes frequently, and RAG allows updates without retraining
- **LangChain `RetrievalQA`** — used the chain abstraction to keep retrieval and generation cleanly decoupled

---

## 👤 About Me

**Harshit Kumar Mehta** — Final-year CSE student at Chandigarh University, passionate about Generative AI Engineering. I build RAG pipelines, LangChain applications, and full-stack AI products.

- 🌐 [Portfolio](https://portfolio2-0-eta-blue.vercel.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/hkmehta28/)
- 🐙 [GitHub](https://github.com/hkmehta28)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
