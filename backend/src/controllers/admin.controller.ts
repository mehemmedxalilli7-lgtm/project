
import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

// default adli daxiletme
export const registerUser = async (req: Request, res: Response): Promise<void> => {
 try {

    // input type="text" name="identifier"
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

//    mongooseda melumati save(yaddasha vurmaq)
   await newUser.save();
//    200 vs 201
   res.status(201).json({ message: 'İstifadəçi uğurla qeydiyyatdan keçdi', userId: newUser._id });
 } catch (error) {
   res.status(503).json({ message: 'Service is unavailable', error });
 }
};


