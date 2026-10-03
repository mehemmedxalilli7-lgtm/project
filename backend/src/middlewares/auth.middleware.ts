
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



export const protect = (req: Request, res: Response, next: NextFunction): void => {
 let token = req.headers.authorization; //token 
// Bea$54afced231$arer 

 if (token && token.startsWith('Bearer')) {
   token = token.split(' ')[1];

//    A01 Broken Access Control
   try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
     (req as any).user = decoded; // Tokenin içindəki məlumatları request-ə əlavə edirik
     next();
   } catch (error) {
     res.status(401).json({ message: 'Səlahiyyət yoxdur, token etibarsızdır.' });
   }
 } else {
   res.status(401).json({ message: 'Səlahiyyət yoxdur, token təqdim edilməyib.' });
 }
};


// Rollara görə məhdudiyyət (Məsələn, yalnız Admin qeydiyyat apara bilər)

// spread operator ...
// ["admin", "teacher", "user"]
export const authorize = (...roles: string[]) => {
 return (req: Request, res: Response, next: NextFunction): void => {
   if (!roles.includes((req as any).user.role)) {
     res.status(403).json({ message: 'Bu əməliyyat üçün icazəniz yoxdur.' });
     return;
   }
   next(); //middleware
 };
};
