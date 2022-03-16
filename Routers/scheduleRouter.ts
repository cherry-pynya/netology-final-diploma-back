const Router = require('express');
import scheduleControler from "../Controlers/scheduleControler";

const router = new Router();
const controler: scheduleControler = new scheduleControler();

router.get('/schedule', controler.getSchedule);
router.post('/createHall', controler.createHall);
router.post('/deleteHall', controler.deleteHall);

module.exports = router;