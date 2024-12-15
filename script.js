const chatWindow = document.getElementById('chat__window');
const messageInput = document.getElementById('message__input');
const sendButton = document.getElementById('send__button');
const geoButton = document.getElementById('geo__button');

const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');



sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        addMessageToChat(`Вы: ${message}`); 
        socket.send(message);
        messageInput.value = ''; 
    }
});


socket.addEventListener('message', (event) => {
    addMessageToChat(`Сервер: ${event.data}`);
});


function addMessageToChat(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; 
}


geoButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
            addMessageToChat(`Вы отправили гео-локацию: ${geoLink}`);
            socket.send(`Гео-локация: ${geoLink}`);
        }, () => {
            alert("Не удалось получить гео-локацию.");
        });
    } else {
        alert("Гео-локация не поддерживается вашим браузером.");
    }
});
