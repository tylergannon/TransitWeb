#!/usr/bin/env bash

cd /app
# Check to see if the md5sum matches.
SUM_FILE=/app/node_modules/build_sum.md5
md5sum --status -c $SUM_FILE
if [ $? -ne 0 ]; then
    npm install
    md5sum --quiet /app/package-lock.json > $SUM_FILE
fi
npm run build
