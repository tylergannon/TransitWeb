.PHONY: default clean image rebuild_image node

NPM := "pnpm"
VOLUME := build_dev_node_modules
OUT := .out
PROJECT := $(shell readlink -fn $(CURDIR)/../..)
RANDOM := $(shell head /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 10)

APP_IMG := tylergannon/svelte-app
IMAGE_LABEL := debian-slim

ifeq ($(shell uname -m),arm64)
NODE_DEP := node
endif

default: image

image: $(OUT)/app
	docker build \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		. \
		--build-arg update=$(RANDOM)

rebuild_image: $(OUT)/app
	@docker build \
		-t $(APP_IMG):latest \
		-t $(APP_IMG):$(IMAGE_LABEL) \
		. \
		--no-cache

# Note this won't run except if `uname -m` is arm64.
node:
	docker build \
		-t node:$(IMAGE_LABEL) \
		. \
		-f Dockerfile.build_node

$(OUT)/package.json:
	@mkdir -p $(OUT)
	@cp ../../package.json ../../package-lock.json $(OUT)/

$(OUT)/app: $(NODE_DEP) $(OUT)/package.json

	@mkdir -p $(OUT)
	docker run -it --rm \
		-v "$(PROJECT):/app" \
		-v "$(VOLUME):/app/node_modules" \
		-w /app \
		node:$(IMAGE_LABEL) \
		/app/servers/node/npm_run_build.sh > $(OUT)/build.log 2>&1 \
		|| (cat $(OUT)/build.log && exit 1)
	@rm -rf $(OUT)/app
	@mv $(PROJECT)/build $(OUT)/app
	
clean:
	[ -n "$(shell docker image ls | grep $(VOLUME))" ] && \
		docker image rm "$(VOLUME)"
	rm -rf $(OUT)
