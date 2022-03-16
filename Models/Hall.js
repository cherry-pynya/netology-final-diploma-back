"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const hall = [
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
    ['f', 'f', 'f', 'f', 'f', 'f', 'f', 'f'],
];
const Hall = new mongoose_1.Schema({
    number: { type: Number, unique: true, required: true },
    row: { type: Number, required: true, default: 10 },
    col: { type: Number, required: true, default: 8 },
    vipPrice: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    seats: { type: Array, required: true, default: hall }
});
module.exports = (0, mongoose_1.model)('Hall', Hall);
