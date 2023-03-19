.PHONY: default svelte-app astroapi alpine-fish dev-server ansible cities_data auth-server

export CONTAINER_HOST_ID ?= $(shell hostname -s)
export DOCKER_BUILD = docker build \
	--build-arg CONTAINER_HOST_ID=$(CONTAINER_HOST_ID) \
	--build-arg UID=$(shell id -u) \
	--build-arg GID=$(shell id -g)

CITY_FILE_BASE := "http://download.geonames.org/export/dump"

default: image

image: svelte-app astroapi auth-server

.out/cities/cities%.txt: .out/dl/cities%.zip
	@mkdir -p .out/cities
	cd .out/cities \
		cat ../dl/cities$*.zip | funzip > $@

.out/dl/%:
	@mkdir -p .out/dl
	curl -fsLo $@ $(CITY_FILE_BASE)/$*

.out/mongodb-initdb/load_cities.js:
	@mkdir -p .out/mongodb-initdb
	script/build_cities_js.py --output $@

static/cities/cities%.tsv.gz: .out/cities/cities%.txt
	script/strip_city_file.py 2 3 5 6 9 11 12 18 $< | pigz -11 -q > $@

.out/admin-areas.tsv: .out/dl/countryInfo.txt .out/dl/admin1CodesASCII.txt .out/dl/admin2Codes.txt
	@script/strip_city_file.py 1 2 5 $< > $@
	@script/strip_city_file.py 1 2 3 .out/dl/admin1CodesASCII.txt >> $@
	@script/strip_city_file.py 1 2 3 .out/dl/admin2Codes.txt >> $@

static/cities/admin-areas.tsv.gz: .out/admin-areas.tsv
	cat $< | pigz -11 -q > $@

cities_data: static/cities/cities15000.tsv.gz \
							static/cities/cities5000.tsv.gz \
							static/cities/cities500.tsv.gz \
							static/cities/admin-areas.tsv.gz \
							.out/mongodb-initdb/load_cities.js

ansible:
	cd ansible \
	&& ansible-galaxy collection install -r requirements.yml \
	&& ansible-playbook -i ./inventory.yml ./playbooks/$(num)*.yml

svelte-app: alpine-fish
	@cd servers/node && make image

astroapi:
	@cd servers/astroapi && make image

auth-server:
	@cd servers/auth && make image

dev-server: alpine-fish
	@cd servers/dev-server && make image

alpine-fish:
	@cd servers/alpine-fish && make image

