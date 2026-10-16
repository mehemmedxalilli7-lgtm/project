import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';


export const registerUser = async (req: Request, res: Response): Promise<void> => {
 try {
   const { identifier, password, role, firstName, lastName, faculty, speciality, enrollmentYear, department, academicDegree } = req.body;


   const existingUser = await User.findOne({ identifier });
   if (existingUser) {
     res.status(400).json({ message: 'Bu identifikator artıq mövcuddur.' });
     return;
   }


   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);


   const newUser = new User({
     identifier,
     password: hashedPassword,
     role,
     firstName,
     lastName,
     faculty,
     speciality,
     enrollmentYear,
     department,
     academicDegree
   });


   await newUser.save();
   res.status(201).json({ message: 'İstifadəçi uğurla qeydiyyatdan keçdi', userId: newUser._id });
 } catch (error) {
   res.status(500).json({ message: 'Xəta baş verdi', error });
 }
};
