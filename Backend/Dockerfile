FROM node:20-buster

COPY . .

RUN npm i && npx prisma generate 

CMD ["npm","run","start"]