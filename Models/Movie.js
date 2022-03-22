"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Movie = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    length: { type: Number, required: true },
    desc: { type: String, required: true },
});
module.exports = (0, mongoose_1.model)('Movie', Movie);
