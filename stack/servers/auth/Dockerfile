FROM oven/bun
WORKDIR /app
COPY index.ts package.json /app/
RUN apt-get update && apt-get install -y \
      curl \
      dumb-init \
    && bun install \
    && rm -rf /var/lib/apt/lists/*

ENTRYPOINT [ "dumb-init", "--" ]
CMD [ "bun", "run", "index.ts" ]

HEALTHCHECK --interval=10s --timeout=2s --start-period=30s --retries=3 \
  CMD [ "curl", "-fsS", "http://localhost:80/check" ]
