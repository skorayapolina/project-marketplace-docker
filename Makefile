mongo:
	docker run -p 27017:27017 \
 			-d \
 			--rm \
 			--name mongodb \
 			--network marketplace-net \
 			--env-file ./config/development.env \
 			-v mongo-data:/data/db \
 			mongo

backend-dev:
	docker run -p 5000:5000 \
		-d \
		--rm \
		--name marketplace-backend \
		--network marketplace-net \
		-v D:/courses_labs/project-marketplace-docker/marketplace-for-handmade-server/:/app \
		-v /app/node_modules \
		--env-file ./config/development.env \
		marketplace-backend

frontend-dev:
	docker run -p 3000:3000 \
		-d \
		--rm \
		--name marketplace-frontend \
		-v D:\courses_labs\project-marketplace-docker\marketplace-for-handmade-client\src\:/app/src \
		marketplace-frontend

backend-prod:
	docker run -p 5000:5000 \
		-d \
		--rm \
		--name marketplace-backend \
		--network marketplace-net \
		--env-file ./config/development.env \
		marketplace-backend

frontend-prod:
	docker run -p 3000:3000 \
		-d \
		--rm \
		--name marketplace-frontend \
		marketplace-frontend

stop:
	docker stop mongodb marketplace-backend marketplace-frontend

dev:
	docker-compose -f docker-compose.yml up -d

build:
	docker-compose -f docker-compose.production.yml up -d