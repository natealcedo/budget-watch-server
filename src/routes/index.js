import express from 'express';
import login from './login';
import signup from './signup';

const router = express.Router();

router.use('/login', login);
router.use('/signup', signup);

export default router;
