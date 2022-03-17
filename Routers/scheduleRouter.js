"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('express');
const scheduleControler_1 = __importDefault(require("../Controlers/scheduleControler"));
const authMidlleware = require('../Midlleware/AuthMidlleware');
const router = new Router();
const controler = new scheduleControler_1.default();
router.get('/schedule', controler.getSchedule);
router.post('/saveHallConfig', authMidlleware, controler.saveHallConfig);
router.post('/addMovie', authMidlleware, controler.addMovie);
router.post('/createHall', authMidlleware, controler.createHall);
router.post('/deleteHall', authMidlleware, controler.deleteHall);
module.exports = router;
