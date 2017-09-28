const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
const schedule = require('node-schedule');
const fs = require('fs');
const config = require('./config');
const bot = new TelegramBot(config.bottoken, { polling: true });
const contents = require('./contents');
const catFacts = require('cat-facts');
var users = require('./users')
/**
 * @param  {string} username - the username to be saved
 * @param  {string} firstname - the firstname to be saved	
 * @param {int} UserID - the ID of the user	which should be saved
 * This function saves the user data as json object in the user.json file.
 * This function does check for duplicates and ignores it`s call if the user is already present in the json.
 */

function saveUser(username, firstname, UserID) {
	for (i in users.users) {
		if (users.users[i].userID == UserID) {
			var contains = true;
		};
	};
	if (!contains) {
		users['users'].push({ 'username': username, 'first': firstname, 'userID': UserID, 'subscribed': false });
	};
	var json = JSON.stringify(users);
	fs.writeFile('users.json', json);
};

/**
 * This function only triggers if the regex \/\greet (.+)/ is met. (.+) stands for the provided input by the user.
 * The function sends a message in the format: 'Hello [input]'.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/greet (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatId = msg.chat.id;
	var blub = input[1];
	var resp = 'Hello, ' + blub;
	bot.sendMessage(chatId, resp);
});

/**
 * This function sends a random picture provided by lorempixel.com.
 * The funciton only triggers if the regex \/\lorem/ or \/\lorem (.+)/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/lorem/ || /\/lorem (.*)/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
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

/**
 * This function sends a random picture/gif provided by the array 'doit' in the contents.json.
 * The function only triggers if the regex /\/doit/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/doit/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	let chatId = msg.chat.id;
	bot.sendPhoto(chatId, contents.doit[Math.floor(Math.random() * contents.doit.length)].link);
});

/**
 * This function sends a random picture/gif provided by the array 'ship' in the contents.json.
 * The function only triggers if the regex /\/ship/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/ship/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	let chatId = msg.chat.id;
	bot.sendMessage(chatId, contents.ship[Math.floor(Math.random() * contents.ship.length)].link);
});

/**
 * This funciton sends a random card from a random edition provided by the array 'editions' in the contents.json.
 * Cards provided by http://magiccards.info.
 * The function only triggers if the regex /\/drawCard/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/drawCard/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	let chatId = msg.chat.id;
	let edition = contents.editions[Math.floor(Math.random() * contents.editions.length)];
	bot.sendMessage(chatId, `http://magiccards.info/scans/en/${edition.short}/${Math.floor(Math.random() * edition.count) + 1}.jpg`);
});

/**
 * This function sends a random cardart from a random edition provides by the array 'editions' in the contents.json.
 * Cardarts provided by http://magiccards.info.
 * The function only triggers if the regex \/\drawArt/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/drawArt/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	let chatId = msg.chat.id;
	let edition = contents.editions[Math.floor(Math.random() * contents.editions.length)];
	bot.sendMessage(chatId, `http://magiccards.info/crop/en/${edition.short}/${Math.floor(Math.random() * edition.count)}.jpg`);
});

/**
 * Apparantly this has to exist :/
 * This funciton sends the message 'Kothaufen', if you use the command /[hankeyemoji] is used.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/💩/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Kothaufen');
});

/**
 * This function sends a random picture/gif provided by the array 'merge' in the contents.json.
 * The function only triggers if the regex /\/merge/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/merge/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, contents.merge[Math.floor(Math.random() * contents.merge.length)].link);
});

/**
 * @param  {string} config.dailyLocation - The location for which the weather forcast should be sent
 * This function sends the weather forecast for the provided location
 * Weather forecast by http://wttr.in.
 * The function triggers daily at 5:30 am (server-/hosttime).
 */

schedule.scheduleJob('30 5 * * *', function () {
	downloader('http://wttr.in/' + config.dailyLocation + '.png?1', 'dailywetter.png', function () {
		sendingWeather(config.dailyChatId, config.dailyLocation, __dirname + '/dailywetter.png');
	});
});

/**
 * @param  {uri} uri - The URL from which should be downloaded
 * @param  {string} filename - The filename as which the downloaded file should be saved (includes file extension)
 * This function is a simple downloader for files.
 */

var downloader = function (uri, filename, callback) {
	request.head(uri, function (err, res, body) {
		request(uri).pipe(fs.createWriteStream(filename)).on('finish', callback);
	});
};

/**
 * This function sends the weather forecast for the provided location.
 * Weather forecast by http://wttr.in.
 * The function triggers if the regex /\/weather (.+)/ is met, (.+) is the input which contains the location for the forecast.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/weather (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatId = msg.chat.id;
	var loc = input[1];
	downloader('http://wttr.in/' + loc + '.png?1', 'wetter.png', function () {
		sendingWeather(chatId, loc, __dirname + '/wetter.png');
	});
});

/**
 * @param  {int} chatId - The chat id to which the photo should be send.
 * @param  {string} loc - The location of the forecast.
 * @param  {uri} photo - The filepath to the photo which should be send.
 * This function sends the provided photo with the caption 'Todays weather forecast for: [loc]' to the provided chatId.
 */

function sendingWeather(chatId, loc, photo) {
	bot.sendPhoto(chatId, photo, { caption: "Todays weather forecast for: " + loc });
};

/**
 * This function answers to the input with 'yes' or 'no'
 * The function triggers if the regex \/\decide (.+)/ is met, (.+) is the input to which the bot answers.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/decide (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatID = msg.chat.id;
	var answer = Math.random() >= 0.5 ? "Yes" : "No";
	bot.sendMessage(chatID, input[1] + " " + answer);
});

/**
 * This function send a gif.
 * The function triggers if the regex \/\burn/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/burn/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatID = msg.chat.id;
	bot.sendMessage(chatID, "https://i.giphy.com/media/l2YWsiql5xGPIbnzy/giphy.gif");
});

/**
 * This function sends a message.
 * The function triggers if the regex \/\slap (.+)/ is met, (.+) is the input which is used in the message.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/slap (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatID = msg.chat.id;
	bot.sendMessage(chatID, "<b>" + msg.from.first_name + " slaps " + input[1] + " around a bit with a large trout</b>", { parse_mode: "HTML" });
});

/**
 * This functions sends a photo.
 * The function triggers if the regex \/\hype/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/hype/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	bot.sendMessage(msg.chat.id, msg.from.first_name + ' started a HYPE-Train!');
	bot.sendPhoto(msg.chat.id, 'http://imgur.com/Ibx2NJs');
});

/**
 * This function takes one input, splits it on the comma, and sends one random element of the split input.
 * The function triggers if the regex \/\choose (.+)/ is met, (.+) is the input which is split.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/choose (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	var str = input[1];
	var res = str.split(", ");
	var answer = res[Math.floor(Math.random() * res.length)];
	bot.sendMessage(msg.chat.id, "@shipitbot has chosen *" + answer + "* for " + msg.from.first_name, { parse_mode: "Markdown" });
});

/**
 * This function is one of the three required functions needed for the rock paper scissors game with the bot.
 * The function only triggers if the regex \/\scissors/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 * 
 * @param {string} sign - one of the three signs in rock paper scissors randomly selected from the array sing in the contents.json.
 *
 *  The function sends a message according to the result of the game.
 */

bot.onText(/\/scissors/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	let sign = contents.sign[Math.floor(Math.random() * Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, it\'s a draw between ShipIt-Bot and ' + msg.from.first_name);
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, ' + msg.from.first_name + ' has lost');
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, ' + msg.from.first_name + ' has won');
	}
});

/**
 * This function is one of the three required functions needed for the rock paper scissors game with the bot.
 * The function only triggers if the regex \/\rock/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 * 
 * @param {string} sign - one of the three signs in rock paper scissors randomly selected from the array sing in the contents.json.
 *
 *  The function sends a message according to the result of the game.
 */

bot.onText(/\/rock/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	let sign = contents.sign[Math.floor(Math.random() * Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, ' + msg.from.first_name + ' has won');
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, it\'s a draw between ShipIt-Bot and ' + msg.from.first_name);
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, ' + msg.from.first_name + ' has lost');
	}
});

/**
 * This function is one of the three required functions needed for the rock paper scissors game with the bot.
 * The function only triggers if the regex \/\paper/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 * 
 * @param {string} sign - one of the three signs in rock paper scissors randomly selected from the array sing in the contents.json.
 *
 *  The function sends a message according to the result of the game.
 */

bot.onText(/\/paper/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	let sign = contents.sign[Math.floor(Math.random() * Object.keys(contents.sign).length)].name;
	if (sign == 'scissors') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose scissors, ' + msg.from.first_name + ' has lost');
	} else if (sign == 'rock') {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose rock, ' + msg.from.first_name + ' has won');
	} else {
		bot.sendMessage(msg.chat.id, 'ShipIt-Bot chose paper, it\'s a draw between ShipIt-Bot and ' + msg.from.first_name);
	}
});

/**
 * This function uses the user list in the users.json file to select a random user and append the input.
 * The function only triggers if the regex \/\who (.+)/ is met, (.+) is the input which is later used.
 * This function also uses the saveUser function to save any users in the users.json.
 * @param {string} user - random user from the users array in the users.json.
 */

bot.onText(/\/who (.+)/, (msg, input) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	username = users.users[Math.floor(Math.random() * Object.keys(users.users).length)].first;
	bot.sendMessage(msg.chat.id, '' + username + ' ' + input[1]);
});

/**
 * This function sends a randomly generated motivational picture from http://inspirobot.me.
 * This function also uses the saveUser function to save any users in the users.json.
 * The function only triggers if the regex \/\motivation/ is met.
 * This function downloads the picture using the function downloader and sends it with a caption
 */

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

/**
 * This function sends the status of the Backspace Bamberg e.V. facitlities.
 * The function only triggers if the regex \/\space/ is met.
 * The function sends and edites messages and finally sends a picture from the server of the Backspace e.V.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/space/, (msg) => {
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
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

/**
 * This function sends a random cat fact and cat picture.
 * The function only triggers if the regex \/\(fact|cat)/ is met.
 * It downloads a randomly provided picture from https://random.cat/meow.
 * It also uses the catFacts api to get a random catFact.
 * The function sends the downloaded picture together with the fact from the api
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/(fact|cat)/,(msg) =>{
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	const chatId = msg.chat.id;
	downloader("https://random.cat/meow","cat.json", function(){
		var obj;
		fs.readFile('./cat.json','utf8',function (err,data) {
			obj = JSON.parse(data);
			bot.sendPhoto(chatId,obj.file,{caption: catFacts.random()})
		})
	})		
});

/**
 * This function sends a link to the sourcefiles on github.com
 * The function only triggers if the regex /\/source/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/source/,(msg)=>{
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	bot.sendMessage(msg.chat.id,"The source files are open source on GitHub: https://github.com/CptPie/telegram-shipit-bot/");
});

/**
 * This function takes math expressions in the LaTeX format, renders them as svg and converts this svg to a png and sends it as photo.
 * The function only triggers if the regex \/\math (.+)/ is met, (.+) is the input which should be converted into a png.
 * The function uses the mathjax-node-svg2png api to render the math expression as png file.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/math (.+)/,(msg, input) =>{
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
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

/**
 * This function is a simple help command which lists all aviable commands to be used by users.
 * The function only triggers if the regex \/\help/ is met.
 * This function also uses the saveUser function to save any users in the users.json.
 */

bot.onText(/\/help/,(msg) =>{
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	bot.sendMessage(msg.chat.id,
		"Hi there, I am a simple telegram bot named shipitbot. I can understand the following commands:\n* \/burn - I will burn the witch!\n* \/cat - I will send a random cat fact\n* \/choose [option 1],..., [option n] - I will help you to choose between any amount of options\n* \/decide [question] - I will decide for you (returns yes or no)\n* \/doit - I will send a random picture related to the meme 'Just do it!'\n* \/drawArt - I will send a random art from the early years of magic the gathering, cudos to magiccards.info\n* \/drawCard - I will send a random card from the early years of magic the gathering, cudos to magiccards.info\n* \/fact - I will send a random cat fact\n* \/greet [name] - I will greet the provided name!\n* \/help - I will display this message\n* \/hype - I will start the hype train for you\n* \/lorem - I will send a random picture provided by lorempixel.com\n* \/math [formula] - I will send you a nicely rendered picture of your formula (I can even understand LaTeX commands, provided they are from the amsmath package)\n* \/merge - I will send a random picture related to the word 'merge'\n* \/motivation - I will send a randomly generated motivational image\n* \/paper - I will play rock paper scissors with you\n* \/rock - I will play rock paper scissors with you\n* \/scissors - I will play rock paper scissors with you\n* \/shipit - I will send a image related to the phrase 'ship it'\n* \/slap [name] - I will slap the provided person a bit with large trout\n* \/source - I will link you to the GitHub repository which contains my source files\n* \/space - I will send you the current status of the hackerspace in Bamberg, Germany\n* \/weather [location] - I will send you the weather forecast for today for the provided location (from wttr.in)\n* \/who [message] - (should be used in a group) I will select a random user of a group and display the users name with the provided message\n");
});

/**
 * This function sends weather warnings for the area code provided from the config.json.
 * The function triggers every full hour (servertime) and downloads the current list of warnings from dwd.de.
 * The function then cleans the downloaded file, searches for the provided area code, checks if it is not only a fog warning and then sends 2 messages containing the warning.
 */

var lastWarning="";

schedule.scheduleJob('*/5 * * * *', function () {	
	downloader("http://dwd.de/DWD/warnungen/warnapp/json/warnings.json","warnings.json", function(){
		var warnArea = config.warningCode
		var obj;
		var warnMessage;
		fs.readFile('./warnings.json','utf8',function (err,data) {
			if (err){
				return console.log(err)
			};
			dataClean=data.substring(24,data.length-2);		//hardcoded substring is not optimal but works for now
			obj = JSON.parse(dataClean);
			if (obj.warnings[warnArea]==undefined){
				warnMessage="*"+"No more warnings for your area."+"*";
			} else {
				warnMessage="*"+obj.warnings[warnArea][0].headline+"*"+" fuer "+obj.warnings[warnArea][0].regionName+"\n\n"+obj.warnings[warnArea][0].description
			};
			for(i in users.users){
				if(users.users[i].subscribed){
					if (lastWarning!==warnMessage) {
						bot.sendMessage(users.users[i].userID, warnMessage,{parse_mode: "Markdown"});
						lastWarning=warnMessage;
					};	
				};
			};
		});
	});
});

bot.onText(/\/subscribe/,(msg)=>{
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	for(i in users.users){
		if(users.users[i].userID===msg.from.id){
			if(!users.users[i].subscribed){
				users.users[i].subscribed=true;
				bot.sendMessage(msg.from.id,'You are now subscribed to weather warnings.');
			} else {
				bot.sendMessage(msg.from.id,'You are already subscribed to weather warnings.');		
			}
		}
	}
	var json = JSON.stringify(users);
	fs.writeFile('users.json', json);
})

bot.onText(/\/unsubscribe/,(msg)=>{
	saveUser(msg.from.username, msg.from.first_name, msg.from.id);
	for(i in users.users){
		if(users.users[i].userID===msg.from.id){
			if(users.users[i].subscribed){
				users.users[i].subscribed=false;
				bot.sendMessage(msg.from.id,'You are now unsubscribed to weather warnings.');
			} else {
				bot.sendMessage(msg.from.id,'You are already unsubscribed to weather warnings.');		
			}
		}
	}
	var json = JSON.stringify(users);
	fs.writeFile('users.json', json);
})
