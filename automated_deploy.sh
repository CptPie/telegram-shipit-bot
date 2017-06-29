while [ 1 ]; do
        git fetch origin
        reslog=$(git log HEAD..origin/master --oneline)
        if [ "${reslog}" != "" ]; then
                echo "\n"
                echo ">> New version avaiable\n"
                echo ">> Killing current 'node bot.js' process"
                # ToDo: kill current node.js process
                echo "..."
                echo ">> Process killed"
                echo ">> Merging changed"
                echo "..."
                git merge origin/master
                echo ">> Starting Bot again \n"
                ./make.sh -a &
        fi
        
        sleep 1m
done
