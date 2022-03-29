const Hall = require("../Models/Hall");
const Movie = require("../Models/Movie");
const ShowTime = require("../Models/ShowTime");
const SellingStatus = require("../Models/sellingStatus");
const CustomerEvent = require("../Models/CustomerEvent");

import {
  HallInterface,
  MovieInterface,
  ShowTimeInterface,
  OrderItem
} from "../Interfaces";
import moment from "moment";
import "moment/locale/ru";
import scheduleMaintance from "../scheduleMaintce";

export default class scheduleControler {
  public async getSchedule(req: any, res: any): Promise<void> {
    try {
      const halls = await Hall.find();
      const movies = await Movie.find();
      const showTimes = await ShowTime.find();
      const sellingStatus = await SellingStatus.findOne({
        _id: "6230d2c4722f153e9886e137",
      });
      return res.json({
        halls,
        movies,
        showTimes,
        sellingStatus,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ message: "Не удалось получить расписание сеансов!" });
    }
  }

  public async createHall(req: any, res: any): Promise<void> {
    try {
      const { number }: { number: Number } = req.body;
      const exist = await Hall.findOne({ number: number });
      if (exist) {
        return res
          .status(400)
          .json({ message: "Зал с таким номером уже существует!" });
      }
      const hall = new Hall({ number });
      await hall.save();
      return res.json({ message: "Зал сохранен!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Не удалось создать зал!" });
    }
  }

  public async deleteHall(req: any, res: any): Promise<void> {
    try {
      const { _id }: { _id: string } = req.body;
      const hall = await Hall.findOne({ _id });
      if (!hall) {
        return res
          .status(400)
          .json({ message: "Зала с таким номером не существует!" });
      }
      await hall.deleteOne();
      return res.json({ message: "Зал удален!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Не удалось удалить зал!" });
    }
  }

  public async saveHallConfig(req: any, res: any): Promise<void> {
    try {
      const { halls }: { halls: Array<HallInterface> } = req.body;
      halls.forEach(async (el: HallInterface) => {
        const { _id } = el;
        await Hall.replaceOne({ _id }, el);
      });
      return res.json({ message: "Конфигурация залов сохранена!" });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ message: "Не удалось сохранить конфигурацию залов!" });
    }
  }

  public async addMovie(req: any, res: any): Promise<void> {
    try {
      const {
        name,
        length,
        desc,
      }: { name: string; length: number; desc: string } = req.body;
      const candidate = await Movie.findOne({ name });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Фильм с таким именем уже существует!" });
      }
      const movie = new Movie({ name, length, desc });
      await movie.save();
      return res.json({ message: "Фильм сохранен!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Не удалось сохранить фильм!" });
    }
  }

  public async saveShowTimes(req: any, res: any): Promise<void> {
    try {
      const { showTimes }: { showTimes: Array<ShowTimeInterface> } = req.body;
      showTimes.forEach(async (el) => {
        if ("_id" in el) {
          const _id = el["_id"];
          await ShowTime.replaceOne({ _id }, el);
        } else {
          const st = new ShowTime(el);
          await st.save(async (err: any, room: any) => {
            await createCustomerEvent(el, room.id);
          });
        }
      });
      await scheduleMaintance();
      return res.json({ message: "Расписание сеансов сохранено!" });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ message: "Не удалось сохранить расписание сеансов!" });
    }
  }

  public async getCustomerData(req: any, res: any): Promise<void> {
    try {
      const customerEvents = await CustomerEvent.find();
      const sellingStatus = await SellingStatus.findOne({
        _id: "6230d2c4722f153e9886e137",
      });
      return res.json({
        customerEvents,
        sellingStatus,
      });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ message: "Не удалось получить расписание сеансов!" });
    }
  }

  public async deleteShowTimes(req: any, res: any): Promise<void> {
    try {
      const { _id }: { _id: string } = req.body;
      await ShowTime.deleteOne({ _id });
      console.log(_id);
      await CustomerEvent.deleteMany({ showTime: _id });
      return res.json({ message: "Сеанс удален!" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Не удалось удалить сенас!" });
    }
  }

  public async changeSellingStatus(req: any, res: any): Promise<void> {
    try {
      const { status }: { status: boolean } = req.body;
      await SellingStatus.updateOne(
        { _id: "6230d2c4722f153e9886e137" },
        { status }
      );
      return res.json({ message: "Стаиус продажи билетов изменен!" });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ message: "Не удалось изменить статус продажи билетов!" });
    }
  }

  public async buyTicket(req: any, res: any): Promise<void> {
    try {
      const { order, hallForm }: { order: Array<OrderItem>, hallForm: HallInterface } = req.body;
      console.log(order);
      console.log(hallForm);
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ message: "Не удалось купить билет!" });
    }
  };
};

async function createCustomerEvent(
  showTime: ShowTimeInterface,
  _id: string
): Promise<void> {
  for (let i = 0; i < 7; i++) {
    const {
      movie,
      hall,
      time,
    }: { movie: MovieInterface; hall: HallInterface; time: string } = showTime;
    const date: string = moment(i).add(i, "days").format("L");
    const event = new CustomerEvent({
      date: moment().add(i, "days").format("L"),
      hall,
      time,
      movie,
      showTime: _id,
    });
    await event.save();
  }
}
