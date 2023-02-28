.PHONY: default svelte-app astroapi alpine-fish dev-server ansible

export CONTAINER_HOST_ID ?= $(shell hostname -s)
export DOCKER_BUILD = docker build \
	--build-arg CONTAINER_HOST_ID=$(CONTAINER_HOST_ID) \
	--build-arg UID=$(shell id -u) \
	--build-arg GID=$(shell id -g)

default: image

image: svelte-app astroapi dev-server

ansible:
	cd ansible \
	&& ansible-galaxy collection install -r requirements.yml \
	&& ansible-playbook -i ./inventory.yml ./playbooks/$(num)*.yml

svelte-app: alpine-fish
	@cd servers/node && make image

astroapi:
	@cd servers/astroapi && make image

dev-server: alpine-fish
	@cd servers/dev-server && make image

alpine-fish:
	@cd servers/alpine-fish && make image

