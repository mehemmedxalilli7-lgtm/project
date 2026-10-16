import { Router } from 'express';
import { registerUser } from '../controllers/admin.controller.js';


const router = Router();


// Test mərhələsində middleware olmadan açıq buraxa bilərsən
router.post('/register', registerUser);


export default router;
