import { Router } from 'express';
import { registerUser } from '../controllers/admin.controller';


const router = Router()
// http metodlari 
// get post put  delete
// RestFUL API

// HTTP Methods - GET POST PUT DELETE (RestFUL API)
router.post("/register", registerUser)


export default router




