import { Schema, model } from 'mongoose';
const Movie = require('./Movie');
const Hall = require('./Hall');
const ShowTime = require('./ShowTime');

const CustomerEvent = new Schema({
    date: { type: String, required: true},
    time: { type: String, required: true},
    movie: {type: Object, required: true},
    hall: {type: Array, required: true},
    showTime: { type: String, required: true},
});

module.exports = model('CustomerEvent', CustomerEvent);