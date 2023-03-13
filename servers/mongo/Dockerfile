FROM mongo

COPY ./entrypoint/*.js /docker-entrypoint-initdb.d/

ENV MONGO_INITDB_DATABASE=transitweb \
    MONGO_APP_DATABASE=transitweb \
    MONGO_REPLICA_HOST=host.docker.internal \
    MONGO_REPLICA_PORT=27018

HEALTHCHECK --interval=10s --start-period=30s --retries=3 \
  CMD "test $$(mongosh --quiet --eval "rs.status().ok") -eq 1"

CMD ["--replSet", "rs0", "--bind_ip_all", "--noAuth"]
