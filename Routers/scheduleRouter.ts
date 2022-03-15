const Router = require('express');
import scheduleControler from "../Controlers/scheduleControler";

const router = new Router();
const controler: scheduleControler = new scheduleControler();

router.get('/schedule', controler.getSchedule);

module.exports = router;