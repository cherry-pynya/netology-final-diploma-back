const Router = require('express');
import scheduleControler from "../Controlers/scheduleControler";
const authMidlleware = require('../Midlleware/AuthMidlleware');

const router = new Router();
const controler: scheduleControler = new scheduleControler();

router.get('/schedule', controler.getSchedule);
router.post('/saveHallConfig', authMidlleware, controler.saveHallConfig);
router.post('/addMovie', authMidlleware, controler.addMovie)
router.post('/createHall', authMidlleware, controler.createHall);
router.post('/deleteHall', authMidlleware, controler.deleteHall);

module.exports = router;