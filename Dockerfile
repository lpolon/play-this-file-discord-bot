FROM node:latest
WORKDIR /app
ENTRYPOINT [ "npm", "start" ]

# dependencies:
COPY package.json package-lock.json /app/
RUN npm install

COPY . .
