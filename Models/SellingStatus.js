"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SellingStatus = new mongoose_1.Schema({
    status: { type: Boolean, unique: true, required: true, default: false },
});
module.exports = (0, mongoose_1.model)('SellingStatus', SellingStatus);
