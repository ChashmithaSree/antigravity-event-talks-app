# Antigravity Event Talks App (BigQuery Release Notes)

A modern, responsive web application that fetches the official [Google Cloud BigQuery Release Notes](https://docs.cloud.google.com/feeds/bigquery-release-notes.xml) and displays them in a beautifully styled UI. 

## Features
- **Live Feed Parsing**: Uses Python (`feedparser`) to pull the latest updates directly from the official BigQuery XML feed.
- **Premium Aesthetics**: Designed with glassmorphism, dynamic hover states, a vibrant gradient backdrop, and Google's Outfit font.
- **Share to X (Twitter)**: One-click "Tweet" button on every update card that pre-fills a tweet with the update's title and link.
- **Live Refresh**: Asynchronously fetches new updates on demand with a custom loading spinner.

## Tech Stack
- **Backend**: Python, Flask
- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Feed Parsing**: `feedparser`

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/ChashmithaSree/antigravity-event-talks-app.git
cd antigravity-event-talks-app
```

### 2. Create a Virtual Environment and Install Dependencies
```bash
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Run the App
```bash
python app.py
```
The application will be accessible at `http://127.0.0.1:5000/`.
