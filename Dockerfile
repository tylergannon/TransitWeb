# FROM node:18.14.1-bullseye-slim
FROM tylergannon/node:ubuntu
COPY build /app

RUN apt-get update \
    && apt-get install -y \
        dumb-init \
        fish \
        curl \
        build-essential \
        python3 \
        python3-pip \
    && curl --output /usr/share/keyrings/nginx-keyring.gpg  \
        https://unit.nginx.org/keys/nginx-keyring.gpg \
    && mkdir -p /etc/apt/sources.list.d \
    && echo "deb [signed-by=/usr/share/keyrings/nginx-keyring.gpg] https://packages.nginx.org/unit/ubuntu/ kinetic unit" \
        > /etc/apt/sources.list.d/unit.list \
    && echo "deb-src [signed-by=/usr/share/keyrings/nginx-keyring.gpg] https://packages.nginx.org/unit/ubuntu/ kinetic unit" \
        >> /etc/apt/sources.list.d/unit.list \
    && apt-get update \
    && apt-get install -y \
        unit \
        unit-dev \
    && cd /app \
    && npm install -g node-gyp \
    && npm install -g --unsafe-perm unit-http \
    && npm install --omit=dev \
    && npm link unit-http \
    && npm remove -g node-gyp \
    && apt-get remove -y --purge \
        build-essential \
        unit-dev \
        python3-pip \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/*

ENV DB_CONN=postgres://user:password@db/db
ENV PASSWORD_SALT=1234567890
ENV OAUTH_GITHUB_CLIENT_ID=1234567890
ENV OAUTH_GITHUB_SECRET=1234567890


# RUN cd build \
#     && pnpm install --frozen-lockfile --prod
# ENTRYPOINT [ "dumb-init", "--" ]
# CMD [ "node", "/build" ]
