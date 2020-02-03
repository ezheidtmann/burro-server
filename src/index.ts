import * as express from 'express';
import * as http from 'http'
import * as WebSocket from 'ws'

const app = express();

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    })

    ws.send('hi');
})

server.listen(process.env.PORT || 8899, () => {
    console.log(`Server started on ${server.address()}`);
});