import { Schema, model } from 'mongoose';
const CustomerEvent = require('./CustomerEvent');


const Ticket = new Schema({
    order: {type: Array, required: true},
    CustomerEvent: { type: Schema.Types.ObjectId, ref: 'CustomerEvent', required: true},
});

module.exports = model('Ticket', Ticket);