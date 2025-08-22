const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

// Initialize OpenAI with API key from environment
const openai = new OpenAIApi(
  new Configuration({ apiKey: process.env.OPENAI_API_KEY })
);

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file upload and generate flashcards using OpenAI GPT-4
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: 'No file uploaded' });
  }

  try {
    // Read uploaded PDF file
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    // Extract text and truncate to avoid extremely long prompts
    const text = data.text;
    const truncatedText = text.split(/\s+/).slice(0, 1500).join(' ');
    const maxCards = 5;

    let flashcards;

    try {
      // Compose a prompt instructing the AI to generate flashcards
      const prompt =
        `You are an educational assistant that creates flashcards to help a student study. Based on the following text, generate ${maxCards} flashcards. Each flashcard should be a JSON object with 'question' and 'answer' fields. Respond with a JSON array of these objects and no other commentary.\n\nText:\n${truncatedText}`;

      // Request GPT-4 to create flashcards
      const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that creates flashcards for study.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      });

      const content = response.data.choices[0].message.content.trim();
      flashcards = JSON.parse(content);

      // Ensure the response is an array
      if (!Array.isArray(flashcards)) {
        throw new Error('Expected an array of flashcards');
      }
    } catch (err) {
      // Fallback heuristic if the AI call fails
      const sentences = text
        .split(/[\.\?\!\n]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 20);
      flashcards = sentences.slice(0, maxCards).map((sentence) => {
        const words = sentence.split(' ');
        const questionPart = words.slice(0, 8).join(' ');
        return {
          question: `Explain: ${questionPart}?`,
          answer: sentence,
        };
      });
    }

    // Delete uploaded file
    fs.unlinkSync(req.file.path);
    return res.json({ success: true, flashcards });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Error processing file' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
