import express from 'express';
import { analyzeAndSaveLead, getAllLeads } from '../controllers/leadController.js';

const router = express.Router();

router.post('/analyze', analyzeAndSaveLead);
router.get('/', getAllLeads);

export default router;