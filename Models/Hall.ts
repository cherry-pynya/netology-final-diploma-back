import { Schema, model } from 'mongoose';

const hall: Array<Array<String>> = [
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

const Hall = new Schema({
    number: {type: Number, unique: true, required: true},
    row: {type: Number, required: true, default: 10},
    col: {type: Number, required: true, default: 8},
    vipPrice: {type: Number, required: true, default: 0},
    price: {type: Number, required: true, default: 0},
    seats: {type: Array, required: true, default: hall}
});

module.exports = model('Hall', Hall);