"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CustomerEvent = require('./CustomerEvent');
const Ticket = new mongoose_1.Schema({
    order: { type: Array, required: true },
    CustomerEvent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'CustomerEvent', required: true },
});
module.exports = (0, mongoose_1.model)('Ticket', Ticket);
