const API_URL = "https://api-inference.huggingface.co/models/openai-community/gpt2";
const API_KEY = "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"; // Replace this with your actual key

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

        // Check for errors in the API response
        if (result.error) {
            chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", `<div><strong>AI:</strong> Error: ${result.error}</div>`);
        } else if (result.length === 0 || !result[0].generated_text) {
            chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", `<div><strong>AI:</strong> No response from AI.</div>`);
        } else {
            let aiResponse = result[0].generated_text;
            chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", `<div><strong>AI:</strong> ${aiResponse}</div>`);
        }
    } catch (error) {
        chatBox.innerHTML = chatBox.innerHTML.replace("Thinking...", `<div><strong>AI:</strong> Network error. Try again later.</div>`);
    }

    document.getElementById("user-input").value = "";
}
