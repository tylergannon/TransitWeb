.PHONY: default clean image rebuild_image

RANDOM := $(shell head /dev/urandom | LC_ALL=C tr -dc 'a-zA-Z0-9' | head -c 10)

default: image

image:
	docker build -t tylergannon/nginx-unit:latest -t tylergannon/nginx-unit:alpine . \
		--build-arg update=$(RANDOM)

	
rebuild_image:
	docker build -t tylergannon/nginx-unit:latest -t tylergannon/nginx-unit:alpine . \
		--no-cache
	
clean:
	
