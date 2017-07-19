# Telegram Ship-it Bot
Simple telegram bot with basic Message and picture sending capabilities.\
The bot also sends daily at 5:30 am the weather forecast for the provided location (see config.json).

# Users
Use these commands to get a response from the bot.
* /burn - burn the witch!
* /choose [option1], [option2] - chooses one of the options
* /decide \<question> - answers a yes/no question
* /doit - sends a random picture related to the phrase "do it"
* /drawArt - gets a random art from the early years of magic the gathering, cudos to magiccards.info
* /drawCard - gets a random card from the early years of magic the gathering, cudos to magiccards.info
* /greet [name] - greets the given name "Hello, [name]" 
* /lorem - sends a random picture from lorempixel.com
* /merge - sends a random merge meme picture
* /paper - plays rock/paper/scissors with the bot
* /rock - plays rock/paper/scissors with the bot
* /scissors - plays rock/paper/scissors with the bot
* /shipit - sends a random picture related to the phrase "ship it"
* /slap [name] - slaps [name] around a bit with a large trout
* /weather [location] - sends a picture with the current weather forecast of the provided location (from wttr.in)
* /who [text] - returns a random name from registered users and the provided text e.g. 'CptPie [text]'
* /space - returns true if the space is open or closed


# For Server-Maintainer
There is a shell script called "automated_deploy.sh".\
This script starts the bot and waits for an update in the master branch. If an update is available, the bot process will be killed, the update will be merged and the bot will be started again.\
If no update is available, your bot just works as expected.\
\
There is no need to use the ./make.sh.

# Building the bot
The build process is done via npm.\
\
Please read the following documentation to get familiar with npm: \
https://docs.npmjs.com/
