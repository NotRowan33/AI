const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct";
const API_KEY = "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"; // Make sure to use your Hugging Face API key

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
            body: JSON.stringify({
                inputs: userInput,
                options: { use_cache: false }
            })
        });

        let result = await response.json();
        if (result.error) {
            aiMessage = `<div><strong>AI:</strong> Error: ${result.error}</div>`;
        } else {
            let aiResponse = result[0]?.generated_text || "Sorry, I couldn't understand that.";
            aiMessage = `<div><strong>AI:</strong> ${aiResponse}</div>`;
        }
        
        // Update AI response in chat
        chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", aiMessage);
        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        aiMessage = `<div><strong>AI:</strong> Error: Unable to reach the server. Please try again later.</div>`;
        chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", aiMessage);
    }

    document.getElementById("user-input").value = "";
}
