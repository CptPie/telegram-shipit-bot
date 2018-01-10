'use strict'

const TelegramBot = require('telegram-bot-nova');

var bot = new TelegramBot('401662147:AAGPsYZxbYv8UfjdB0CuBZFIJCaLmPyZFRw', {
	'devMode': true

});

bot.on('command', (chat, data, from, messageId, text, command, commandData) => {
	console.log(command+' '+text)
	if (command === 'start') {
		bot.sendText(chat.id, 'Hello world.');
		return;
	}
	if (command === 'toggle_dev') {
		if (bot.getDevMode() === true){
			bot.setDevMode(false);
		} else {
			bot.setDevMode(true);
		}
		return;
	}
	if (command === 'greet') {
		bot.sendText(chat.id, 'Hello '+commandData)
		return;
	}
	
})

