.PHONY: default clean image rebuild_image 

OUT := .out
PROJECT := $(shell readlink -fn $(CURDIR)/../..)
RANDOM := $(shell head /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 10)
UID := $(shell id -u)
GID := $(shell id -g)
APP_IMG := tylergannon/svelte-app
IMAGE_LABEL := alpine

default: image

image:
	$(DOCKER_BUILD) \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		.

rebuild_image:
	$(DOCKER_BUILD) \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		. \
		--no-cache

$(OUT)/package.json:
	@mkdir -p $(OUT)
	@cp ../../package.json ../../package-lock.json $(OUT)/


clean:
	[ -n "$(shell docker image ls | grep $(VOLUME))" ] && \
		docker image rm "$(VOLUME)"
	rm -rf $(OUT)
