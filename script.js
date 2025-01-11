document.getElementById("send-btn").addEventListener("click", async () => {
    const question = document.getElementById("user-question").value;
    if (!question.trim()) return;

    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML += `<div class="user-query">${question}</div>`;

    const response = await fetch("http://127.0.0.1:5000/ask", { // Flask backend URL
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
    });
    

    const data = await response.json();
    chatContainer.innerHTML += `<div class="ai-response">${data.answer}</div>`;
});
