import express from 'express';
import { n8nTestingController } from '../controllers/n8nTesting.controller';

const router = express.Router();

router.post('/', n8nTestingController.getGrades);
router.post('/approval', n8nTestingController.createApproval);
router.post('/image-scan', n8nTestingController.createImageScan);

export default router;
