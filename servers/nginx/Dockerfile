FROM tylergannon/alpine-fish

ARG UID
ARG GID
ENV UID=${UID} GID=${GID}

RUN addgroup -g $GID -S nginx; \
    adduser \
        -H \
        -G nginx \
        -D \
        -S \
        -u $UID \
        nginx \
    && apk add --no-cache \
        dumb-init \
        nginx \
        fish

ARG CONTAINER_ID="tylergannon/nginx"
ARG CONTAINER_HOST_ID="Unknown"
ENV CONTAINER_ID=${CONTAINER_ID} CONTAINER_HOST_ID=${CONTAINER_HOST_ID}
