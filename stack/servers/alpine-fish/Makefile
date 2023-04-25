.PHONY: default clean image rebuild_image

RANDOM := $(shell head /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 10)

IMAGE_NAME := tylergannon/alpine-fish

default: image

image:
	$(DOCKER_BUILD) \
		--build-arg CONTAINER_ID=$(IMAGE_NAME) \
		-t $(IMAGE_NAME):latest \
		. --progress=plain
	
rebuild_image:
	$(DOCKER_BUILD) \
		--build-arg CONTAINER_ID=$(IMAGE_NAME) \
		-t $(IMAGE_NAME):latest \
		. \
		--no-cache
	
clean:
	
