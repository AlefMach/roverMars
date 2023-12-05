build:
	docker compose build

test:
	docker compose run --rm rovermars npm test

deps:
	docker compose run --rm rovermars npm install

start:
	docker compose up

lint:
	docker compose run --rm rovermars npm run lint 

lint/fix:
	docker compose run --rm rovermars npm run lint:fix