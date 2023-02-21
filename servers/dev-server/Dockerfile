# NODE Web Server
# M1 Macs need to use the arm64v8/node image, which must be built on an M1 Mac.
# See Makefile.
FROM alpine:edge

WORKDIR /app

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

ARG update=1
COPY init_container.sh /etc/
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/etc/init_container.sh"]
