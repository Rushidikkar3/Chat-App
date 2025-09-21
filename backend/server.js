import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

import connectMongoDB from './db/connectMongoDB.js';
import { app, server } from './socket/socket.js';

import path from 'path';


dotenv.config();
const PORT = process.env.PORT || 4000;

const __dirname = path.resolve(); 

console.log(__dirname)

app.use(express.json()); // parse incoming requests data as JSON from body
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.use(express.static(path.join(__dirname, '/frontend/dist')));
//must be at last middleware

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/dist/index.html'));
});

server.listen(PORT, () => {
  connectMongoDB();
  console.log(`Chat app listening on port ${PORT}!`);
});