const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const schedule = require('node-schedule');
const fs = require('fs');
const config = require('./config');
const bot = new TelegramBot(config.bottoken, {polling: true})
const contents = require('./contents')

function saveUser(username, firstname){
	var myObject=require('./users');	
	for (i in myObject.users){
		if (myObject.users[i].username==username){
			var contains = true;
		};
	};
	if (!contains){
		myObject['users'].push({'username': username,'first': firstname});
	};
	var json = JSON.stringify(myObject);
	fs.writeFile('users.json',json);
};


bot.onText(/\/greet (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	var blub = input[1];
	var resp ='Hello, '+blub;
	bot.sendMessage(chatId, resp);
});

bot.onText(/\/lorem/||/\/lorem (.*)/, (msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
	var loremSettings = {
	url: 'http://lorempixel.com/400/200',
	encoding: null
	};
	const chatId = msg.chat.id;
	request(loremSettings, function (error, response, buffer) {
		if (!error && response.statusCode == 200){	
			bot.sendPhoto(chatId, buffer);
		}
	})
});

bot.onText(/\/doit/,(msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
	var doit = [
	'http://i.imgur.com/RPbK0fZ.png',
	'http://i.imgur.com/TgUQfNI.jpg',
	'http://i.imgur.com/WSm116p.jpg',
	];
	const chatId = msg.chat.id;
	bot.sendPhoto(chatId, doit[Math.floor(Math.random()*doit.length)]);
});

bot.onText(/\/ship/,(msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
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
	];
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, ship[Math.floor(Math.random()*ship.length)]);
});

bot.onText(/\/draw/, (msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
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
	];
	const chatId = msg.chat.id;
	let edition = editions[Math.floor(Math.random()*editions.length)];
	bot.sendMessage(chatId,`http://magiccards.info/scans/en/${edition.short}/${Math.floor(Math.random()*edition.count)}.jpg`);
});
//does this function have to exist ... (CptPie)
bot.onText(/\/💩/,(msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Kothaufen');
});

bot.onText(/\/merge/,(msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	var merge = [
	'https://i.imgur.com/X9zNSkM.gif',
	'https://cdn.meme.am/cache/instances/folder86/500x/64007086/disaster-girl-push-rejected-rebase-or-merge-git-push-force.jpg',
	'https://www.mememaker.net/static/images/memes/3629643.jpg',
	'http://s.quickmeme.com/img/58/58cdc50dcb04a16438e9759f2db7a0ac23442e718f69af7b2ac0a3761915e92a.jpg',
	'https://i.stack.imgur.com/nEfIm.jpg',
	];
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, merge[Math.floor(Math.random()*merge.length)]);
});

var j = schedule.scheduleJob('30 5 * * *', function(){
	downloader('http://wttr.in/'+config.dailyLocation+'.png?1', 'dailywetter.png',function(){
		sendingWeather(config.dailyChatId, config.dailyLocation, __dirname+'/dailywetter.png');
	});
});

var downloader = function(uri, filename, callback){
	request.head(uri, function(err, res, body){
		request(uri).pipe(fs.createWriteStream(filename)).on('finish',callback);
	});
};

bot.onText(/\/weather (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	var loc = input[1];
	downloader('http://wttr.in/'+loc+'.png?1', 'wetter.png',function(){
		sendingWeather(chatId,loc,__dirname+'/wetter.png');
	});
});

function sendingWeather(chatId,loc, photo){
	bot.sendPhoto(chatId, photo, {caption: "Todays weather forecast for: "+loc});
};

bot.onText(/\/decide (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatID = msg.chat.id;
	var answer = Math.random() >= 0.5 ? "Yes" : "No";
	bot.sendMessage(chatID, input[1] + " " + answer);
});

bot.onText(/\/burn/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatID = msg.chat.id;
	bot.sendMessage(chatID, "https://i.giphy.com/media/l2YWsiql5xGPIbnzy/giphy.gif");
});

bot.onText(/\/slap (.+)/, (msg,input) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatID = msg.chat.id;
	bot.sendMessage(chatID, "<b>" + msg.from.first_name + " slaps " + input[1] + " around a bit with a large trout</b>",{parse_mode : "HTML"});
});


bot.onText(/\/hype/, (msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
	bot.sendMessage(msg.chat.id, msg.from.first_name+' started a HYPE-Train!');
	bot.sendPhoto(msg.chat.id, 'http://imgur.com/Ibx2NJs');	
});

bot.onText(/\/choose (.+), (.+)/,(msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	var answer = Math.random() >= 0.5 ? input[1] : input[2];
	bot.sendMessage(msg.chat.id, "@shipitbot has chosen *"+answer+"* for "+msg.from.first_name,{parse_mode : "Markdown"});
});

bot.onText(/\/scissors/, (msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
	let sign = contents.sign[Math.floor(Math.random()*Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, it\'s a draw between ShipIt-Bot and '+msg.from.first_name);
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, '+msg.from.first_name+' has lost');
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, '+msg.from.first_name+' has won');
	}
});

bot.onText(/\/rock/, (msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
	let sign = contents.sign[Math.floor(Math.random()*Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, '+msg.from.first_name+' has won');
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, it\'s a draw between ShipIt-Bot and '+msg.from.first_name);
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, '+msg.from.first_name+' has lost');
	}
});

bot.onText(/\/paper/, (msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
	let sign = contents.sign[Math.floor(Math.random()*Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, '+msg.from.first_name+' has lost');
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, '+msg.from.first_name+' has won');
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, it\'s a draw between ShipIt-Bot and '+msg.from.first_name);
	}
});

bot.onText(/\/who (.+)/, (msg, input) =>{
	saveUser(msg.from.username, msg.from.first_name);
	var users=require('./users')
	username = users.users[Math.floor(Math.random()*Object.keys(users.users).length)].first;
	bot.sendMessage(msg.chat.id, ''+username+' '+input[1]);
});
