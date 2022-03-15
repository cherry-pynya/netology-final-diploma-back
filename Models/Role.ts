import { Schema, model } from 'mongoose';

const Role = new Schema({
    value: {type: String, default: 'ADMIN', required: true, unique: true},
});

module.exports = model('Role', Role);