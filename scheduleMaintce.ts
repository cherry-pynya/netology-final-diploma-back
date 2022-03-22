import moment from "moment";
import { CustomerEventInterface } from "./Interfaces";

const CustomerEvent = require('./Models/CustomerEvent');

moment.locale('ru');

export default async function scheduleMaintance(): Promise<void> {
    const customerEvents: Array<CustomerEventInterface> = await CustomerEvent.find();
    const now = moment();
    customerEvents.forEach(async (el: CustomerEventInterface) => {
        const { time, date, _id }: {time: string, date: string, _id: string} = el;
        const format = (`${date.replace(/\./g, ":")} ${time}`).trim();
        const check = moment(format, "DD:MM:YYYY hh:mm");
        if(check.isBefore(now)) {
            await CustomerEvent.deleteOne({_id});
        };
    });
};
