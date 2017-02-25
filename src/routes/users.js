import express from 'express';
import usersController from '../controllers/users';

const router = express.Router();

router.get('/:userInput', usersController.getUser);

export default router;
