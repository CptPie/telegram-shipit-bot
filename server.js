const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const schedule = require('node-schedule');
const fs = require('fs');
const config = require('./config');
const bot = new TelegramBot(config.bottoken, { polling: true })
const contents = require('./contents')
const catFacts = require('cat-facts');


function saveUser(username, firstname) {
	var myObject = require('./users');
	for (i in myObject.users) {
		if (myObject.users[i].username == username) {
			var contains = true;
		};
	};
	if (!contains) {
		myObject['users'].push({ 'username': username, 'first': firstname });
	};
	var json = JSON.stringify(myObject);
	fs.writeFile('users.json', json);
};


bot.onText(/\/greet (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	var blub = input[1];
	var resp = 'Hello, ' + blub;
	bot.sendMessage(chatId, resp);
});

bot.onText(/\/lorem/ || /\/lorem (.*)/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	var loremSettings = {
		url: 'http://lorempixel.com/400/200',
		encoding: null
	};
	const chatId = msg.chat.id;
	request(loremSettings, function (error, response, buffer) {
		if (!error && response.statusCode == 200) {
			bot.sendPhoto(chatId, buffer);
		}
	})
});

bot.onText(/\/doit/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	bot.sendPhoto(chatId, contents.doit[Math.floor(Math.random() * contents.doit.length)].link);
});

bot.onText(/\/ship/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, contents.ship[Math.floor(Math.random() * contents.ship.length)].link);
});

bot.onText(/\/drawCard/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);

	const chatId = msg.chat.id;
	let edition = contents.editions[Math.floor(Math.random() * contents.editions.length)];
	bot.sendMessage(chatId, `http://magiccards.info/scans/en/${edition.short}/${Math.floor(Math.random() * edition.count) + 1}.jpg`);
});

bot.onText(/\/drawArt/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);

	const chatId = msg.chat.id;
	let edition = contents.editions[Math.floor(Math.random() * contents.editions.length)];
	bot.sendMessage(chatId, `http://magiccards.info/crop/en/${edition.short}/${Math.floor(Math.random() * edition.count)}.jpg`);
});
//does this function have to exist ... (CptPie)
//quote xAndy: "ja"
//ach mann (CptPie)
bot.onText(/\/💩/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Kothaufen');
});

bot.onText(/\/merge/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, contents.merge[Math.floor(Math.random() * contents.merge.length)].link);
});

var j = schedule.scheduleJob('30 5 * * *', function () {
	downloader('http://wttr.in/' + config.dailyLocation + '.png?1', 'dailywetter.png', function () {
		sendingWeather(config.dailyChatId, config.dailyLocation, __dirname + '/dailywetter.png');
	});
});

var downloader = function (uri, filename, callback) {
	request.head(uri, function (err, res, body) {
		request(uri).pipe(fs.createWriteStream(filename)).on('finish', callback);
	});
};

bot.onText(/\/weather (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	var loc = input[1];
	downloader('http://wttr.in/' + loc + '.png?1', 'wetter.png', function () {
		sendingWeather(chatId, loc, __dirname + '/wetter.png');
	});
});

function sendingWeather(chatId, loc, photo) {
	bot.sendPhoto(chatId, photo, { caption: "Todays weather forecast for: " + loc });
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

bot.onText(/\/slap (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	const chatID = msg.chat.id;
	bot.sendMessage(chatID, "<b>" + msg.from.first_name + " slaps " + input[1] + " around a bit with a large trout</b>", { parse_mode: "HTML" });
});


bot.onText(/\/hype/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	bot.sendMessage(msg.chat.id, msg.from.first_name + ' started a HYPE-Train!');
	bot.sendPhoto(msg.chat.id, 'http://imgur.com/Ibx2NJs');
});

bot.onText(/\/choose (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	var str = input[1];
	var res = str.split(", ");
	var answer = res[Math.floor(Math.random() * res.length)];
	bot.sendMessage(msg.chat.id, "@shipitbot has chosen *" + answer + "* for " + msg.from.first_name, { parse_mode: "Markdown" });
});

bot.onText(/\/scissors/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	let sign = contents.sign[Math.floor(Math.random() * Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, it\'s a draw between ShipIt-Bot and ' + msg.from.first_name);
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, ' + msg.from.first_name + ' has lost');
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, ' + msg.from.first_name + ' has won');
	}
});

bot.onText(/\/rock/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	let sign = contents.sign[Math.floor(Math.random() * Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, ' + msg.from.first_name + ' has won');
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, it\'s a draw between ShipIt-Bot and ' + msg.from.first_name);
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, ' + msg.from.first_name + ' has lost');
	}
});

bot.onText(/\/paper/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name);
	let sign = contents.sign[Math.floor(Math.random() * Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, ' + msg.from.first_name + ' has lost');
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, ' + msg.from.first_name + ' has won');
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, it\'s a draw between ShipIt-Bot and ' + msg.from.first_name);
	}
});

bot.onText(/\/who (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name);
	var users = require('./users')
	username = users.users[Math.floor(Math.random() * Object.keys(users.users).length)].first;
	bot.sendMessage(msg.chat.id, '' + username + ' ' + input[1]);
});

bot.onText(/\/motivation/, (msg, input) => {
	request.get("http://inspirobot.me/api?generate=true", (error, response, body) => {
		if (error) {
			console.log(`error getting inspiration ${error}`);
			return
		}
		downloader(body, 'inspiration.jpg', () => {
			bot.sendPhoto(msg.chat.id, `${__dirname}/inspiration.jpg`, { caption: `get motivated ${msg.from.first_name}! ${body}` });
		})
	})
});


bot.onText(/\/space/, (msg) => {
	var msgid;
	var timerid;
	var waitmsg = "fetching space status: ";
	bot.sendMessage(msg.chat.id, waitmsg).
	then((msginfo)=>{
		msgid = msginfo.message_id;
		timerid = setInterval(()=>{
			waitmsg+="* ";
			bot.editMessageText(waitmsg, {message_id: msgid, chat_id: msg.chat.id});
		}, 2500);
	}).then(()=>{
		request.get("http://status.bckspc.de/spacestatus.php", (error, response, body) => {
			clearInterval(timerid);
			let status = JSON.parse(body);
			var msgtext = "Der space ist geschlossen";
			var icon = status.state.icon.closed;
			if(status.open){
				icon = status.state.icon.open;
				msgtext = "Der space ist offen."
				if(status.sensors.people_now_present[0].value==1){
					msgtext += `\n${status.sensors.people_now_present[0].names[0]} ist im Space`
				}else{
					msgtext += `\n${status.sensors.people_now_present[0].names.join(', ')} sind im Space`
				}
			}
			msgtext += `[.](${icon})`;
			bot.editMessageText(msgtext, {message_id: msgid, chat_id: msg.chat.id, parse_mode: 'markdown'});
		})
	});
});

bot.onText(/\/(fact|cat)/,(msg) =>{
	saveUser(msg.from.username, msg.from.first_name);
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, catFacts.random());
});

bot.onText(/\/source/,(msg)=>{
	saveUser(msg.from.username, msg.from.first_name);
	bot.sendMessage(msg.chat.id,"The source files are open source on GitHub: https://github.com/CptPie/telegram-shipit-bot/");
});

//its awful but it finally works! - fml

bot.onText(/\/math (.+)/,(msg, input) =>{
	var mathrenderer = function (input,callback) {
	var mjAPI = require("mathjax-node-svg2png");
	mjAPI.config({
	  MathJax: {}
	});
	mjAPI.start();
		var yourMath = input;
		mjAPI.typeset({
		  math: yourMath,
		  format: "TeX",
		  scale: 2,
		  png:true
		}, function (data) {
		  if (!data.errors) {
			base64Data = data.png.replace(/^data:image\/png;base64,/,""),
		  	binaryData = new Buffer(base64Data, 'base64').toString('binary');
			require("fs").writeFile("out.png", binaryData, "binary", function (err){
				console.log("Error: "+err);
				callback();
			});
		  }
		});
	};
	mathrenderer(input[1],sendit);
	var chatId = msg.chat.id;
	function sendit(){
		bot.sendPhoto(msg.chat.id,__dirname+"/out.png");
	}
});

bot.onText(/\/help/,(msg) =>{
	bot.sendMessage(msg.chat.id,
		"Hi there, I am a simple telegram bot named shipitbot. I can understand the following commands:\n* \/burn - I will burn the witch!\n* \/cat - I will send a random cat fact\n* \/choose [option 1],..., [option n] - I will help you to choose between any amount of options\n* \/decide [question] - I will decide for you (returns yes or no)\n* \/doit - I will send a random picture related to the meme 'Just do it!'\n* \/drawArt - I will send a random art from the early years of magic the gathering, cudos to magiccards.info\n* \/drawCard - I will send a random card from the early years of magic the gathering, cudos to magiccards.info\n* \/fact - I will send a random cat fact\n* \/greet [name] - I will greet the provided name!\n* \/help - I will display this message\n* \/hype - I will start the hype train for you\n* \/lorem - I will send a random picture provided by lorempixel.com\n* \/math [formula] - I will send you a nicely rendered picture of your formula (I can even understand LaTeX commands, provided they are from the amsmath package)\n* \/merge - I will send a random picture related to the word 'merge'\n* \/motivation - I will send a randomly generated motivational image\n* \/paper - I will play rock paper scissors with you\n* \/rock - I will play rock paper scissors with you\n* \/scissors - I will play rock paper scissors with you\n* \/shipit - I will send a image related to the phrase 'ship it'\n* \/slap [name] - I will slap the provided person a bit with large trout\n* \/source - I will link you to the GitHub repository which contains my source files\n* \/space - I will send you the current status of the hackerspace in Bamberg, Germany\n* \/weather [location] - I will send you the weather forecast for today for the provided location (from wttr.in)\n* \/who [message] - (should be used in a group) I will select a random user of a group and display the users name with the provided message\n");
23
});