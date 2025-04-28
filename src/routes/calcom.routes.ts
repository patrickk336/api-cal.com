import express from 'express';
import { getCalCom } from '../controllers/calCom.controller';

const router = express.Router();

router.get('/', getCalCom);

export default router;
