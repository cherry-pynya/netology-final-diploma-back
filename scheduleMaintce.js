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
const moment_timezone_1 = __importDefault(require("moment-timezone"));
require("moment/locale/ru");
const CustomerEvent = require("./Models/CustomerEvent");
// функция каждую минуту проверяет нет ли в сетке просроченных сеансов
// если есть удаляет их из сетки и добавляет копии с датой +7 дней
function scheduleMaintance() {
    return __awaiter(this, void 0, void 0, function* () {
        const customerEvents = yield CustomerEvent.find();
        const now = (0, moment_timezone_1.default)().tz('Europe/Moscow');
        customerEvents.forEach((el) => __awaiter(this, void 0, void 0, function* () {
            const { time, date, _id, movie, hall, showTime, } = el;
            const format = `${date.replace(/\./g, ":")} ${time}`.trim();
            const check = (0, moment_timezone_1.default)(format, "DD:MM:YYYY hh:mm");
            //проверка просрочен ли сеанс
            if (check.isBefore(now)) {
                //удаление просроченного
                yield CustomerEvent.deleteOne({ _id });
                //создание нового сеанса
                const candidate = new CustomerEvent({
                    time,
                    movie,
                    hall,
                    showTime,
                    date: (0, moment_timezone_1.default)().tz('Europe/Moscow').add(7, "days").format("L"),
                });
                yield candidate.save();
            }
        }));
    });
}
exports.default = scheduleMaintance;
;
