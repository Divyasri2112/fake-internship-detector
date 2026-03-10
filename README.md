# Fake Internship Poster Detector (Ollama Integrated)

A modern web application built to detect fake internship posters. It uses a local instance of Ollama running the **Llama 3** model to analyze the provided text for red flags, grammar mistakes, unrealistic salaries, and payment requests.

## Folder Structure

```text
Fake-Internship-Detector/
├── index.html        # Main webpage interface
├── style.css         # Modern, responsive styling with Dark Mode UI
├── script.js         # Frontend logic to hit the Flask API and parse Markdown
├── server.py         # Flask backend that integrates natively with Ollama
└── README.md         # Instructions and documentation
```

## Prerequisites

1. **Python 3.x**: Ensure you have Python installed.
2. **Ollama**: Download and install [Ollama](https://ollama.com/).
3. **Llama 3 Model**: You need to pull the Llama 3 model into your Ollama instance.

## Setup Instructions

### 1. Start Ollama with Llama 3

Open a terminal and run the following command to download and run the Llama 3 model:

```bash
ollama run llama3
```
*Keep this process running, or ensure the Ollama background service is active at `http://localhost:11434`.*

### 2. Set Up the Python Backend

In a new terminal, navigate to the `Fake-Internship-Detector` directory and install the required Python packages (`flask`, `flask-cors`, and `requests`):

```bash
pip install flask flask-cors requests
```

Once installed, start the Flask server:

```bash
python server.py
```
*The backend should now be running at `http://localhost:5000`.*

### 3. Run the Frontend

To view the webpage, you can open `index.html` directly in your browser, or serve it using a simple local server. In a completely new terminal, navigate to the `Fake-Internship-Detector` folder and run:

```bash
python -m http.server 8000
```

### 4. Use the Application

Open your web browser and navigate to:
**http://localhost:8000/index.html**

Paste the text of a suspicious poster into the text area, and click **Analyze Poster**! The request will go from the frontend -> Flask Backend (`server.py`) -> Ollama local model (`llama3`), and the detailed result will stream back to the UI.
