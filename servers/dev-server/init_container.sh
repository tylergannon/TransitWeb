#!/usr/bin/env sh

# If there is already a certificate by this name in the nginx unit server,
# remove it first.

complain() {
    echo "Error: $1"
    exit 1
}

SHA1_FILE=/app/node_modules/package-lock.json.sha1
md5sum -s -c $SHA1_FILE;
if [ $? -ne 0 ]; then
    echo "package-lock.json has changed, rebuilding node_modules"
    npm install
    # if the node_modules directory doesn't have a symlink called unit-http,
    # then link it using npm link.

    md5sum /app/package-lock.json > $SHA1_FILE
else
    echo "package-lock.json has not changed, skipping rebuild"
fi

npm run dev -- --host --clearScreen false
