import express from 'express';
import { getCalCom, getCalComAvailableSlotTimes, scheduleCalCom } from '../controllers/calCom.controller';

const router = express.Router();

router.get('/', getCalCom);
router.get('/times', getCalComAvailableSlotTimes);
router.post('/', scheduleCalCom);

export default router;
