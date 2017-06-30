const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const schedule = require('node-schedule');
const fs = require('fs');
var config = require('./config');

const token = config.bottoken;
const bot = new TelegramBot(token, {polling: true})
var dailyloc = config.dailyLocation;

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

var editions = [
	{short:'an', count:92},
	{short:'lg', count:310},
	{short:'dk', count:119},
	{short:'fe', count:187},
	{short:'hl', count:140},
	{short:'mr', count:350},
	{short:'vi', count:167},
	{short:'wl', count:167},
	{short:'tp', count:350},
	{short:'sh', count:167},
	{short:'ex', count:167},
	{short:'us', count:350},
	{short:'ul', count:143},
	{short:'ud', count:143},
	{short:'mm', count:350},
	{short:'ne', count:143},
	{short:'pr', count:143},
	{short:'in', count:355},
	{short:'ps', count:146},
	{short:'ap', count:148},
	{short:'od', count:350},
	{short:'tr', count:143},
	{short:'ju', count:143},
	{short:'on', count:350},
	{short:'le', count:145},
	{short:'sc', count:143},
	{short:'be', count:302},
	{short:'ug', count:88},
	{short:'po2', count:165},
	{short:'po', count:222},
	{short:'p3k', count:180},
	{short:'ced', count:302},
	{short:'cedi', count:302},
]

bot.onText(/\/draw/, (msg) =>{
	const chatId = msg.chat.id;
	let edition = editions[Math.floor(Math.random()*editions.length)];
	bot.sendMessage(chatId,`http://magiccards.info/scans/en/${edition.short}/${Math.floor(Math.random()*edition.count)}.jpg`);
});




var merge = [
	'https://i.imgur.com/X9zNSkM.gif',
	'https://cdn.meme.am/cache/instances/folder86/500x/64007086/disaster-girl-push-rejected-rebase-or-merge-git-push-force.jpg',
	'https://www.mememaker.net/static/images/memes/3629643.jpg',
	'http://s.quickmeme.com/img/58/58cdc50dcb04a16438e9759f2db7a0ac23442e718f69af7b2ac0a3761915e92a.jpg',
	'https://i.stack.imgur.com/nEfIm.jpg',
]

bot.onText(/\/💩/,(msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Kothaufen');
});

bot.onText(/\/merge/,(msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, merge[Math.floor(Math.random()*merge.length)]);
});

var j = schedule.scheduleJob('30 5 * * *', function(){
	downloader('http://wttr.in/'+dailyloc+'.png?1', 'dailywetter.png',function(){
		sendingWeather(config.dailyChatId,dailyloc,__dirname+'/dailywetter.png');
	});
});

var downloader = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		request(uri).pipe(fs.createWriteStream(filename)).on('finish',callback);
	});
};

bot.onText(/\/weather (.+)/, (msg, input) => {
	const chatId = msg.chat.id;
	var loc = input[1];
	downloader('http://wttr.in/'+loc+'.png?1', 'wetter.png',function(){
		sendingWeather(chatId,loc,__dirname+'/wetter.png');
	});
});

bot.onText(/\/decide (.+)/, (msg, input) => {
	const chatID = msg.chat.id;
	var answer = Math.random() >= 0.5 ? "Yes" : "No";
	bot.sendMessage(chatID, input[1] + " " + answer);
});

bot.onText(/\/marius/, (msg) => {
	const chatID = msg.chat.id;
	bot.sendMessage(chatID, "https://i.giphy.com/media/l2YWsiql5xGPIbnzy/giphy.gif");
});
bot.onText(/\/slap (.+)/, (msg,input) => {
	const chatID = msg.chat.id;
	bot.sendMessage(chatID, "<b>" + msg.from.first_name + " slaps " + input[1] + " around a bit with a large trout</b>",{parse_mode : "HTML"});
});
function sendingWeather(chatId,loc, photo){
	bot.sendPhoto(chatId, photo, {caption: "Todays weather forecast for: "+loc});
};

bot.onText(/\/hype/, (msg) =>{
	bot.sendMessage(msg.chat.id, msg.from.first_name+' started a HYPE-Train!');
	bot.sendPhoto(msg.chat.id, 'http://imgur.com/Ibx2NJs');	
});

var geste = [
	'Schere',
	'Stein',
	'Papier',
	]

bot.onText(/\/schere/, (msg) =>{
	let geste = geste[Math.floor(Math.random()*geste.length)];
	if (geste == 'Schere') {
    		bot.sendMessage(msg.chat.id, 'Schere, '+msg.from.first_name+' hat ein Unentschieden erzielt');
	} else if (geste == 'Stein') {
    		bot.sendMessage(msg.chat.id, 'Stein, '+msg.from.first_name+' hat verloren');
	} else {
		bot.sendMessage(msg.chat.id, 'Papier, '+msg.from.first_name+' hat GEWONNEN');
	}
});

bot.onText(/\/stein/, (msg) =>{
	let geste = geste[Math.floor(Math.random()*geste.length)];
	if (geste == 'Schere') {
    		bot.sendMessage(msg.chat.id, 'Schere, '+msg.from.first_name+' hat GEWONNEN');
	} else if (geste == 'Stein') {
    		bot.sendMessage(msg.chat.id, 'Stein, '+msg.from.first_name+' hat ein Unentschieden erzielt');
	} else {
		bot.sendMessage(msg.chat.id, 'Papier, '+msg.from.first_name+' hat verloren');
	}
});

bot.onText(/\/papier/, (msg) =>{
	let geste = geste[Math.floor(Math.random()*geste.length)];
	if (geste == 'Schere') {
    		bot.sendMessage(msg.chat.id, 'Schere, '+msg.from.first_name+' hat verloren');
	} else if (geste == 'Stein') {
    		bot.sendMessage(msg.chat.id, 'Stein, '+msg.from.first_name+' hat GEWONNEN');
	} else {
		bot.sendMessage(msg.chat.id, 'Papier, '+msg.from.first_name+' hat ein Unentschieden erzielt');
	}
});

var userdieichkenne = [
	'Laumi',
	'xAndy',
	'Hahniel',
	'Fabian',
	'Anna',
	'Marius',
	'Florian',
	'Michael',
	'Manuel',
	'Konstantin',
	'anon-kun',
	'Dennis',
	'Jonas nicht-M.',
	'Jonas M.',
	'Christian',
	'M3T4',
	'ShipIt-Bot',
	'Darkpilot',
]
bot.onText(/\/wer/, (msg) => {
	let name = userdieichkenne[Math.floor(Math.random()*userdieichkenne.length)];
	bot.sendMessage(msg.chat.id, name+' '+input[1]);
});
