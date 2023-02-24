.PHONY: default clean image rebuild_image node_image

NPM := "pnpm"
VOLUME := build_dev_node_modules
OUT := .out
PROJECT := $(shell readlink -fn $(CURDIR)/../..)
RANDOM := $(shell head /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 10)
UID := $(shell id -u)
GID := $(shell id -g)
APP_IMG := tylergannon/svelte-app
IMAGE_LABEL := alpine

default: image

image: $(OUT)/app
	$(DOCKER_BUILD) \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		. \
		--build-arg update=$(RANDOM)

rebuild_image: $(OUT)/app
	$(DOCKER_BUILD) \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		. \
		--no-cache

node_image:
	@docker build \
		-t tylergannon/node:$(IMAGE_LABEL) \
		-t tylergannon/node:latest \
		--build-arg UID=$(UID) \
		--build-arg GID=$(GID) \
		-f Dockerfile.node \
		.

$(OUT)/package.json:
	@mkdir -p $(OUT)
	@cp ../../package.json ../../package-lock.json $(OUT)/

$(OUT)/app: $(OUT)/package.json node_image
		# /app/servers/node/npm_run_build.sh > $(OUT)/build.log 2>&1 \

	@mkdir -p $(OUT)
	docker run -it --rm \
		-v "$(PROJECT):/app" \
		-v "$(VOLUME):/app/node_modules" \
		-w /app \
		tylergannon/node:$(IMAGE_LABEL) \
		/app/servers/node/npm_run_build.sh \
		|| (cat $(OUT)/build.log && exit 1)
	@rm -rf $(OUT)/app
	@mv $(PROJECT)/build $(OUT)/app
	
clean:
	[ -n "$(shell docker image ls | grep $(VOLUME))" ] && \
		docker image rm "$(VOLUME)"
	rm -rf $(OUT)
