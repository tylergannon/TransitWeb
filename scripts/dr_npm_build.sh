#!/usr/bin/env sh

SHA1_FILE=/app/node_modules/package-lock.json.sha1
shasum -c $SHA1_FILE;
if [ $? -ne 0 ]; then
    echo "package-lock.json has changed, rebuilding node_modules"
    npm install
    shasum /app/package-lock.json > $SHA1_FILE
else
    echo "package-lock.json has not changed, skipping rebuild"
fi

npm run build
cp package.json package-lock.json scripts/init_app.js build
