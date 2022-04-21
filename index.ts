const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./Routers/authRouter');
const scheduleRouter = require('./Routers/scheduleRouter');
const cors = require('cors');
import scheduleMaintance from "./scheduleMaintce";

const port: string | number = process.env.PORT || 4000;
const url: string = process.env.URL || 'mongodb+srv://admin:admin@cluster0.017vi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/data', scheduleRouter);

async function start(): Promise<void> {
    try {
        await mongoose.connect(url);
        app.listen(port, () => console.log(`server started on port ${port}`));
        setInterval(() => {
            scheduleMaintance();
        }, 10000)
    } catch(e) {
        console.log(e);
    }
}

start();