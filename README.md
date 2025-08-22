# Retain Cards Clone

This project is a professional clone of the [retain.cards](https://www.retain.cards) website. It provides an interface for uploading study materials (PDF, image, or slide files) and automatically generates flashcards using PDF parsing logic. The site also includes sections describing the advantages of the platform and a "How It Works" explanation.

## Features

- **Modern landing page** with a hero section, advantages, how‑it‑works steps, and upload form.
- **PDF upload and flashcard generation**: the backend parses the uploaded PDF and extracts sentences to create question/answer flashcards.
- **Responsive design** using basic CSS.

## Running the project

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open your browser at `http://localhost:3000` to view the site.

You can upload a PDF file and the server will parse its text and generate a small set of flashcards as a demonstration. Feel free to expand the flashcard generation logic or integrate with AI services.
