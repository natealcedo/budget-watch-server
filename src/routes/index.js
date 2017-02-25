import authentication from './authentication';
import entry from './entry';
import express from 'express';
import signup from './signup';
import authenticateToken from '../middleware/authenticateToken';

const router = express.Router();

router.use('/authentication', authentication);
router.use('/signup', signup);
router.use('/entry', authenticateToken, entry);

export default router;
