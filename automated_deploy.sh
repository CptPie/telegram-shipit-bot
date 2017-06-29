while [ 1 ]; do
        git fetch origin
        reslog=$(git log HEAD..origin/master --oneline)
        if [ "${reslog}" != "" ]; then
                echo "\n"
                echo ">> New version available\n"
                echo ">> Killing current 'node bot.js' process"
                echo "..."
                pkill -f "./make.sh"
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
