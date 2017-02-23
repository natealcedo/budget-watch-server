import express from 'express';
import login from './login';
import signup from './signup';
import entry from './entry';

const router = express.Router();

router.use('/login', login);
router.use('/signup', signup);
router.use('/entry', entry);

export default router;
