import os
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv

load_dotenv()

import shutil

def ingest():
    loader = TextLoader("data/Harshit_Kumar_Mehta_RAG_KnowledgeBase.txt", encoding="utf-8")
    data = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(data)
    print(f'Total chunks created: {len(chunks)}')
    
    # Clear old database to prevent appending duplicates or old chunk sizes
    if os.path.exists("chroma_db"):
        shutil.rmtree("chroma_db")
        print("Cleared old database.")

    embeddings = OpenAIEmbeddings(model='text-embedding-3-small')
    db = Chroma.from_documents(chunks, embeddings, persist_directory="chroma_db")
    print("Database created")

if __name__ == '__main__':
    ingest()
    


