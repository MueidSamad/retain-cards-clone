# Retain Cards Clone

This project is a professional clone of the [retain.cards](https://www.retain.cards) website. It provides an interface for uploading study materials (PDF, image or slide files) and automatically generates flashcards. The site includes a modern landing page with a hero section, advantages, how‑it‑works steps, and an upload form.

## Features

- **Modern landing page** with a hero section, advantages, how‑it‑works steps, and upload form.
- **AI‑powered flashcard generation**: After uploading a PDF, the server uses OpenAI's GPT‑4 model (via your `OPENAI_API_KEY`) to produce context‑aware question‑answer flashcards. If no key is provided, it falls back to a simple heuristic that splits sentences into questions and answers.
- **Responsive design** using basic CSS.

## Running the project

1. **Set up your OpenAI API key**  
   Export the `OPENAI_API_KEY` environment variable with your OpenAI key before starting the server. Without this key, the application will still run but will use a simple heuristic to generate flashcards.

   ```bash
   export OPENAI_API_KEY=your-openai-api-key
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. Open your browser at `http://localhost:3000` to view the site.

You can upload a PDF file and the server will parse its text and generate a set of flashcards. Feel free to expand the flashcard generation logic or integrate with other AI services.
