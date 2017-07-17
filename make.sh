#!/bin/bash

####################
# Check for NodeJS #
####################

# Check if "Node JS" is installed
# Program exits if it's not installed
if [ "`which node`" == "" ]; then
	echo "Node is not installed"
	echo -e "please install node\n"
	
	echo "See: https://nodejs.org/en/download/package-manager/"
	exit
fi

####################
# Helper Functions #
####################

# Downloads every dependency via npm
# Therefore, every dependency has be listed in the array "dependencies", seperated by a whitespace
function downloadDependencies {
	echo "Downloading dependencies"

	local dependencies=(node-telegram-bot-api request node-schedule xmlhttprequest)

	for dependency in "${dependencies[@]}"; do
		npm install $dependency
	done
}

################
# Main Program #
################

# Checks the given argument
# if no argument is given, the bot will be started
# if argument -d is given, only the dependencies will be installed
# if argument -a is given, the dependencies will be installed and the bot will be started
if [ $# == 0 ]; then
	echo "Starting Telegram Bot"
	node ./bot.js
elif [ $1 == -d ]; then
	downloadDependencies
elif [ $1 == -a ]; then
	downloadDependencies
	./make.sh 
fi
