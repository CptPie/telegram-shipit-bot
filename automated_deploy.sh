#!/bin/bash

npm update
npm start &

echo "server started"

echo ""
echo ""

while [ 1 ]; do
        git fetch origin
        reslog=$(git log HEAD..origin/master --oneline)
        if [ "${reslog}" != "" ]; then
                echo "Updating npm packages"
                echo "..."
                npm update
                echo "npm packages updated"

                echo ""
                echo ""

                echo ">> New version available"
                echo ">> Killing current 'node bot.js' and './make.sh' process"
                echo "..."
                pkill -f "npm"
                pkill -f "node server.js"
                echo ">> Process killed"

                echo ""
                echo ""

                echo ">> Merging changed"
                echo "..."
                git merge origin/master

                sleep 10s

                echo ""
                echo ""

                echo ">> Starting Bot again \n"
                npm start &
        fi

        sleep 1m
done
