import express from 'express';
import authenticationController from '../controllers/authentication';

const router = express.Router();

router.post('/', authenticationController.authentication);

export default router;
