.PHONY: default clean image rebuild_image

default: image

image:
	@docker build -t tylergannon/nginx-unit:latest -t tylergannon/nginx-unit:alpine .
	
rebuild_image:
	@docker build -t tylergannon/nginx-unit:latest -t tylergannon/nginx-unit:alpine . \
		--no-cache
	
clean:
	
