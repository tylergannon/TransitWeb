.PHONY: default unit node astroapi

default: unit node astroapi

unit:
	@cd servers/unit && make image

node:
	@cd servers/node && make image

astroapi:
	@cd servers/astroapi && make image

