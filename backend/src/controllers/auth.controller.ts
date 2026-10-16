import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';


// 1. Sistemə Giriş (Tələbə / Müəllim / Admin)
export const login = async (req: Request, res: Response): Promise<void> => {
 try {
   const { identifier, password } = req.body;


   const user = await User.findOne({ identifier });
   if (!user) {
     res.status(401).json({ message: 'İdentifikator və ya şifrə yanlışdır.' });
     return;
   }


   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
     res.status(401).json({ message: 'İdentifikator və ya şifrə yanlışdır.' });
     return;
   }


   // JWT Token yaradılması
   const token = jwt.sign(
     { id: user._id, role: user.role },
     process.env.JWT_SECRET as string,
     { expiresIn: '1d' }
   );


   res.status(200).json({
     message: 'Giriş uğurludur',
     token,
     user: {
       id: user._id,
       identifier: user.identifier,
       role: user.role,
       firstName: user.firstName,
       lastName: user.lastName
     }
   });
 } catch (error) {
   console.log(error)
   res.status(500).json({ message: 'Server xətası', error });
 }
};


// 2. Şifrənin Dəyişdirilməsi (Şəxsi Kabinetdən)
export const changePassword = async (req: Request, res: Response): Promise<void> => {
 try {
   const { oldPassword, newPassword } = req.body;
   const userId = (req as any).user.id; // Middleware-dən gələcək


   const user = await User.findById(userId);
   if (!user) {
     res.status(404).json({ message: 'İstifadəçi tapılmadı.' });
     return;
   }


   const isMatch = await bcrypt.compare(oldPassword, user.password);
   if (!isMatch) {
     res.status(400).json({ message: 'Köhnə şifrə yanlışdır.' });
     return;
   }


   const salt = await bcrypt.genSalt(10);
   user.password = await bcrypt.hash(newPassword, salt);
   await user.save();


   res.status(200).json({ message: 'Şifrəniz uğurla yeniləndi.' });
 } catch (error) {
   res.status(500).json({ message: 'Server xətası', error });
 }
};
