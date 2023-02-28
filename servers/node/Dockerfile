# NODE Web Server
# M1 Macs need to use the arm64v8/node image, which must be built on an M1 Mac.
# See Makefile.
FROM tylergannon/alpine-fish

ARG update=1
COPY .out/app /app
WORKDIR /app
COPY .out/package.json .out/package-lock.json /app/
COPY init_container.sh /etc/

ARG SHA1_FILE=/app/node_modules/package-lock.json.sha1

# Install and then at the end, remove all cached package information.
RUN apk add --no-cache \
        nodejs \
        npm \
    && npm ci --omit=dev \
    && md5sum package-lock.json > $SHA1_FILE 

VOLUME [ "/app/node_modules" ]
VOLUME [ "/app" ]

ENV HOST=0.0.0.0 \
    PORT=3000 \
    NODE_ENV=production \
    NODE_PATH=/app 
ARG CONTAINER_ID="tylergannon/node"
ARG CONTAINER_HOST_ID="Unknown"
ENV CONTAINER_ID=${CONTAINER_ID} CONTAINER_HOST_ID=${CONTAINER_HOST_ID}

CMD ["/etc/init_container.sh"]

