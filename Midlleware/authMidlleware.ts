import { secret } from '../config';
const jwt = require('jsonwebtoken')

module.exports = function (req: { method: string; headers: { authorization: string; }; user: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): any; new(): any; }; }; }, next: () => void) {
    if (req.method === "OPTIONS") {
        next()
    };

    try {
        const token: string = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"});
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({message: "Пользователь не авторизован"});
    };
};