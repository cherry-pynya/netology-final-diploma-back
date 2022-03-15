"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./Routers/authRouter');
const scheduleRouter = require('./Routers/scheduleRouter');
const cors = require('cors');
const port = process.env.PORT || 4000;
const url = process.env.URL || 'mongodb+srv://admin:admin@cluster0.017vi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/auth', authRouter);
app.use('/data', scheduleRouter);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(url);
            app.listen(port, () => console.log(`server started on port ${port}`));
        }
        catch (e) {
            console.log(e);
        }
    });
}
start();
