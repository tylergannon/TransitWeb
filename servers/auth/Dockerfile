FROM oven/bun
WORKDIR /app
COPY index.ts package.json /app/
RUN apt-get update && apt-get install -y \
      bat \
      curl \
      dumb-init \
      fd-find \
      fish \
      fzf \
      ripgrep \
    && curl -sS https://starship.rs/install.sh | sh -s -- --force \
    && fish -l -c "echo 'fish_vi_key_bindings' >> /root/.config/fish/config.fish" \
    && echo "starship init fish | source" >> /root/.config/fish/config.fish \
    && bun install

ENTRYPOINT [ "dumb-init", "--" ]
CMD [ "bun", "run", "index.ts" ]

HEALTHCHECK --interval=10s --timeout=2s --start-period=30s --retries=3 \
  CMD [ "curl", "-fsS", "http://localhost:80/check" ]
