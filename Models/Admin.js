"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Admin = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: [{ type: String, ref: 'Role' }]
});
module.exports = (0, mongoose_1.model)('Admin', Admin);
