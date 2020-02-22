#!/bin/bash

if [ -z "$1" ]; then
    MODE="staging"
else
    MODE=$1
fi

if [ $MODE = "production" ]; then
    BASE_HREF="/map/"
    HTACCESS_FILE="htaccess/htaccess-map"
elif [ $MODE = "staging" ]; then
    BASE_HREF="/map2/"
    HTACCESS_FILE="htaccess/htaccess-map2"
else
    echo "Illegal argument"
    exit -1
fi

# Setting MSYS2_ARG_CONV_EXCL is necessary for Git Bash (on Windows).
# See https://stackoverflow.com/questions/50662064/
MSYS2_ARG_CONV_EXCL="--base-href" npm run verify -- --base-href=$BASE_HREF

cp $HTACCESS_FILE dist/.htaccess

DEPLOY_DIR="/var/www/berlin-vegan-wp"$BASE_HREF
SERVER="deploy@berlin-vegan.de"

if command -v rsync &> /dev/null; then # if rsync is available
    # The .json files are only needed for development.
    rsync -avz --exclude=dist/assets/*.json dist/ $SERVER:$DEPLOY_DIR
else
    echo "You must install rsync. If you use Windows, see https://serverfault.com/a/872557/124321."
    exit -1
fi

npm run lighthouse -- https://www.berlin-vegan.de$BASE_HREF
