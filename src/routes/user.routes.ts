import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();

router.post('/', UserController.signIn);
router.post('/signup', UserController.signUp);

export default router;
