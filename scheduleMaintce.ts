import moment from "moment";
import {
  CustomerEventInterface,
  MovieInterface,
  HallInterface,
} from "./Interfaces";
import "moment/locale/ru";

const CustomerEvent = require("./Models/CustomerEvent");

export default async function scheduleMaintance(): Promise<void> {
  const customerEvents: Array<CustomerEventInterface> =
    await CustomerEvent.find();
  const now = moment();
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
    if (check.isBefore(now)) {
      await CustomerEvent.deleteOne({ _id });
      const candidate = new CustomerEvent({
          time,
          movie,
          hall,
          showTime,
          date: moment().add(6, "days").format("L"),
      });
    }
  });
}
