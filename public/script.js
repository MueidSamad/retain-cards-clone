document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadForm');
  const flashcardsContainer = document.getElementById('flashcards');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    flashcardsContainer.innerHTML = 'Processing...';
    const formData = new FormData(form);
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        flashcardsContainer.innerHTML = '';
        data.flashcards.forEach(card => {
          const cardDiv = document.createElement('div');
          cardDiv.className = 'flashcard';
          cardDiv.innerHTML = `<strong>Question:</strong> ${card.question}<br><strong>Answer:</strong> ${card.answer}`;
          flashcardsContainer.appendChild(cardDiv);
        });
      } else {
        flashcardsContainer.textContent = 'Failed to generate flashcards.';
      }
    } catch (err) {
      flashcardsContainer.textContent = 'An error occurred.';
    }
  });
});
