const Admin = require('../Models/Admin');
const Role = require('../Models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import { validationResult } from "express-validator";

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
            const { name, password }: { name: string, password: string } = req.body;
            const admin = await Admin.findOne({name});
            if (!admin) {
                return res.status(400).json({message: `Пользователь ${name} не найден!`});
            }
            console.log(admin)
            const validPassword = bcrypt.compareSync(password, admin.password);
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль!`});
            }
            const token = generateAccesToken(admin._id, admin.role);
            return res.json({token})
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
    const secret: string = process.env.ACESS_KEY || 'RANDOM_KEY';
    return jwt.sign(payload, secret, {
        expiresIn: '24h'
    });
}