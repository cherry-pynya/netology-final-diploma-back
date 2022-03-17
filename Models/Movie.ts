import { Schema, model } from 'mongoose';

const Movie = new Schema({
    name: {type: String, unique: true, required: true},
    length: {type: Number, required: true},
});

module.exports = model('Movie', Movie);