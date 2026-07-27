<div align="center">
  <img src="./client/src/assets/vite.svg" alt="Acleco Logo" width="80" />
  
  # Acleco — Active Learning Companion

  <p>
    <strong>Transform your study notes into interactive, AI-powered learning experiences.</strong>
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#design-system">Design System</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Architecture</a>
  </p>
</div>

---

## 📖 Overview

**Acleco** is a premium educational SaaS application designed to help students and professionals actively engage with their study materials. Instead of passively reading notes, users paste their content into Acleco, and the underlying AI pipeline dynamically generates a guided study session consisting of interactive flashcards, adaptive quizzes, and performance summaries.

The platform is designed with a focus on cognitive science (active recall and spaced repetition) and features a modern, calm, and distraction-free interface.

## ✨ Features

- 🧠 **AI-Powered Session Generation:** Parses unstructured notes (lectures, textbooks, articles) and extracts key concepts, takeaways, and quiz questions.
- ⚡ **Study Modes:** Choose between Quick Study (flashcards only), Exam Prep (deep quiz with review loops), or Interview Ready (concept-focused).
- 📇 **Interactive 3D Flashcards:** Editable, beautifully animated flashcards with a physical paper-feel and progress tracking.
- ✍️ **Adaptive Quizzing:** Multiple-choice questions with immediate visual feedback.
- 🔁 **Targeted Review Loop:** Automatically isolates incorrectly answered questions and forces a review round before completing the session.
- 📊 **Performance Dashboard:** Visualizes accuracy with radial progress rings, session time, learned cards, and tracks daily study streaks.
- 🌗 **Dark Mode:** A fully tokenized, first-class dark mode designed to reduce eye strain during late-night study sessions.

## 🎨 Design System

Acleco abandons the generic "AI dashboard" look in favor of a unique, warm educational identity inspired by modern tools like Linear, Readwise, and Headspace.

- **Primary Palette:** Deep Emerald (`#176B5D`) and Warm Amber (`#F2A900`)
- **Typography:** `Sora` for expressive, highly-legible headings, and `Inter` for clean body text.
- **Visuals:** Minimalist glassmorphism, soft gradients, custom SVG iconography, and subtle organic background animations (blobs).
- **Micro-interactions:** Tactile button ripples, staggered list animations, and smooth 3D card flips.

## 🛠 Tech Stack

**Frontend (Client)**
- **Framework:** React 18 (Vite)
- **Styling:** Custom CSS variables & Tailwind CSS (for layout utilities)
- **State Management:** Custom React Hooks (`useStudySession`)
- **Icons:** Custom Inline SVGs

**Backend (Server)**
- **Runtime:** Node.js
- **Framework:** Express.js
- **AI Engine:** Google Gemini API (`gemini-3.6-flash` model)
- **Utilities:** Custom JSON extraction and repair pipelines for robust AI responses.

---

## 🚀 Getting Started

Follow these steps to run Acleco locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- A Google Gemini API Key (Get one from [Google AI Studio](https://aistudio.google.com/))

### 1. Clone the repository
```bash
git clone https://github.com/Susmitha-Peravali/Acleco_A-Study-Assistant.git
cd Acleco_A-Study-Assistant
```

### 2. Install Dependencies
You need to install packages for both the client and the server.

**For the Server:**
```bash
cd server
npm install
```

**For the Client:**
```bash
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file inside the `server` directory and add your API credentials:

```bash
# server/.env
GEMINI_API_KEY=your_google_gemini_api_key_here
MODEL_NAME=gemini-3.6-flash
PORT=3001
```

### 4. Run the Application
You need two terminal windows open to run both the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
# Runs on http://localhost:3001
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Runs on http://localhost:5173 (or 5174)
```

Open your browser and navigate to the frontend URL to start learning!

---

## 📁 Project Structure

```text
Acleco/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Modular UI components (Flashcard, Quiz, etc.)
│   │   ├── hooks/              # Custom hooks (useStudySession.js state machine)
│   │   ├── pages/              # Main page layouts (Home.jsx)
│   │   ├── services/           # API communication logic
│   │   ├── index.css           # Global design system & animation tokens
│   │   └── App.jsx             # Root component
│   └── tailwind.config.js      # Custom theme configuration
│
├── server/                     # Express Backend
│   ├── routes/                 # API endpoints (POST /api/generate)
│   ├── services/               # Gemini API connection and prompt engineering
│   ├── utils/                  # JSON extractors and fault-tolerant repairers
│   └── index.js                # Server entry point
│
└── README.md                   # Project documentation
```

## 🧠 How the AI Pipeline Works
1. The user submits raw text notes from the frontend.
2. The Node.js server receives the text and constructs a strict prompt instructing Gemini to act as an educational designer.
3. Gemini processes the text and returns a highly structured JSON object containing a session title, key takeaways, flashcard pairs, and multiple-choice questions.
4. The server intercepts the response, strips markdown backticks via `jsonExtractor`, and patches any syntax errors via `jsonRepairer` to guarantee a 100% valid JSON payload.
5. The frontend's state machine transitions from `LOADING` -> `MISSION`, and the active study session begins.

---
*Designed & built for active, mindful learning.*
