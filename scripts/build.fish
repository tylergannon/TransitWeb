#!/usr/bin/env fish

docker build -t tylergannon/node:ubuntu ./build_src -f ./build_src/Dockerfile.build_node --progress plain
# Run a container to build the node app, which has a bind mount to the current directory and a system volume mounted to /app/node_modules
docker run -it --rm \
    -e ORIGIN=https://transithd.com \
    -v (pwd):/app \
    -v build_node_modules:/app/node_modules \
    -w /app \
    tylergannon/node:ubuntu \
    /app/scripts/dr_npm_build.sh

docker build -t tylergannon/transitweb:latest . --progress plain
