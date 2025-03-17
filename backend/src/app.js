import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectToSocket from './controllers/socketManager.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use('/api/v1/users', userRoutes);

const start = async () => {
    const connectionDB = await mongoose.connect(process.env.MOGO_URI);
    console.log(`MonogoDB Connected host: ${connectionDB.connection.host}`);
    server.listen(PORT, () => {
        console.log('Server is running on port ', PORT);
    })
}

start();