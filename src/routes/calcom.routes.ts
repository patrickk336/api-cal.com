import express from 'express';
import { getCalCom, getCalComAvailableSlotTimes } from '../controllers/calCom.controller';

const router = express.Router();

router.get('/', getCalCom);
router.get('/times', getCalComAvailableSlotTimes);

export default router;
