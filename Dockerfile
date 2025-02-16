FROM node:21.7.3

WORKDIR /app-backend

COPY package* .

RUN npm install

COPY . .

ENTRYPOINT ["npm","run"]
CMD ["dev"]