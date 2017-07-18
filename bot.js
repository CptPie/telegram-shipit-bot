const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const schedule = require('node-schedule');
const fs = require('fs');
const config = require('./config');
const bot = new TelegramBot(config.bottoken, { polling: true })
const contents = require('./contents')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


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
	xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "http://status.bckspc.de/spacestatus.php", false);
	xmlHttp.send(null);
	json = JSON.parse(xmlHttp.responseText);
	var isSpaceOpenString = (json.open) ? "offen" : "geschlossen";
	var pISOutput = "";
	if (json.open) {
		var pIS = "";
		var personInSpace = json.sensors.people_now_present[0].names
		personInSpace.forEach(function (person) { pIS += person + " " });
		pISOutput = (personInSpace.length == 1) ? "\nIm Space befindet sich " + pIS : "\nIm Space befinden sich " + pIS;
		isSpaceOpenString += pISOutput;
	}
	var spacePic = (json.open) ? json.state.icon.open : json.state.icon.closed;
	bot.sendPhoto(msg.chat.id, spacePic, { caption: "Der Space ist " + isSpaceOpenString });
}); 