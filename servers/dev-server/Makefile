# Dev Server Makefile
#
.PHONY: default clean image rebuild_image

OUT := .out
RANDOM := $(shell head /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 10)

APP_IMG := tylergannon/svelte-dev
IMAGE_LABEL := alpine

default: image

image:
	$(DOCKER_BUILD) \
		--build-arg CONTAINER_ID=$(APP_IMG) \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		. \

rebuild_image:
	$(DOCKER_BUILD) \
		--build-arg CONTAINER_ID=$(APP_IMG) \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		. \
		--no-cache

clean:
