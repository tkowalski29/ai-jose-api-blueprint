FROM node:20.5.1-alpine

RUN npm install -g typescript

WORKDIR /app

COPY package*.json ./

RUN npm install -g typings

RUN npm install

COPY . .
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start"]
