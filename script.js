function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // Display user message
    let userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Simulated AI response
    let aiResponses = {
        "hello": "Hi! How can I help you study today?",
        "what is physics": "Physics is the study of matter, energy, and the interactions between them.",
        "who are you": "I'm your AI study assistant, here to help you learn!",
        "default": "I'm not sure, but I can try to help!"
    };

    let response = aiResponses[userInput.toLowerCase()] || aiResponses["default"];
    let aiMessage = `<div><strong>AI:</strong> ${response}</div>`;

    setTimeout(() => {
        chatBox.innerHTML += aiMessage;
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 500);

    document.getElementById("user-input").value = "";
}
