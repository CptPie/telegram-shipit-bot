const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const schedule = require('node-schedule');

const token = '<YOUR TOKEN>'
const bot = new TelegramBot(token, {polling: true})
var ChatId = '<YOUR CHATID>';
var dailyloc = '<YOUR LOCATION FOR DAILY WEATHER>';

bot.onText(/\/greet (.+)/, (msg, input) => {
	const chatId = msg.chat.id;
	var blub = input[1];
	var resp ='Hello, '+blub;

	bot.sendMessage(chatId, resp);
});

var loremSettings = {
	url: 'http://lorempixel.com/400/200',
	encoding: null
};



bot.onText(/\/lorem/||/\/lorem (.*)/, (msg) =>{
	const chatId = msg.chat.id;
	request(loremSettings, function (error, response, buffer) {
		if (!error && response.statusCode == 200){	
			bot.sendPhoto(chatId, buffer);
		}
	})
});

var doit = [
	'http://i.imgur.com/RPbK0fZ.png',
	'http://i.imgur.com/TgUQfNI.jpg',
	'http://i.imgur.com/WSm116p.jpg',
]

bot.onText(/\/doit/,(msg) =>{
	const chatId = msg.chat.id;
	bot.sendPhoto(chatId, doit[Math.floor(Math.random()*doit.length)]);
});

var ship = [
	'http://i.imgur.com/b7bzy0C.png',
	'http://i.imgur.com/hse69ui.jpg',
	'http://i.imgur.com/pyjpvhM.gif',
	'http://i.imgur.com/66j50Xz.jpg',
	'http://i.imgur.com/tCiQSlg.jpg',
	'http://i.imgur.com/DDLLoL8.gif',
	'http://i.imgur.com/LDzcDY3.jpg',
	'http://i.imgur.com/nkeMpLe.jpg',
	'http://i.imgur.com/ACaARFw.jpg',
	'http://i.imgur.com/aJkhUrE.jpg',
	'http://i.imgur.com/YBdJsaS.jpg',
	'http://i.imgur.com/KmZrtgd.jpg',
	'http://i.imgur.com/rmgCY2Q.jpg',
	'http://i.imgur.com/g00lVs9.gif',
	'http://i.imgur.com/LIIXWmD.png',
	'http://i.imgur.com/c6K9rP3.jpg',
	'http://i.imgur.com/2M8iyPt.jpg',
	'http://i.imgur.com/7XxnrTu.jpg',
	'http://i.imgur.com/AJN04yl.jpg',
	'http://i.imgur.com/rcIMpM0.gif',
	'http://i.imgur.com/60u8kye.jpg',
	'http://i.imgur.com/yUypmaC.jpg',
	'http://i.imgur.com/IflZleY.jpg',
	'http://i.imgur.com/h3mlvCq.png',
	'http://i.imgur.com/dXzZETc.png',
	'https://media.giphy.com/media/143vPc6b08locw/giphy.gif',
	'https://media0.giphy.com/media/14tFXhhNurdGp2/giphy.gif',
	'https://media4.giphy.com/media/ta83CqOoRwfwQ/giphy.gif',
	'https://media2.giphy.com/media/tDafHUBVrRKtq/giphy.gif',
	'https://media2.giphy.com/media/tDafHUBVrRKtq/giphy.gif',
]

bot.onText(/\/ship/,(msg) =>{
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, ship[Math.floor(Math.random()*ship.length)]);
});

var merge = [
	'https://i.imgur.com/X9zNSkM.gif',
	'https://cdn.meme.am/cache/instances/folder86/500x/64007086/disaster-girl-push-rejected-rebase-or-merge-git-push-force.jpg',
	'https://www.mememaker.net/static/images/memes/3629643.jpg',
	'http://s.quickmeme.com/img/58/58cdc50dcb04a16438e9759f2db7a0ac23442e718f69af7b2ac0a3761915e92a.jpg',
	'https://i.stack.imgur.com/nEfIm.jpg',
]

bot.onText(/\/merge/,(msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, merge[Math.floor(Math.random()*merge.length)]);
});

var j = schedule.scheduleJob('6 * * *', function(){
	bot.sendMessage(ChatId, 'Todays weather forecast for'+dailyloc+':');
	bot.sendPhoto(ChatId, 'wttr.in/'+dailyloc+'.png');
});

bot.onText(/\/weather (.+)/, (msg, input) => {
	const chatId = msg.chat.id;
	var loc = input[1];
	bot.sendMessage(chatId,'Weather in '+loc+':');
	bot.sendPhoto(chatId,('wttr.in/'+loc+'.png'));
});

bot.onText(/\/decide (.+)/, (msg, input) => {
	const chatID = msg.chat.id;
	var answer = Math.random() >= 0.5 ? "Yes" : "No";
	bot.sendMessage(chatID, input[1] + " " + answer);
});
