document.getElementById("send-btn").addEventListener("click", async () => {
    const question = document.getElementById("user-question").value;
    if (!question.trim()) return;

    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML += `<div class="user-query">${question}</div>`;

    const response = await fetch("https://cas-ai.onrender.com/ask", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ question })
    });

    

    const data = await response.json();
    chatContainer.innerHTML += `<div class="ai-response">${data.answer}</div>`;
});
