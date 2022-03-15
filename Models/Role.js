"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Role = new mongoose_1.Schema({
    value: { type: String, default: 'ADMIN', required: true, unique: true },
});
module.exports = (0, mongoose_1.model)('Role', Role);
