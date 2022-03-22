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
const Hall = require("../Models/Hall");
const Movie = require("../Models/Movie");
const ShowTime = require("../Models/ShowTime");
const SellingStatus = require("../Models/sellingStatus");
const CustomerEvent = require("../Models/CustomerEvent");
const moment_1 = __importDefault(require("moment"));
const scheduleMaintce_1 = __importDefault(require("../scheduleMaintce"));
class scheduleControler {
    getSchedule(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const halls = yield Hall.find();
                const movies = yield Movie.find();
                const showTimes = yield ShowTime.find();
                const sellingStatus = yield SellingStatus.findOne({
                    _id: "6230d2c4722f153e9886e137",
                });
                return res.json({
                    halls,
                    movies,
                    showTimes,
                    sellingStatus,
                });
            }
            catch (e) {
                console.log(e);
                return res
                    .status(400)
                    .json({ message: "Не удалось получить расписание сеансов!" });
            }
        });
    }
    createHall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { number } = req.body;
                const exist = yield Hall.findOne({ number: number });
                if (exist) {
                    return res
                        .status(400)
                        .json({ message: "Зал с таким номером уже существует!" });
                }
                const hall = new Hall({ number });
                yield hall.save();
                return res.json({ message: "Зал сохранен!" });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: "Не удалось создать зал!" });
            }
        });
    }
    deleteHall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body;
                const hall = yield Hall.findOne({ _id });
                if (!hall) {
                    return res
                        .status(400)
                        .json({ message: "Зала с таким номером не существует!" });
                }
                yield hall.deleteOne();
                return res.json({ message: "Зал удален!" });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: "Не удалось удалить зал!" });
            }
        });
    }
    saveHallConfig(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { halls } = req.body;
                halls.forEach((el) => __awaiter(this, void 0, void 0, function* () {
                    const { _id } = el;
                    yield Hall.replaceOne({ _id }, el);
                }));
                return res.json({ message: "Конфигурация залов сохранена!" });
            }
            catch (e) {
                console.log(e);
                return res
                    .status(400)
                    .json({ message: "Не удалось сохранить конфигурацию залов!" });
            }
        });
    }
    addMovie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, length, desc, } = req.body;
                const candidate = yield Movie.findOne({ name });
                if (candidate) {
                    return res
                        .status(400)
                        .json({ message: "Фильм с таким именем уже существует!" });
                }
                const movie = new Movie({ name, length, desc });
                yield movie.save();
                return res.json({ message: "Фильм сохранен!" });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: "Не удалось сохранить фильм!" });
            }
        });
    }
    saveShowTimes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { showTimes } = req.body;
                showTimes.forEach((el) => __awaiter(this, void 0, void 0, function* () {
                    if ("_id" in el) {
                        const _id = el["_id"];
                        yield ShowTime.replaceOne({ _id }, el);
                    }
                    else {
                        const st = new ShowTime(el);
                        yield st.save((err, room) => __awaiter(this, void 0, void 0, function* () {
                            yield createCustomerEvent(el, room.id);
                        }));
                    }
                }));
                yield (0, scheduleMaintce_1.default)();
                return res.json({ message: "Расписание сеансов сохранено!" });
            }
            catch (e) {
                console.log(e);
                return res
                    .status(400)
                    .json({ message: "Не удалось сохранить расписание сеансов!" });
            }
        });
    }
    getCustomerData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerEvents = yield CustomerEvent.find();
                const sellingStatus = yield SellingStatus.findOne({
                    _id: "6230d2c4722f153e9886e137",
                });
                return res.json({
                    customerEvents,
                    sellingStatus,
                });
            }
            catch (e) {
                console.log(e);
                return res
                    .status(400)
                    .json({ message: "Не удалось получить расписание сеансов!" });
            }
        });
    }
    deleteShowTimes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body;
                yield ShowTime.deleteOne({ _id });
                console.log(_id);
                yield CustomerEvent.deleteMany({ showTime: _id });
                return res.json({ message: "Сеанс удален!" });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: "Не удалось удалить сенас!" });
            }
        });
    }
    changeSellingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                yield SellingStatus.updateOne({ _id: "6230d2c4722f153e9886e137" }, { status });
                return res.json({ message: "Стаиус продажи билетов изменен!" });
            }
            catch (e) {
                console.log(e);
                return res
                    .status(400)
                    .json({ message: "Не удалось изменить статус продажи билетов!" });
            }
        });
    }
}
exports.default = scheduleControler;
function createCustomerEvent(showTime, _id) {
    return __awaiter(this, void 0, void 0, function* () {
        moment_1.default.locale("ru");
        for (let i = 0; i < 7; i++) {
            const { movie, hall, time, } = showTime;
            const date = (0, moment_1.default)(i).add(i, "days").format("L");
            const event = new CustomerEvent({
                date: (0, moment_1.default)().add(i, "days").format("L"),
                hall,
                time,
                movie,
                showTime: _id,
            });
            yield event.save();
        }
    });
}
