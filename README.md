[![Stars](https://img.shields.io/github/stars/ayushikashyap1207/NYAYA-MITRA)](https://github.com/ayushikashyap1207/NYAYA-MITRA/stargazers)
[![Forks](https://img.shields.io/github/forks/ayushikashyap1207/NYAYA-MITRA)](https://github.com/ayushikashyap1207/NYAYA-MITRA/network/members)
[![License](https://img.shields.io/github/license/ayushikashyap1207/NYAYA-MITRA)](LICENSE)
[![Issues](https://img.shields.io/github/issues/ayushikashyap1207/NYAYA-MITRA)](https://github.com/ayushikashyap1207/NYAYA-MITRA/issues)
[![Last Commit](https://img.shields.io/github/last-commit/ayushikashyap1207/NYAYA-MITRA)](https://github.com/ayushikashyap1207/NYAYA-MITRA/commits/main)

<img width="482" height="78" alt="image" src="https://github.com/user-attachments/assets/252b436c-8c30-407f-b336-42f67d93d1b1" />


# NYAYA-MITRA

NYAYA-MITRA is an AI-powered legal assistance platform designed to help users understand, analyze, and interact with legal information easily. It enables users to extract text from legal documents, summarize complex legal content, translate across languages, and obtain AI-driven insights through a simple web interface.

⸻
> **Live Demo:** [Coming Soon — deploying on Vercel]


### Table of Contents
	•	Overview
	•	Features
	•	FREE vs PAID Comparison
	•	Screenshots
	•	Tech Stack
	•	System Architecture
	•	Installation
	•	Environment Variables
	•	Running the Application
	•	API Documentation
	•	Project Structure
	•	Example Usage
	•	Roadmap
	•	Contributing
	•	License
	•	Author

⸻

### Overview

Legal documents are often lengthy, technical, and difficult to understand for non-experts. NYAYA-MITRA bridges this gap by using OCR and Artificial Intelligence technologies to convert complex legal text into simplified, meaningful information. The platform is intended for students, professionals, and citizens who need quick access to legal understanding.

⸻

### Features
	•	OCR-based text extraction from images and PDFs
	•	Rule-based and AI-powered legal summarization
	•	Multi-language translation support
	•	Text-to-Speech conversion
	•	AI-powered legal question answering
	•	Upload and processing of documents
	•	Clean and responsive web interface

⸻

### FREE vs PAID Comparison



| Feature | FREE Version | PAID Version |
|-------|-------------|--------------|
| OCR (Text Extraction) | Basic OCR | Advanced OCR |
| Legal Document Summary | Rule-based | AI-powered contextual summary |
| Language Translation | LibreTranslate | Premium Translation APIs |
| Text-to-Speech (TTS) | Browser-based voice | High-quality neural voice |
| Accuracy Level | 75–85% | 90%+ |
| Processing Speed | Standard | Faster |
| File Size Limit | Limited | Larger files supported |
| Priority Support | No | Yes |

⸻

### Screenshots
## Home Page
<img width="1275" height="677" alt="Screenshot 2026-02-16 at 10 46 32 AM" src="https://github.com/user-attachments/assets/4544c9a3-588c-4d13-bc2b-5455c20020d5" />

## output
<img width="1275" height="677" alt="Screenshot 2026-02-16 at 10 46 58 AM" src="https://github.com/user-attachments/assets/b9e44a35-ea8c-425b-819c-7ef153c1d7a5" />
<img width="1275" height="677" alt="Screenshot 2026-02-16 at 10 47 04 AM" src="https://github.com/user-attachments/assets/2a02c2e8-56d6-4923-a49c-7d9bcabcc9cc" />
<img width="1275" height="677" alt="Screenshot 2026-02-16 at 10 47 11 AM" src="https://github.com/user-attachments/assets/351b40c6-b0ec-4066-a770-33a1ff3fb68c" />

⸻

### 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **OCR** | Tesseract.js (images), pdf-parse (PDFs) |
| **Analysis** | Rule-based NLP (regex + keyword matching) |
| **Translation** | LibreTranslate (open-source, free) |
| **Audio** | Web Speech API (browser built-in) |
| **Security** | Helmet.js, Express Rate Limiter |
| **Logging** | Winston |

---
⸻

### System Architecture

## Architecture Diagram

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/1d35ddc4-f624-4969-8344-a6a8b5e1602d" />


### Workflow Explanation
	1.	User uploads a document or enters text through the web interface.
	2.	Flask backend receives the request.
	3.	OCR engine extracts text from images or PDFs.
	4.	Extracted text is passed to AI services for summarization, translation, question answering, or text-to-speech.
	5.	Processed results are returned to the backend.
	6.	Backend sends the final output to the user interface.

⸻

### Installation

git clone https://github.com/ayushikashyap1207/NYAYA-MITRA.git
cd NYAYA-MITRA
pip install -r requirements.txt


⸻

### Environment Variables

Create a .env file in the root directory:

OPENAI_API_KEY=your_api_key_here
TRANSLATE_API_URL=your_api_url_here


⸻

### Running the Application

python app.py

Open in browser:

http://localhost:5000


⸻

### API Documentation

See START_HERE.md￼ for API details and troubleshooting.

### POST `/api/documents/process`
Upload and analyze a legal document.

**Request:**
```bash
curl -X POST http://localhost:5000/api/documents/process \
  -F "document=@sample-legal-notice.txt" \
  -F "targetLanguage=hi"
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "documentType": "Court Notice",
    "mainPurpose": "Appear in court for property dispute hearing",
    "keyPoints": [
      "Property dispute case filed against you",
      "You must appear before the court",
      "Bring all property documents"
    ],
    "deadline": "15/03/2025",
    "actionRequired": "Appear in District Court of Bhopal",
    "parties": {
      "sender": "District Court of Bhopal",
      "recipient": "Ramesh Kumar"
    }
  },
  "translation": {
    "language": "hi",
    "translatedSummary": "आपको संपत्ति विवाद के लिए अदालत में उपस्थित होना है"
  },
  "audio": {
    "text": "आपको संपत्ति विवाद के लिए अदालत में उपस्थित होना है",
    "languageCode": "hi-IN"
  }
}
```

### GET `/api/documents/languages`
Get all supported languages.

**Request:**
```bash
curl http://localhost:5000/api/documents/languages
```

**Response:**
```json
{
  "success": true,
  "languages": {
    "hi": "Hindi",
    "bn": "Bengali",
    "ta": "Tamil",
    "te": "Telugu",
    "mr": "Marathi",
    "gu": "Gujarati",
    "kn": "Kannada",
    "ml": "Malayalam",
    "pa": "Punjabi",
    "ur": "Urdu",
    "en": "English"
  }
}
```

### GET `/api/documents/health`
Check if the server is running.

**Request:**
```bash
curl http://localhost:5000/api/documents/health
```

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-03-01T10:30:00Z"
}
```


⸻

### Project Structure

```
NYAYA-MITRA/
├── backend/
│   ├── services/        # OCR, AI analysis, translation
│   ├── controllers/     # Request handling
│   ├── routes/          # API endpoints
│   ├── middleware/      # Error handling, security
│   └── server.js        # Entry point
├── frontend/
│   └── src/
│       └── App.jsx      # Main UI
├── docs/
│   └── screenshots/     # App screenshots
├── LICENSE
└── README.md
```

⸻

### Example Usage
	•	Upload a legal document
	•	Click Summarize
	•	Ask legal questions
	•	Translate text
	•	Convert text to speech

⸻

### Roadmap
	•	User authentication
	•	PDF export of summaries
	•	Mobile application
	•	Chat history storage
	•	Voice input support

⸻

### Contributing
	1.	Fork the repository
	2.	Create a new branch
	3.	Commit your changes
	4.	Push to your branch
	5.	Open a Pull Request

⸻

### License

This project is licensed under the MIT License.

⸻

### Author

Ayushi Kashyap
GitHub: https://github.com/ayushikashyap1207

⸻

If you find this project useful, consider giving it a star.
