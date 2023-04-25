.PHONY: default clean image rebuild_image

IMAGE_NAME := tylergannon/lucia-auth-server

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

