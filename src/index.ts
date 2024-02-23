import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router';

const app =express();
const mongoPassword =encodeURIComponent("Mongo@123#")
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(3002, ()=>{
    console.log("server running at http://localhost:3002");
})

const MONGO_URL = `mongodb+srv://mongo-cloud:${mongoPassword}@cluster0.yvpv0mq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) =>console.log(error));

app.use('/', router());