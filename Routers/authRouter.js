"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require('express');
const authControler_1 = __importDefault(require("../Controlers/authControler"));
const { check } = require('express-validator');
const authMidlleware = require('../Midlleware/AuthMidlleware');
const router = new Router();
const controler = new authControler_1.default();
router.post('/login', controler.login);
router.post('/checkToken', authMidlleware, controler.checkToken);
router.post('/registration', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать от 6 до 12 символоы').isLength({ min: 6, max: 12 }),
], controler.registration);
module.exports = router;
