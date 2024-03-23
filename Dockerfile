FROM node:20.11.1-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
FROM node:20.11.1-alpine as main
WORKDIR /app
COPY --from=build /app /app
CMD npx prisma generate && npx prisma migrate dev &&  npm run start:dev
