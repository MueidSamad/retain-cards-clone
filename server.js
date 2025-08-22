const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file upload and generate flashcards using PDF parsing
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.json({ success: false, message: 'No file uploaded' });
  }
  try {
    // Read uploaded PDF file
    const dataBuffer = fs.readFileSync(req.file.path);
    // Parse PDF text
    const data = await pdfParse(dataBuffer);
    // Split text into sentences and filter out very short sentences
    const sentences = data.text.split(/[\.\?\!\n]+/).map(s => s.trim()).filter(s => s.length > 20);
    // Generate a limited number of flashcards (e.g., first 5 sentences)
    const flashcards = sentences.slice(0, 5).map(sentence => {
      const words = sentence.split(/\s+/);
      const question = 'Explain: ' + words.slice(0, Math.min(8, words.length)).join(' ') + '?';
      const answer = sentence;
      return { question, answer };
    });
    res.json({ success: true, flashcards });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Error processing file' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
