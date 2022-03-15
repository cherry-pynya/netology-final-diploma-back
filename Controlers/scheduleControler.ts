const Hall = require('../Models/Hall');
const Movie = require('../Models/Movie');
const ShowTime = require('../Models/ShowTime');
const SellingStatus = require('../Models/sellingStatus');


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
};
