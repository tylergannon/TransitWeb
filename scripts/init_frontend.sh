#!/usr/bin/env sh

cd /app

SHA1_FILE=/app/node_modules/package-lock.json.sha1
shasum -c $SHA1_FILE;
if [ $? -ne 0 ]; then
    echo "package-lock.json has changed, rebuilding node_modules"
    npm install --omit=dev
    # if the node_modules directory doesn't have a symlink called unit-http,
    # then link it using npm link.

    shasum /app/package-lock.json > $SHA1_FILE
else
    echo "package-lock.json has not changed, skipping rebuild"
fi

if [ ! -L node_modules/unit-http ]; then
    echo "unit-http symlink not found, linking"
    npm link unit-http
fi

# change mode to fail on error.
set -e

curl -X PUT \
    --data-binary @- \
    --unix-socket /run/control.unit.sock http://localhost/config <<EOF
{
    "listeners": {
        "*:5173": { "pass": "routes" },
        "*:5143": { "pass": "routes", 
                    "tls": { "certificate": "transitweb" } },
        "*:80": { "pass": "applications/transitweb" },
        "*:443": { "pass": "applications/transitweb", 
                    "tls": { "certificate": "transitweb" } }
    },
    "applications":{
        "transitweb":{
            "type": "external",
            "working_directory": "/app",
            "executable": "init_app.js",
            "user": "unit",
            "group": "unit",
            "arguments": [ ]
        }
    },
    "routes": [
        {
            "action": { "proxy": "http://10.1.2.2:5173" }
        }
    ]
}
EOF

