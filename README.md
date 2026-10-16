# 🚀 SaaSquatch AI Lead Qualifier & Verification Engine

An advanced full-stack B2B lead generation and qualification platform designed to automate domain validation, email server health checks, AI-powered lead scoring, and personalized cold outreach generation.

## ✨ Key Features

- **Real-Time Domain & MX Verification:** Uses Node.js `dns/promises` to perform DNS lookups and verify whether a target domain has configured mail exchange (MX) records.
- **AI-Powered Lead Scoring:** Integrates Google's Gemini API (`gemini-3-flash-preview`) to analyze company profiles, generate an Ideal Customer Profile (ICP) deal score from 0–100, and categorize leads into High, Medium, or Low priority.
- **Personalized Cold Outreach:** Generates customized, three-sentence cold email pitches tailored to each company's profile and potential business needs.
- **Lightweight Web Scraping:** Uses Axios and Cheerio to extract relevant information from publicly accessible company websites without requiring a headless browser.
- **Lead Management Dashboard:** Provides a centralized interface for reviewing and managing qualified leads.
- **Modern SaaS Interface:** Features a sleek, high-contrast dark theme inspired by SaaSquatch Leads aesthetics.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Lucide Icons, CSS
- **Backend:** Node.js, Express.js, MVC Architecture
- **Database:** MongoDB, Mongoose
- **AI Integration:** Google Gemini API (`@google/generative-ai`)
- **Web Scraping:** Axios, Cheerio
- **DNS Verification:** Node.js `dns/promises`

## 📂 Project Architecture

```text
saasquatch-ai-qualifier/
├── client/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
└── server/
    ├── config/
    │   ├── db.js
    │   └── geminiConfig.js
    ├── controllers/
    │   └── leadController.js
    ├── models/
    │   └── Lead.js
    ├── routes/
    │   └── leadRoutes.js
    ├── utils/
    │   ├── aiAnalyzer.js
    │   └── scraper.js
    ├── index.js
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance
- [Google AI Studio API Key](https://aistudio.google.com/apikey)

### 1. Clone the Repository

```bash
git clone https://github.com/ZunedKhan07/saasquatch-ai-qualifier
cd saasquatch-ai-qualifier
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_KEY=your_google_gemini_api_key
```

Replace the placeholder values with your actual MongoDB connection string and Gemini API key.

Start the backend server:

```bash
npm run dev
```

Make sure the development script is configured in `server/package.json`. For example:

```json
{
  "scripts": {
    "dev": "nodemon index.js"
  }
}
```

If your project uses a different development script, run the command defined in your `package.json`.

### 3. Frontend Setup

Open a new terminal window from the project root and navigate to the client directory:

```bash
cd client
npm install
npm run dev
```

Open the local URL displayed by Vite, usually:

```text
http://localhost:5173
```

### 4. Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port used by the Express backend |
| `MONGO_URI` | MongoDB connection string |
| `GEMINI_KEY` | Google Gemini API key |

**Security Note:** Never commit your `.env` file or expose your API keys in frontend code or public repositories. Add `.env` to your `.gitignore` file.

## 🔄 How It Works

1. **Website Analysis:** The application retrieves relevant information from a target company's publicly accessible website.
2. **Domain Verification:** The backend checks the domain's DNS records for MX configuration.
3. **AI Lead Qualification:** Company information is analyzed using Gemini to produce an ICP score and priority category.
4. **Outreach Generation:** The AI generates a personalized cold email pitch based on the available company information.
5. **Lead Management:** The results are presented through the dashboard for review and follow-up.

## 🎥 Demo Walkthrough

A video demonstration showcasing the dashboard, domain verification, AI-powered lead scoring, and outreach generation is included with this submission.

## 👨‍💻 Author

**Juned Khan**

Full Stack Software Developer

- GitHub: [ZunedKhan07](https://github.com/ZunedKhan07)

---

*Built to streamline B2B lead qualification with AI-powered insights and automated domain verification.*
