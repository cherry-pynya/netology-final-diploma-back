"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShowTime = require('./ShowTime');
const Ticket = new mongoose_1.Schema({
    order: { type: Array, required: true },
    ShowTime: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ShowTime', required: true },
});
module.exports = (0, mongoose_1.model)('Ticket', Ticket);
