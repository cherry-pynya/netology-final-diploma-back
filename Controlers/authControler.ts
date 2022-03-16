const Admin = require('../Models/Admin');
const Role = require('../Models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { validationResult } from "express-validator";
import { secret } from "../config";

export default class authControler {
    public async registration(req: any, res: any): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Ошибка регистрации', errors});
            }
            const { name, password }: { name: string, password: string } = req.body;
            const candidate = await Admin.findOne({name});
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует!'})
            };
            const hashPassword = bcrypt.hashSync(password, 7);
            const adminRole = await Role.findOne({value: 'ADMIN'});
            const admin = new Admin({name: name, password: hashPassword, roles: [adminRole.value]});
            await admin.save();
            return res.json({message: 'Пользователь сохранен!'})
        } catch(e) {
            console.log(e);
            return res.status(400).json({message: 'Не удалось зарегистрировать пользователя!'});
        }
    }

    public async login(req: any, res: any): Promise<void> {
        try {
            const { login, password }: { login: string, password: string } = req.body;
            const admin = await Admin.findOne({login});
            if (!admin) {
                return res.status(400).json({message: `Пользователь ${login} не найден!`});
            }
            const validPassword = bcrypt.compareSync(password, admin.password);
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль!`});
            }
            const token = generateAccesToken(admin._id, admin.role);
            return res.json({token});
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка входа!'});
        }
    }

    public async checkToken(req: any, res: any): Promise<void> {
        try {
            const { token }: { token: string } = req.body;
            const payload = jwt.decode(token);
            const {id} = payload;
            const admin = await Admin.findOne({_id: id});
            if (!admin) {
                return res.status(400).json({message: `Пользователь не найден!`});
            };
            const newToken = generateAccesToken(admin._id, admin.role);
            return res.json({newToken});
        } catch(e) {
            console.log(e)
            return res.status(400).json({message: 'Ошибка входа!'});
        }
    }
}

function generateAccesToken(id: string, roles: Array<string>): string {
    const payload = {
        id, 
        roles
    }
    return jwt.sign(payload, secret, {
        expiresIn: '24h'
    });
}