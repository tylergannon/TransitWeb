#!/usr/bin/env sh

SOCKET=/run/control.unit.sock
BUNDLE=${BUNDLE:-transitweb}
CONFIG_FILE=/opt/config.json
KEY_FILE=/opt/$BUNDLE.pem

unitd --no-daemon &

count=0
while [ ! -S "$SOCKET" ]; do
    sleep 0.1
    count=$((count+1))
    if [ $count -eq 100 ]
    then
        echo "Unit socket not found"
        exit 1 
    fi
done

curl -f -s --unix-socket $SOCKET http://localhost/certificates/$BUNDLE
if [ $? -ne 0 ]; then
    curl -X PUT --data-binary @$KEY_FILE \
        --unix-socket $SOCKET http://localhost/certificates/$BUNDLE
    [ $? -ne 0 ] && exit 1
else
    echo "Certificate already exists" 
fi

curl -X PUT \
    --data-binary @$CONFIG_FILE \
    --unix-socket $SOCKET http://localhost/config
[ $? -ne 0 ] && exit 1

echo $(jobs)
wait
