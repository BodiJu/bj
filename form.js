const token = "6735229668:AAH0brSmSkwbv3wHSZF0pHY9oB3zbeSPL4M" // Replace with your bot's token
const chat_id = "-1002083149793" // Replace with your group's chat ID
const URI_API = `https://api.telegram.org/bot${token}/sendMessage`;

document.getElementById('form').addEventListener('submit', function(event) {
    let message = `<b>Имя: ${this.username.value}</b>\n`;
    message += `<b>Контакты: ${this.contacts.value}</b>\n`;
    message += `<b>Возраст: ${this.age.value}</b>\n`;
    message += `<b>Ожидания от тренировок: ${this.expectations.value}</b>`;

    axios.post(URI_API, {
        chat_id: chat_id,
        parse_mode: 'html',
        text: message
    })
    .then(response => {
        console.log("Message sent successfully:", response.data);
    })
    .catch(error => {
        console.error("Error sending message:", error);
    });
});

