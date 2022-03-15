import { Schema, model } from 'mongoose';

const SellingStatus = new Schema({
    status: {type: Boolean, unique: true, required: true, default: false},
});

module.exports = model('SellingStatus', SellingStatus);