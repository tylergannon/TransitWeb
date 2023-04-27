#!/usr/bin/env sh

pnpm install --store-dir /opt/pnpm
pnpm dev --host --clearScreen false $@ $VITE_ARGS

