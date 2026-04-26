#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Run the ingestion script to build the vector database
python src/ingest.py
