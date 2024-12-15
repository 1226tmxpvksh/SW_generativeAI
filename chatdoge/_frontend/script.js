async function getFortune(data) {
    try {
        const response = await fetch('<http://localhost:3000/fortuneTell>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error('Error fetching fortune:', error);
        return null;
    }
}

function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}`;
    messageElement.innerText = message;
    document.getElementById('chat-window').appendChild(messageElement);
    document.getElementById('chat-window').scrollTop = document.getElementById('chat-window').scrollHeight;
}

async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    if (!message) return;

    addMessageToChat(message, 'user');
    chatInput.value = '';

    const fortuneResponse = await getFortune({ message });
    if (fortuneResponse && fortuneResponse.message) {
        addMessageToChat(fortuneResponse.message, 'bot');
    } else {
        addMessageToChat('운세 정보를 가져오는데 실패했습니다.', 'bot');
    }
}
