import Express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import user from '../frameworks/express/router/userRouter';
import driver_router from '../frameworks/express/router/driverRouter';
import admin_router from '../frameworks/express/router/adminRouter';
import connect from '../frameworks/database/mongoDB';
import jwtTokenAuth from '../frameworks/express/middlewares/jwtTokenAuth';
import { startReminderCronJob } from "../frameworks/crone-job/reminderCronJob"
import http from 'http'

import { setUpSocketIO } from '../frameworks/socket-io/socket-io';
import { Error } from 'mongoose';

dotenv.config()

const port = process.env.PORT
const MONGO_URL = process.env.MONGO_URL;
const app = Express();
app.use(cors());
app.use(Express.json({ limit: '10mb' }));

const server = http.createServer(app);

const allowedOrigins = [process.env.FRONT_END];
app.use(
    cors({
        origin: "*",
        credentials: true
    }),
)
app.use(jwtTokenAuth.validateToken);

app.use('/', user);
app.use('/driver', driver_router);
app.use('/admin', admin_router)

setUpSocketIO(server)




if (MONGO_URL) {
    connect(MONGO_URL).then(() => {
        server.listen(port, () => console.log(`Server started at http://localhost:${port}`));
        startReminderCronJob()
    }).catch((err: Error) => {
        console.error('MongoDB connection error:', err);
    });
} else {
    console.log('Cannot access the URL from environment');
}

