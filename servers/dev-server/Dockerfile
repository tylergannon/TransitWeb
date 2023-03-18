# NODE Web Server
# M1 Macs need to use the arm64v8/node image, which must be built on an M1 Mac.
# See Makefile.
FROM tylergannon/alpine-fish


# Install and then at the end, remove all cached package information.
RUN apk add --no-cache \
        bat \
        git \
        nodejs \
        npm \
        redis

ARG WORKDIR=/app

ENV WORKDIR=${WORKDIR}

WORKDIR ${WORKDIR}

VOLUME [ "${WORKDIR}" ]
VOLUME [ "${WORKDIR}/node_modules" ]

ENV NODE_PATH=${WORKDIR}
EXPOSE 5173 15000

COPY init_container.sh /usr/local/bin/init_container.sh
CMD ["init_container.sh"]
