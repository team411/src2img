NPM_BIN = node_modules/.bin
ENB = $(NPM_BIN)/enb
BOWER = $(NPM_BIN)/bower

ifneq ($(YENV),production)
	YENV=development
endif

.PHONY: hljs
hljs:
	mkdir -p _/$@
	for i in `find common.blocks/highlight/styles -type f -name '*.css'`; do \
		 $(NPM_BIN)/borschik -i $$i -o _/$@/`basename $$i`; \
	done

_/hljs: hljs

.PHONY: server
server: npm_deps bower_deps build
	$(ENB) server

.PHONY: buildild
build: npm_deps bower_deps _/hljs
	$(ENB) make --no-cache

.PHONY: clean
cachelean: npm_deps
	rm -rf _
	$(ENB) make clean

.PHONY: bower_deps
bower_deps: npm_deps
	$(BOWER) install

.PHONY: npm_deps
npm_deps:
	npm install
