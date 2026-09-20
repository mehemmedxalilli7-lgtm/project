import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();
connectDB();
const app = express();



// A05: Daxili stack trace-in hakerə sızmasının qarşısını alır
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ error: 'Server Xətası' });
});

app.listen(process.env.PORT, () => console.log(`Kiber Qala işləyir 🚀`)); 
