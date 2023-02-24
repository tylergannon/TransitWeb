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

VOLUME [ "/app/node_modules" ]
VOLUME [ "/app" ]

ENV NODE_PATH=/app 
ARG CONTAINER_ID="Svelte-Dev-Server"
ARG CONTAINER_HOST_ID="Unknown"
ENV CONTAINER_ID=${CONTAINER_ID} CONTAINER_HOST_ID=${CONTAINER_HOST_ID}

ARG update=1
COPY init_container.sh /etc/
CMD ["/etc/init_container.sh"]
