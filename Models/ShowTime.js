"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Hall = require('./Hall');
const ShowTime = new mongoose_1.Schema({
    time: { type: String, required: true },
    hall: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Hall', required: true },
    movie: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Movie', required: true },
});
module.exports = (0, mongoose_1.model)('ShowTime', ShowTime);
