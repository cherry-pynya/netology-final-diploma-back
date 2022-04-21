import moment from "moment-timezone";
import {
  CustomerEventInterface,
  MovieInterface,
  HallInterface,
} from "./Interfaces";
import "moment/locale/ru";

const CustomerEvent = require("./Models/CustomerEvent");
// функция каждую минуту проверяет нет ли в сетке просроченных сеансов
// если есть удаляет их из сетки и добавляет копии с датой +7 дней
export default async function scheduleMaintance(): Promise<void> {
  const customerEvents: Array<CustomerEventInterface> =
    await CustomerEvent.find();
  const now = moment().tz('Europe/Moscow');
  customerEvents.forEach(async (el: CustomerEventInterface) => {
    const {
      time,
      date,
      _id,
      movie,
      hall,
      showTime,
    }: {
      time: string;
      date: string;
      _id: string;
      movie: MovieInterface;
      hall: HallInterface;
      showTime: string;
    } = el;
    const format = `${date.replace(/\./g, ":")} ${time}`.trim();
    const check = moment(format, "DD:MM:YYYY hh:mm");
    //проверка просрочен ли сеанс
    if (check.isBefore(now)) {
      //удаление просроченного
      await CustomerEvent.deleteOne({ _id });
      //создание нового сеанса
      const candidate = new CustomerEvent({
          time,
          movie,
          hall,
          showTime,
          date: moment().tz('Europe/Moscow').add(7, "days").format("L"),
      });
      await candidate.save();
    }
  });
};
