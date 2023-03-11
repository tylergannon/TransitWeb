.PHONY: default svelte-app astroapi alpine-fish dev-server ansible cities_data

export CONTAINER_HOST_ID ?= $(shell hostname -s)
export DOCKER_BUILD = docker build \
	--build-arg CONTAINER_HOST_ID=$(CONTAINER_HOST_ID) \
	--build-arg UID=$(shell id -u) \
	--build-arg GID=$(shell id -g)

CITY_FILE_BASE := "http://download.geonames.org/export/dump"

default: image

image: svelte-app astroapi

.out/cities/cities%.txt: .out/dl/cities%.zip
	@mkdir -p .out/cities
	cd .out/cities \
		&& unzip -qq ../dl/cities$*.zip

.out/dl/%:
	@mkdir -p .out/dl
	curl -fsLo $@ $(CITY_FILE_BASE)/$*


static/cities/cities%.tsv.br: .out/cities/cities%.txt
	script/strip_city_file.py 2 3 5 6 9 11 12 18 $< | brotli > $@

static/cities/countries.tsv.br: .out/dl/countryInfo.txt
	script/strip_city_file.py 1 2 5 $< | brotli > $@

static/cities/admin1-codes.tsv.br: .out/dl/admin1CodesASCII.txt
	script/strip_city_file.py 1 2 3 $< | brotli > $@

static/cities/admin2-codes.tsv.br: .out/dl/admin2Codes.txt
	script/strip_city_file.py 1 2 3 $< | brotli > $@

static/cities/countries.tsv.br: .out/dl/countryInfo.txt


cities_data: static/cities/cities15000.tsv.br \
							static/cities/cities5000.tsv.br \
							static/cities/cities500.tsv.br \
							static/cities/countries.tsv.br \
							static/cities/admin1-codes.tsv.br \
							static/cities/admin2-codes.tsv.br 


ansible:
	cd ansible \
	&& ansible-galaxy collection install -r requirements.yml \
	&& ansible-playbook -i ./inventory.yml ./playbooks/$(num)*.yml

svelte-app: alpine-fish
	@cd servers/node && make image

astroapi:
	@cd servers/astroapi && make image

dev-server: alpine-fish
	@cd servers/dev-server && make image

alpine-fish:
	@cd servers/alpine-fish && make image

