import express from 'express';
import { signInController } from '../controllers/signIn.controller';

const router = express.Router();

router.post('/', signInController.signIn);

export default router;
