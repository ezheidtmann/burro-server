import * as express from 'express';
import * as http from 'http'
import * as WebSocket from 'ws'
import { AddressInfo } from 'net';

const app = express();

const server = http.createServer(app)

const wss = new WebSocket.Server({ server })

let connections = new Map<number, object>();
let idCounter = 0;

wss.on('connection', (ws: WebSocket) => {
    const connectionId = idCounter++;

    const intervalId = setInterval(() => {
        console.log('sending message');
        ws.send(`Latest date: ${new Date()}`)
    }, 5000)

    ws.on('close', () => {
        clearInterval(intervalId);
    });

    ws.send('hi');

    connections.set(connectionId, { ws, intervalId });
})

server.listen(process.env.PORT || 8899, () => {
    console.log(`Server started on ${(server.address() as AddressInfo).port}`);

    setInterval(() => {
        console.log(`Connections: ${connections.size}`);
    }, 2000)
});