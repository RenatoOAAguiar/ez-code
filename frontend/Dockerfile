FROM node:14-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

# Instalando dependências da aplicação e armazenando em cache.
COPY package.json /app/package.json
RUN npm install --silent
RUN npm install react-scripts@4.0.1 -g --silent

COPY . .

# start app
CMD ["npm", "start"]