import { Schema, model } from 'mongoose';
const ShowTime = require('./ShowTime');


const Ticket = new Schema({
    order: {type: Array, required: true},
    ShowTime: { type: Schema.Types.ObjectId, ref: 'ShowTime', required: true},
});

module.exports = model('Ticket', Ticket);