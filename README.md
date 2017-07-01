# telegram-shipit-bot
Simple telegram bot with basic Message and picture sending capabilities.
The bot also sends daily at 6:00 am the weather forecast for the provided location (see var daily-loc) at the provided chat id (see var ChatId).

# Users
Simply write /shipit or /doit to @shipitbot and enjoy your pictures.
* /choose [option1], [option2] - chooses one of the options
* /decide \<question> - answers a yes/no question
* /doit - sends a random picture related to the phrase "do it"
* /draw - gets a random card from the early years of magic the gathering, cudos an magiccards.info
* /greet [name] - greets the given name "Hello, [name]" 
* /lorem - sends a random picture from lorempixel.com
* /marius - burn the witch!
* /merge - sends a random merge meme picture
* /papier - plays rock/paper/scissors with the bot
+ /schere - plays rock/paper/scissors with the bot
* /shipit - sends a random picture related to the phrase "ship it"
* /slap [name] - slaps [name] around a bit with a large trout
* /stein - plays rock/paper/scissors with the bot
* /weather [location] - sends a picture with the current weather forecast of the provided location (from wttr.in)
+ /wer [text] - '/wer hat an der Uhr gedreht' => '[RandomNameAusArray] hat an der Uhr gedreht'

# For Server-Maintainer
There is a shell script called "automated_deploy.sh".\
This script starts the bot and waits for an update in the master branch. If an update is available, the bot process will be killed, the update will be merged and the bot will be started again.\
If no update is available, your bot just works as expected.\
\
There is no need to use the ./make.sh.

# Build-Script (for developer)
## Usage
The bash script "make.sh" is managing the dependencies and starts the bot.
Following arguments shall be used:
- ./make.sh -> Starts the bot and does not check for dependencies
- ./make.sh -d -> Downloads all dependencies
- ./make.sh -a -> Downloads all dependencies and starts the bot

## Adding a dependency
If you want to add a dependency, simple add the name of the dependency to the array "dependencies" in the function "downloadDependencies"\
Example: `local dependencies=(node-telegram-bot-api request node-schedule)` downloads following dependencies
- node-telegram-bot-api
- request
- node-scheduler

All dependencies are seperated by a whitespace character
