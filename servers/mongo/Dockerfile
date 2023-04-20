FROM mongo:5

COPY healthcheck.sh /usr/local/bin/healthcheck.sh

HEALTHCHECK --interval=10s --start-period=30s --retries=3 \
  CMD ["healthcheck.sh"]

CMD ["--replSet", "rs0", "--bind_ip_all", "--noauth", "--quiet"]
SHELL [ "bash" ]
