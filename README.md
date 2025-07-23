# AI Generated Letter Writing and Resume Building Website

This project is a web application that provides AI-powered tools for generating letters (cover letters, formal/informal letters, etc.) and building professional resumes. Users can input their details, select templates, and receive high-quality outputs powered by AI.

## Features

- **AI Letter Writing:** Generate personalized letters for various purposes.
- **Resume Builder:** Create and download resumes using customizable templates.
- **User-Friendly Interface:** Responsive design and easy navigation.
- **Download as PDF:** Export generated letters and resumes as PDF files.

## Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **AI Integration:** OpenAI API (or similar)
- **PDF Generation:** jsPDF

## Setup

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ai-letter-resume-website.git
    cd ai-letter-resume-website
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Configure API keys:**
    - Create a `.env` file in the root directory.
    - Add your OpenAI API key:
      ```
      OPENAI_API_KEY=your-openai-api-key
      ```

4. **Start the app:**
    ```bash
    npm run dev
    ```

5. **Visit** [http://localhost:3000](http://localhost:3000)

---

## File Structure

- `/client` - React Frontend
- `/server` - Express Backend

---

## License

MIT