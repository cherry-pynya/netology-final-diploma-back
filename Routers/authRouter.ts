const Router = require('express');
import authControler from "../Controlers/authControler";
const { check } = require('express-validator');
const authMidlleware = require('../Midlleware/AuthMidlleware');

const router = new Router();
const controler = new authControler();

router.post('/login', controler.login);
router.post('/checkToken', authMidlleware, controler.checkToken);
router.post('/registration', [
    check('name', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать от 6 до 12 символоы').isLength({min: 6, max: 12}),
] ,controler.registration);

module.exports = router;