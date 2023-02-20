#!/usr/bin/env fish
cd /app
# if /app/package-lock.json doesn't exist or its shasum doesn't match the one in /app/package-lock.json.sha1, run npm install and update the shasum
set SHA1_FILE /app/node_modules/package-lock.json.sha1
shasum -c $SHA1_FILE; or begin
    npm install
    shasum /app/package-lock.json > $SHA1_FILE
end

npm run dev -- --host
