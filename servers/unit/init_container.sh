#!/usr/bin/env sh

# If there is already a certificate by this name in the nginx unit server,
# remove it first.

SOCKET=/run/control.unit.sock
SRV=http://localhost
SECRETS_DIR=/run/secrets
CONF_D=/etc/unit-config.d

function complain {
    echo "Error: $1"
    exit 1
}

# find all files in the directory ending with ".pem"
for file in $SECRETS_DIR/*.pem; do
    # extract the filename without its preceding path or extension
    bundle=$(basename "$file" .pem)
    curl -f -X PUT --data-binary @$SECRETS_DIR/$bundle.pem \
        --unix-socket $SOCKET $SRV/certificates/$bundle \
    || complain "Could not check/remove bundle $bundle"
done

for file in $CONF_D/*.json; do
    curl -f -X PUT --data-binary @$file --unix-socket $SOCKET $SRV/config \
    || complain "Could not upload config $file"
done

wait
