while [ 1 ]; do
        git fetch origin
        reslog=$(git log HEAD..origin/master --oneline)
        if [ "${reslog}" != "" ]; then
                echo "\n"
                echo ">> New version available\n"
                echo ">> Killing current 'node bot.js' and './make.sh' process"
                echo "..."
                pkill -f "./make.sh"
                pkill -f "node ./bot.js"
                echo ">> Process killed"
                echo ">> Merging changed"
                echo "..."
                git merge origin/master
                sleep 10s
                echo ">> Starting Bot again \n"
                ./make.sh -a &
        fi
        
        sleep 1m
done
