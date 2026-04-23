import os
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_community.vectorstores import Chroma
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()

def get_answer(question: str) -> str:
    embeddings = OpenAIEmbeddings(model='text-embedding-3-small')
    db = Chroma(
        persist_directory="chroma_db", 
        embedding_function=embeddings
    )
    
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        api_key=os.getenv("OPENAI_API_KEY")
    )

    retriever = db.as_retriever(search_kwargs={"k": 3})

    prompt = ChatPromptTemplate.from_template("""
        You are Harshit Kumar Mehta's personal AI assistant on his portfolio website.
        Your job is to answer questions about Harshit — his skills, projects, experience,
        personality, and background.

        Answer based only on the context below. If the answer is not in the context,
        say "I don't have that information, but you can reach Harshit at hkmehta2874@gmail.com"

        Context:
        {context}

        Question: {question}

        Answer in a friendly, conversational tone as if you represent Harshit.
    """)
    
    docs = retriever.invoke(question)
    context = "\n".join(d.page_content for d in docs)
    
    response = llm.invoke(prompt.format(context=context, question=question))
    return response.content
