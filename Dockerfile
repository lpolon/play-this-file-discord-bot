FROM node:latest

COPY . .

# dependencies:
RUN npm install

ENTRYPOINT [ "npm", "start" ]