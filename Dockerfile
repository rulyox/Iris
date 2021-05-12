FROM docker:20

RUN apk add --update nodejs npm

WORKDIR /iris
COPY . .

RUN npm install
RUN npm run build

ENTRYPOINT npm start -- --name $NAME --ip $IP --api $API --socket $SOCKET --password $PASSWORD
