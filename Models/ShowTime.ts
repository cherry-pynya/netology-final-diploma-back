import { Schema, model } from 'mongoose';
const Hall = require('./Hall');


const ShowTime = new Schema({
    time: {type: String, required: true},
    hall: { type: Schema.Types.ObjectId, ref: 'Hall', required: true},
    movie: { type: Schema.Types.ObjectId, ref: 'Movie', required: true},
});

module.exports = model('ShowTime', ShowTime);