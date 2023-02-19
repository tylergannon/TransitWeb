#!/usr/bin/env fish

docker build -t tylergannon/node:ubuntu ./build_src -f ./build_src/Dockerfile.build_node --progress plain

exit

pnpm run build

cp package.json pnpm-lock.yaml build

docker build -t tylergannon/transitweb:latest .
