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
* /decide \<question> - answers a yes/no question
* /marius - burn the witch!
* /slap [name] - slaps [name] around a bit with a large trout

# Build-Script
## Usage
The bash script "make.sh" is managing the dependencies and starts the bot.
Following arguments shall be used:
- ./make.sh -> Starts the bot and does not check for dependencies
- ./make.sh -d -> Downloads all dependencies
- ./make.sh -a -> Downloads all dependencies and starts the bot

# For Server-Maintainer
There is a shell script called "automated_deploy.sh".\
This script starts the bot and waits for an update in the master branch. If an update is available, the bot process will be killed, the update will be merged and the bot will be started again.\
If no update is available, your bot just works as expected.\
\
There is no need to use the ./make.sh.

## Adding a dependency
If you want to add a dependency, simple add the name of the dependency to the array "dependencies" in the function "downloadDependencies"\
Example: `local dependencies=(node-telegram-bot-api request node-schedule)` downloads following dependencies
- node-telegram-bot-api
- request
- node-scheduler

All dependencies are seperated by a whitespace character
