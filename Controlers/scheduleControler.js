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
Object.defineProperty(exports, "__esModule", { value: true });
const Hall = require('../Models/Hall');
const Movie = require('../Models/Movie');
const ShowTime = require('../Models/ShowTime');
const SellingStatus = require('../Models/sellingStatus');
class scheduleControler {
    getSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const halls = yield Hall.find();
                const movies = yield Movie.find();
                const showTimes = yield ShowTime.find();
                const sellingStatus = yield SellingStatus.find();
                return res.json({
                    halls,
                    movies,
                    showTimes,
                    sellingStatus,
                });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: 'Не удалось получить расписание сеансов!' });
            }
        });
    }
}
exports.default = scheduleControler;
;
