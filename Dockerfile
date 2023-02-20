# FROM node:18.14.1-bullseye-slim
FROM tylergannon/node:ubuntu as base
RUN apt-get remove -y \
        build-essential \
        libssl-dev \
        python3 \
        python3-pip \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

FROM ubuntu:latest
COPY build /app
# This will copy node and node_modules (which includes the global unit-http package)
COPY --from=base ["/usr/local/node", "/usr/local/node"]

ARG CONTAINER_ENV=/usr/local/node/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin
ENV PATH=${CONTAINER_ENV}

RUN echo "PATH=${CONTAINER_ENV}" \
    && apt-get update \
    && apt-get install -y \
        dumb-init \
        curl \
        build-essential \
        python3 \
        python3-pip \
        libssl-dev \
    && curl --output /usr/share/keyrings/nginx-keyring.gpg  \
        https://unit.nginx.org/keys/nginx-keyring.gpg \
    && mkdir -p /etc/apt/sources.list.d \
    && echo "deb [signed-by=/usr/share/keyrings/nginx-keyring.gpg] https://packages.nginx.org/unit/ubuntu/ kinetic unit" \
        > /etc/apt/sources.list.d/unit.list \
    && echo "deb-src [signed-by=/usr/share/keyrings/nginx-keyring.gpg] https://packages.nginx.org/unit/ubuntu/ kinetic unit" \
        >> /etc/apt/sources.list.d/unit.list \
    && apt-get update \
    && apt-get install -y unit unit-dev \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && cd /app \
    && npm install -g node-gyp \
    && npm install --omit=dev \
    && npm install unit-http \
    && chmod -R a+r /app

ENV DB_CONN=postgres://user:password@db/db
ENV PASSWORD_SALT=1234567890
ENV OAUTH_GITHUB_CLIENT_ID=1234567890
ENV OAUTH_GITHUB_SECRET=1234567890
ARG num=1
COPY scripts/start.sh scripts/config.json cert/transitweb.pem /opt/
ENTRYPOINT [ "dumb-init", "--" ]
CMD [ "/opt/start.sh" ]

