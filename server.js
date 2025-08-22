const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle file upload and return dummy flashcards
app.post('/upload', upload.single('file'), (req, res) => {
  // In a real implementation, process the uploaded file and generate flashcards using AI.
  // Here we return dummy data as a placeholder.
  const sampleFlashcards = [
    { question: 'What is the capital of France?', answer: 'Paris' },
    { question: 'Define photosynthesis.', answer: 'Photosynthesis is the process by which green plants create energy from sunlight.' }
  ];
  res.json({ success: true, flashcards: sampleFlashcards });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
