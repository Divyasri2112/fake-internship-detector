# Fake Internship Poster Detector (Ollama Integrated)

A modern web application built to detect fake internship posters. It uses a local instance of Ollama running the **Llama 3** model to analyze the provided text for red flags, grammar mistakes, unrealistic salaries, and payment requests.

## Folder Structure

Fake-Internship-Detector/
├── index.html
├── style.css
├── script.js
├── server.py
└── README.md

## Prerequisites

1. Python 3.x
2. Ollama (https://ollama.com)
3. Llama 3 model

## Setup Instructions

### Start Ollama
ollama run llama3


### Install Backend Packages


pip install flask flask-cors requests


### Run Backend


python server.py


### Run Frontend


python -m http.server 8000


Open:


http://localhost:8000/index.html


Paste internship poster text and click **Analyze Poster**.