import { Schema, model } from 'mongoose';

const Admin = new Schema({
    name: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: [{type: String, ref: 'Role'}]
});

module.exports = model('Admin', Admin);