FROM mongo

COPY ./entrypoint/*.js /docker-entrypoint-initdb.d/

RUN echo "password" > /keyfile \
  && chmod 600 /keyfile \
  && chown 999 /keyfile \
  && chgrp 999 /keyfile

ENV MONGO_INITDB_DATABASE=transitweb \
    MONGO_INITDB_ROOT_USERNAME=mongo \
    MONGO_INITDB_ROOT_PASSWORD=mongo \
    MONGO_APP_DATABASE=transitweb \
    MONGO_REPLICA_HOST=host.docker.internal \
    MONGO_REPLICA_PORT=27018

# CMD ["--bind_ip_all", "--keyFile", "/keyfile", "--replSet", "rs0"]

HEALTHCHECK --interval=10s --start-period=30s --retries=3 \
  CMD "test $$(mongosh --quiet -u mongo -p mongo --eval "rs.status().ok") -eq 1"
  # CMD "test $$(mongosh --quiet -u mongo -p mongo --eval "try { rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: 'localhost' }] }).ok } catch (_) { rs.status().ok }") -eq 1"

CMD ["--replSet", "rs0", "--bind_ip_all", "--keyFile", "/keyfile"]
      # /usr/local/bin/docker-entrypoint.sh mongod --replSet rs0
      # --bind_ip_all --noauth' "'MONGO_APP_DATABASE'" "'init'" "'db initialized successfully'"
