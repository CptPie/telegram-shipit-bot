# telegram-shipit-bot
Simple telegram bot with basic Message and picture sending capabilities.
The bot also sends daily at 6:00 am the weather forecast for the provided location (see var daily-loc) at the provided chat id (see var ChatId).

# Users
Simply write /shipit or /doit to @shipitbot and enjoy your pictures.
* /greet [name] - greets the given name "Hello, [name]" 
* /shipit - sends a random picture related to the phrase "ship it"
* /doit - sends a random picture related to the phrase "do it"
* /lorem - sends a random picture from lorempixel.com
* /merge - sends a random merge meme picture
* /weather [location] - sends a picture with the current weather forecast of the provided location (from wttr.in)


# Devs

Dependencies: 
* <a href="https://github.com/yagop/node-telegram-bot-api">node-telegram-bot-api<a/>
* <a href="https://github.com/request/request">request<a/>
* <a href="https://nodejs.org/en/">NodeJS<a/>
* <a href="https://www.npmjs.com/package/node-schedule">node-schedule<a/>

Usage:
To start the bot navigate into the directory and run ```node bot.js```
