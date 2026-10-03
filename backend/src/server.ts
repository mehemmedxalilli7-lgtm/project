import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';


// marshrutlar
import adminRoutes from "./routes/admin.routes"
import authRoutes from "./routes/auth.routes"

dotenv.config();
connectDB();
const app = express();

// json() {}
app.use(express.json())

app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)



// A05: Daxili stack trace-in hakerə sızmasının qarşısını alır
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json({ error: 'Server Xətası' });
});

app.listen(process.env.PORT, () => console.log(`Veb tetbiqimiz ugurla calisir 🚀`)); 


