import os
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from dotenv import load_dotenv

load_dotenv()

import asyncio
from typing import AsyncGenerator

# Initialize embeddings and DB globally to avoid reloading on every request
llm = ChatOpenAI(
    model="gpt-4o-mini",
    streaming=True,
    temperature=0
)

def build_db():
    loader = TextLoader('data/Harshit_Kumar_Mehta_RAG_KnowledgeBase.txt', encoding="utf-8")
    data = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(data)
    embeddings = OpenAIEmbeddings(model='text-embedding-3-small')
    return Chroma.from_documents(chunks, embeddings) # No persist_directory = in-memory

db = build_db()
retriever = db.as_retriever(search_kwargs={"k": 5})

async def get_answer(question: str) -> AsyncGenerator[str, None]:

    prompt = ChatPromptTemplate.from_messages([
        ("system", """You are a STRICT retrieval-based assistant for answering questions about Harshit Kumar Mehta.

    Your job is to answer ONLY using the provided Context. The Context is the single source of truth.

    ========================
    CRITICAL RULES
    ========================

    1. STRICT CONTEXT USAGE
    - Use ONLY the information explicitly present in the Context.
    - This applies to ALL topics: projects, skills, education, personality, hobbies, career goals, etc.

    2. ZERO HALLUCINATION
    - Do NOT add, assume, infer, or guess anything.
    - Do NOT introduce any new facts, technologies, numbers, or experiences.

    3. NO INFORMATION MIXING
    - Keep information from different sections separate.
    - Do NOT combine unrelated details.
    - Do NOT assign information from one topic to another incorrectly.

    4. PRESERVE ACCURACY
    - Do NOT modify names, tools, metrics, or descriptions.
    - Do NOT summarize aggressively or distort meaning.

    5. RESPONSE STYLE
    - Answer clearly, concisely, and conversationally.
    - Keep information structured and easy to read.
    - Use bullet points (-) for lists.
    - Do NOT use heavy markdown headers like ### or ####. Use simple bold text for emphasis instead.
    - Do NOT dump the entire resume. Answer specifically what was asked.

    6. STRICT FALLBACK (VERY IMPORTANT)
    - If the answer is NOT explicitly present in the Context, respond EXACTLY with:

    "I don't have those specific details. You can contact Harshit at hkmehta2874@gmail.com."

    - Do NOT try to partially answer.
    - Do NOT guess.
    - Do NOT give generic knowledge.

    7. NO EXTRA KNOWLEDGE
    - Even if you know the answer from general knowledge, DO NOT use it.
    - Only use the Context.

    ========================

    Context:
    {context}
    """),
        ("user", "{question}")
    ])
    
    docs = await retriever.ainvoke(question)
    context = "\n".join(d.page_content for d in docs)
    
    # Fail-safe: If no context is found, force the bot to admit it
    if not context.strip():
        yield "I don't have those details. Contact Harshit at hkmehta2874@gmail.com."
        return
    
    async for chunk in llm.astream(prompt.format_messages(context=context, question=question)):
        if chunk.content:
            yield chunk.content
