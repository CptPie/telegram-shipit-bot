# Telegram Ship-it Bot
Simple telegram bot with some random basic capabilities, see below for more information.\
The bot also sends daily at 5:30 am the weather forecast for the provided location (see config.json).

# Users
Hi there, I am a simple telegram bot named shipitbot. I can understand the following commands:
* /burn - I will burn the witch!
* /cat - I will send a random cat fact
* /choose [option 1],..., [option n] - I will help you to choose between any amount of options
* /decide [question] - I will decide for you (returns yes or no)
* /doit - I will send a random picture related to the meme 'Just do it!'
* /drawArt - I will send a random art from the early years of magic the gathering, cudos to magiccards.info
* /drawCard - I will send a random card from the early years of magic the gathering, cudos to magiccards.info
* /fact - I will send a random cat fact
* /greet [name] - I will greet the provided name!
* /help - I will display this message
* /hype - I will start the hype train for you
* /lorem - I will send a random picture provided by lorempixel.com
* /math [formula] - I will send you a nicely rendered picture of your formula (I can even understand LaTeX commands, provided they are from the amsmath package)
* /merge - I will send a random picture related to the word 'merge'
* /motivation - I will send a randomly generated motivational image
* /paper - I will play rock paper scissors with you
* /rock - I will play rock paper scissors with you
* /scissors - I will play rock paper scissors with you
* /shipit - I will send a image related to the phrase 'ship it'
* /slap [name] - I will slap the provided person a bit with large trout
* /source - I will link you to the GitHub repository which contains my source files
* /space - I will send you the current status of the hackerspace in Bamberg, Germany
* /weather [location] - I will send you the weather forecast for today for the provided location (from wttr.in)
* /who [message] - (should be used in a group) I will select a random user of a group and display the users name with the provided message

# For Server-Maintainer
There is a shell script called "automated_deploy.sh".\
This script starts the bot and waits for an update in the master branch. If an update is available, the bot process will be killed, the update will be merged and the bot will be started again.\
If no update is available, your bot just works as expected.\
<br />
But before starting the "automated_deploy.sh", copy your bot token into the config.json -> bottoken

# Building the bot
The build process is done via npm.\
\
Please read the following documentation to get familiar with npm: \
https://docs.npmjs.com/
