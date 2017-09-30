#!/bin/bash

echo "`date` [AD] Started Automated Deploy Script" | tee -a log.txt

echo "`date` [NPM] updating npm" | tee -a log.txt
npm update 2>&1 | tee -a log.txt
echo "`date` [NPM] update done" | tee -a log.txt

echo "`date` [NPM] npm start" | tee -a log.txt
npm start 2>&1 | tee -a log.txt &

while [ 1 ]; do
        git fetch origin

        reslog=$(git log HEAD..origin/master --oneline)

        if [ "${reslog}" != "" ]; then
                echo "`date` [GIT] new commit detected" | tee -a log.txt
                echo "`date` [PREP] preparing for merge" | tee -a log.txt
                
                echo "`date` [PREP][NPM] Updating npm packages" | tee -a log.txt
                npm update 2>&1 | tee -a log.txt
                echo "`date` [PREP][NPM] npm packages updated" | tee -a log.txt

                echo "`date` [PREP] New version available" | tee -a log.txt
                echo "`date` [PREP][PROC] Killing current 'node bot.js' and './make.sh' process" | tee -a log.txt
                pkill -f "npm" 2>&1 | tee -a log.txt
                pkill -f "node server.js" 2>&1 | tee -a log.txt
                echo "`date` [PREP][PROC] Process killed" | tee -a log.txt

                echo "`date` [GIT][MERGE] Merging changed" | tee -a log.txt
                git merge origin/master 2>&1 | tee -a log.txt
                echo "`date` [GIT][MERGE] merging done" | tee -a log.txt

                sleep 10s

                echo "`date` [BOT] Starting Bot again" | tee -a log.txt
                npm start 2>&1 | tee -a log.txt &
                
        fi

        sleep 1m
done
