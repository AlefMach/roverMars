start:
	docker compose up --build

lint:
	docker compose run --rm rovermars npm run lint 

lint/fix:
	docker compose run --rm rovermars npm run lint:fix