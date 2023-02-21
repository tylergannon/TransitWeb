# NODE Web Server
# M1 Macs need to use the arm64v8/node image, which must be built on an M1 Mac.
# See Makefile.
FROM node:bullseye-slim
WORKDIR /app

COPY .out/package.json .out/package-lock.json /app/
COPY init_container.sh /etc/

ARG SHA1_FILE=/app/node_modules/package-lock.json.sha1

# Install and then at the end, remove all cached package information.
RUN apt-get update \
    && apt-get install -y \
        dumb-init \
    && cd /app \
    && npm install --omit=dev \
    && md5sum package-lock.json > $SHA1_FILE \
    && rm -rf /var/lib/apt/lists/* 

ARG build=1
COPY .out/app/* /app/

VOLUME [ "/app/node_modules" ]
VOLUME [ "/app" ]

ENV HOST=0.0.0.0 \
    PORT=3000 \
    NODE_ENV=production \
    NODE_PATH=/app 


ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["/etc/init_container.sh"]