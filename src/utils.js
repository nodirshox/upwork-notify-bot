const config = require('./config');
const fetch = require('node-fetch');

exports.createMessage = (type, feed) => {
    let message = `${type}\n`;
    feed.items.forEach((job, index) => {
        message += `<b>${index + 1}.</b> <a href="${job.link}">${job.title}</a>\n`;
    });

    return message;
}

exports.sendMessage = async (message) => {
    const URL = 'https://api.telegram.org/bot' + config.botToken + '/sendMessage';
    const BODY = {
        chat_id: config.channelID,
        text: message,
        parse_mode: "HTML"
    }
    await fetch(URL, {
        method: "POST",
        body: JSON.stringify(BODY),
        headers: { 'Content-Type': 'application/json' }
    });
}
