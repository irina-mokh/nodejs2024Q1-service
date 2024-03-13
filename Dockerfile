FROM node:alpine
WORKDIR /src
COPY package*.json ./
RUN npm install
COPY . .
# RUN npx prisma generate
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev" ]