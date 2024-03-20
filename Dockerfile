FROM node:20.11-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

# RUN npx prisma generate

EXPOSE ${PORT}

CMD npx prisma migrate dev && npm run start:dev

