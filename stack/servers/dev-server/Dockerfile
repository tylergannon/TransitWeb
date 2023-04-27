# NODE Web Server
# M1 Macs need to use the arm64v8/node image, which must be built on an M1 Mac.
# See Makefile.
FROM tylergannon/alpine-fish


# Install and then at the end, remove all cached package information.
RUN apk add --no-cache \
        bat \
        git \
        nodejs \
        redis \
    && wget -qO- https://get.pnpm.io/install.sh | \
      ENV="/tmp/.shrc" SHELL="/bin/sh" PNPM_HOME=/usr/local/bin/ sh - \
    && mkdir /opt/pnpm \
    && pnpm config set store-dir /opt/pnpm

ARG WORKDIR=/TransitWeb

ENV WORKDIR=${WORKDIR}

WORKDIR ${WORKDIR}

ENV NODE_PATH=${WORKDIR}
EXPOSE 5173 15000

COPY init_container.sh /usr/local/bin
CMD ["init_container.sh"]
SHELL [ "fish" ]
