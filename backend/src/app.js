import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import mongoose from 'mongoose';

import connectToSocket from './controllers/socketManager.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use('/api/v1/users', userRoutes);

const start = async () => {
    const connectionDB = await mongoose.connect('mongodb+srv://bhargavnama143:sUcripLhCnV1WAcl@cluster0.1a89u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`MonogoDB Connected host: ${connectionDB.connection.host}`);
    server.listen(app.get('port'), () => {
        console.log('Server is running on port 8000');
    })
}

start();