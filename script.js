const chatBox = document.getElementById('chat-box');
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');

function addMessage(text, sender) {
  const message = document.createElement('div');
  message.classList.add('message', sender);
  message.innerHTML = `
    <img src="${sender === 'you' ? 'user.png' : 'logo.png'}" alt="${sender}">
    <div class="text">${text}</div>
  `;
  chatBox.appendChild(message);
//   chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingIndicator() {
  const typingIndicator = document.createElement('div');
  typingIndicator.classList.add('typing-indicator');
  typingIndicator.id = 'typing-indicator';
  typingIndicator.innerHTML = `
    <img src="logo.png" alt="AI">
    <div class="dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `;
  chatBox.appendChild(typingIndicator);
//   chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

sendBtn.addEventListener('click', async () => {
  const userText = userInput.value.trim();
  if (userText === '') return;

  addMessage(userText, 'you');
  userInput.value = '';

  addTypingIndicator(); // Show typing indicator

  try {
    const response = await fetch('https://cas-ai.onrender.com/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: userText })
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
   
    const data = await response.json();

    removeTypingIndicator(); // Remove typing indicator once response is received
    addMessage(data.answer, 'bot');
  } catch (error) {
    removeTypingIndicator(); // Ensure typing indicator is removed on error
    addMessage(`Error: ${error.message}`, 'bot');
  }
});
