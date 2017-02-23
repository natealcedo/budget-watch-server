import express from 'express';
import entryController from '../controllers/entry';

const router = express.Router();

router.post('/', entryController.post);
router.post('/getAll', entryController.getAll);
router.post('/getByMonth', entryController.getByMonth);
router.post('/getByYear', entryController.getByYear);

export default router;
