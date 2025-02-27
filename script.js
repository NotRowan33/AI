const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct";
const API_KEY = "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"; // Replace with your Hugging Face API key

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    // Display user message
    let userMessage = `<div><strong>You:</strong> ${userInput}</div>`;
    chatBox.innerHTML += userMessage;

    // Call AI API for a response
    let aiMessage = `<div><strong>AI:</strong> Thinking...</div>`;
    chatBox.innerHTML += aiMessage;
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userInput })
        });

        let result = await response.json();
        let aiResponse = result[0]?.generated_text || "Sorry, I couldn't understand that.";

        // Update AI response in chat
        chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", aiResponse);
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div><strong>AI:</strong> Error fetching response. Please try again.</div>`;
    }

    document.getElementById("user-input").value = "";
}
