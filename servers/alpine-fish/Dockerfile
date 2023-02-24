FROM alpine:edge

RUN apk add --no-cache \
        curl \
        dumb-init \
        fish \
        fzf \
        git \
        neovim \
        ripgrep \
        starship \
    && fish -l -c "echo 'fish_vi_key_bindings' >> /root/.config/fish/config.fish" \
    && echo "starship init fish | source" >> /root/.config/fish/config.fish

COPY starship.toml /root/.config/starship.toml
ARG CONTAINER_ID="Alpine"
ARG CONTAINER_HOST_ID="Unknown"
ENV CONTAINER_ID=${CONTAINER_ID} CONTAINER_HOST_ID=${CONTAINER_HOST_ID}
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["fish"]

# && curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install > ./install \
# && chmod +x ./install \
# && ./install --noninteractive \
# && rm ./install \