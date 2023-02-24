.PHONY: default clean image rebuild_image

RANDOM := $(shell head /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 10)

IMAGE_NAME := tylergannon/nginx
IMAGE_BASE := alpine

default: image

image:
	$(DOCKER_BUILD) \
		-t $(IMAGE_NAME):latest \
		-t $(IMAGE_NAME):$(IMAGE_BASE) \
		. \
		--build-arg UID=1000 \
		--build-arg GID=1000
	
rebuild_image:
	$(DOCKER_BUILD) \
		-t $(IMAGE_NAME):latest \
		-t $(IMAGE_NAME):$(IMAGE_BASE) \
		. \
		--build-arg UID=1000 \
		--build-arg GID=1000 \
		--no-cache
	
clean:
	
