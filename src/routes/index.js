import express from 'express';
import authentication from './authentication';
import signup from './signup';
import entry from './entry';

const router = express.Router();

router.use('/authentication', authentication);
router.use('/signup', signup);
router.use('/entry', entry);

export default router;
