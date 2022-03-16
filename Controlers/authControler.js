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
const Admin = require('../Models/Admin');
const Role = require('../Models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express_validator_1 = require("express-validator");
const config_1 = require("../config");
class authControler {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ message: 'Ошибка регистрации', errors });
                }
                const { name, password } = req.body;
                const candidate = yield Admin.findOne({ name });
                if (candidate) {
                    return res.status(400).json({ message: 'Пользователь с таким именем уже существует!' });
                }
                ;
                const hashPassword = bcrypt.hashSync(password, 7);
                const adminRole = yield Role.findOne({ value: 'ADMIN' });
                const admin = new Admin({ name: name, password: hashPassword, roles: [adminRole.value] });
                yield admin.save();
                return res.json({ message: 'Пользователь сохранен!' });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: 'Не удалось зарегистрировать пользователя!' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { login, password } = req.body;
                const admin = yield Admin.findOne({ login });
                if (!admin) {
                    return res.status(400).json({ message: `Пользователь ${login} не найден!` });
                }
                const validPassword = bcrypt.compareSync(password, admin.password);
                if (!validPassword) {
                    return res.status(400).json({ message: `Введен неверный пароль!` });
                }
                const token = generateAccesToken(admin._id, admin.role);
                return res.json({ token });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: 'Ошибка входа!' });
            }
        });
    }
    checkToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
                const payload = jwt.decode(token);
                const { id } = payload;
                const admin = yield Admin.findOne({ _id: id });
                if (!admin) {
                    return res.status(400).json({ message: `Пользователь не найден!` });
                }
                ;
                const newToken = generateAccesToken(admin._id, admin.role);
                return res.json({ newToken });
            }
            catch (e) {
                console.log(e);
                return res.status(400).json({ message: 'Ошибка входа!' });
            }
        });
    }
}
exports.default = authControler;
function generateAccesToken(id, roles) {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, config_1.secret, {
        expiresIn: '24h'
    });
}
