const Hall = require('../Models/Hall');
const Movie = require('../Models/Movie');
const ShowTime = require('../Models/ShowTime');
const SellingStatus = require('../Models/sellingStatus');
import {HallInterface, MovieInterface} from '../Interfaces';


export default class scheduleControler {
    public async getSchedule(req: any, res: any): Promise<void> {
        try {
            const halls = await Hall.find();
            const movies = await Movie.find();
            const showTimes = await ShowTime.find();
            const sellingStatus = await SellingStatus.find();
            return res.json({
                halls,
                movies,
                showTimes,
                sellingStatus,
            });
        } catch(e) {
            console.log(e);
            return res.status(400).json({message: 'Не удалось получить расписание сеансов!'});
        }
    }

    public async createHall(req: any, res: any): Promise<void> {
        try {
            const {number}: {number: Number} = req.body;
            const exist = await Hall.findOne({number: number});
            if (exist) {
                return res.status(400).json({message: 'Зал с таким номером уже существует!'});
            };
            const hall = new Hall({number});
            await hall.save();
            return res.json({message: 'Зал сохранен!'})
        } catch(e) {
            console.log(e);
            return res.status(400).json({message: 'Не удалось создать зал!'});
        }
    }

    public async deleteHall(req: any, res: any): Promise<void> {
        try {
            const {_id}: {_id: string} = req.body;
            const hall = await Hall.findOne({_id});
            if (!hall) {
                return res.status(400).json({message: 'Зала с таким номером не существует!'});
            };
            await hall.deleteOne();
            return res.json({message: 'Зал удален!'});
        } catch(e) {
            console.log(e);
            return res.status(400).json({message: 'Не удалось удалить зал!'});
        };
    };

    public async saveHallConfig(req: any, res: any): Promise<void>  {
        try {
            const { halls }: {halls: Array<HallInterface>} = req.body;
            halls.forEach(async (el: HallInterface) => {
                const { _id } = el;
                await Hall.replaceOne({_id}, el);
            });
            return res.json({message: 'Конфигурация залов сохранена!'});
        } catch(e) {
            console.log(e);
            return res.status(400).json({message: 'Не удалось сохранить конфигурацию залов!'});
        };
    };

    public async addMovie(req: any, res: any): Promise<void>  {
        try {
            const { name, length }: {name: string, length: number} = req.body;
            const candidate = await Movie.findOne({name});
            if (candidate) {
                return res.status(400).json({message: 'Фильм с таким именем уже существует!'});
            };
            const movie = new Movie({name, length});
            await movie.save();
            return res.json({message: 'Фильм сохранен!'});
        } catch(e) {
            console.log(e);
            return res.status(400).json({message: 'Не удалось сохранить фильм!'});
        };
    }
};
