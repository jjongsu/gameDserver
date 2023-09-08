import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server({
    cors: {
        origin: 'http://localhost:3000',
    },
});

io.on('connection', (socket) => {
    console.log('connect!!!', socket.id);

    socket.on('data', (data) => {
        socket.broadcast.emit('data', data);
    });

    socket.on('connection', () => {
        socket.broadcast.emit('connected:client', { id: socket.id });
    });

    socket.on('connected:host', () => {
        socket.broadcast.emit('connected:host', { id: socket.id });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('disconnected');
    });
});

io.listen(4000, () => {
    console.log('server port : 4000');
});
