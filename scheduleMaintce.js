"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const CustomerEvent = require('./Models/CustomerEvent');
moment_1.default.locale('ru');
function scheduleMaintance() {
    return __awaiter(this, void 0, void 0, function* () {
        const customerEvents = yield CustomerEvent.find();
        const now = (0, moment_1.default)();
        customerEvents.forEach((el) => __awaiter(this, void 0, void 0, function* () {
            const { time, date, _id } = el;
            const format = (`${date.replace(/\./g, ":")} ${time}`).trim();
            const check = (0, moment_1.default)(format, "DD:MM:YYYY hh:mm");
            if (check.isBefore(now)) {
                yield CustomerEvent.deleteOne({ _id });
            }
            ;
        }));
    });
}
exports.default = scheduleMaintance;
;
