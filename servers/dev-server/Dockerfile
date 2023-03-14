# NODE Web Server
# M1 Macs need to use the arm64v8/node image, which must be built on an M1 Mac.
# See Makefile.
FROM tylergannon/alpine-fish

WORKDIR /app

# Install and then at the end, remove all cached package information.
RUN apk add --no-cache \
        nodejs \
        npm \
        git

VOLUME [ "/app" ]
VOLUME [ "/app/node_modules" ]

ENV NODE_PATH=/app

ARG update=1
COPY init_container.sh /etc/
CMD ["/etc/init_container.sh"]

