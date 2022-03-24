"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Movie = require('./Movie');
const Hall = require('./Hall');
const ShowTime = require('./ShowTime');
const CustomerEvent = new mongoose_1.Schema({
    date: { type: String, required: true },
    time: { type: String, required: true },
    movie: { type: Object, required: true },
    hall: { type: Object, required: true },
    showTime: { type: String, required: true },
});
module.exports = (0, mongoose_1.model)('CustomerEvent', CustomerEvent);
