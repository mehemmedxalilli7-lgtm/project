import { Router } from 'express';
import { login, changePassword } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';


const router = Router();


router.post('/login', login);
router.put('/change-password', protect, changePassword);


export default router;
