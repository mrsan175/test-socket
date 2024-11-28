import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('User terhubung:', socket.id);
    socket.on('send_message', (data) => {
        console.log('Pesan diterima:', data);
        io.emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User terputus:', socket.id);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
