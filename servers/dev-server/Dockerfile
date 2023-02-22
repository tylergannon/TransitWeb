# NODE Web Server
# M1 Macs need to use the arm64v8/node image, which must be built on an M1 Mac.
# See Makefile.
FROM alpine:edge

ARG build=1
WORKDIR /app
COPY init_container.sh /etc/

# Install and then at the end, remove all cached package information.
RUN apk add --no-cache \
        dumb-init \
        nodejs \
        npm \
        fish \
        git

VOLUME [ "/app/node_modules" ]
VOLUME [ "/app" ]

ENV NODE_PATH=/app 

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/etc/init_container.sh"]
