FROM node:20
RUN apt-get update && apt-get install -y \
  curl \
  python3 \
  build-essential \
  make \
  g++ \
  gcc

WORKDIR /server
COPY package*.json ./
RUN npm install -g npm@10.8.3
RUN npm install -g nodemon
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]