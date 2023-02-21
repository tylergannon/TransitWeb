.PHONY: default unit svelte-app astroapi

default: unit svelte-app astroapi dev-server

unit:
	@cd servers/unit && make image

svelte-app:
	@cd servers/node && make image

astroapi:
	@cd servers/astroapi && make image

dev-server:
	@cd servers/dev-server && make image
