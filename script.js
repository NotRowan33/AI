const API_URL = "https://api-inference.huggingface.co/models/openai-community/gpt2";
const API_KEY = "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"; // Replace with your Hugging Face API key

async function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatBox = document.getElementById("chat-box");

    if (userInput.trim() === "") return;

    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
    chatBox.innerHTML += `<div><strong>AI:</strong> Thinking...</div>`;
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

        if (result.error) {
            chatBox.innerHTML += `<div><strong>AI:</strong> Error: ${result.error}</div>`;
        } else {
            let aiResponse = result.generated_text || "I couldn't process that.";
            chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", `<div><strong>AI:</strong> ${aiResponse}</div>`);
        }

        chatBox.scrollTop = chatBox.scrollHeight;
    } catch (error) {
        chatBox.innerHTML += `<div><strong>AI:</strong> Error: Unable to reach the server.</div>`;
    }

    document.getElementById("user-input").value = "";
}
