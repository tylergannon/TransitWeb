.PHONY: default unit svelte-app astroapi nginx alpine-fish dev-server

export CONTAINER_HOST_ID ?= $(shell hostname -s)
export DOCKER_BUILD = docker build \
	--build-arg CONTAINER_HOST_ID=$(CONTAINER_HOST_ID) \
	--build-arg UID=$(shell id -u) \
	--build-arg GID=$(shell id -g)

default: unit svelte-app astroapi dev-server nginx

unit: alpine-fish
	@cd servers/unit && make image

svelte-app: alpine-fish
	@cd servers/node && make image

astroapi:
	@cd servers/astroapi && make image

dev-server: alpine-fish
	@cd servers/dev-server && make image

nginx: alpine-fish
	@cd servers/nginx && make image

alpine-fish:
	@cd servers/alpine-fish && make image

