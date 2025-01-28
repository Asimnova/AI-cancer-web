import { io } from 'socket.io-client';
import { Message } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

export const socket = io(SOCKET_URL);

export const initializeSocket = (onMessageReceived: (message: Message) => void) => {
  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('message', (message: Message) => {
    onMessageReceived(message);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });
};

export const sendMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
  socket.emit('message', message);
};