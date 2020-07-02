import io from 'socket.io-client';

// get the object of connection
const socket = io('ws://localhost:4000');

socket.emit('sendMsg', {name: 'abc'});