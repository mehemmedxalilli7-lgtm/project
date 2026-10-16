import express from "express"
import {connectDB} from "./config/db"
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes';
import adminRoutes from "./routes/admin.routes"

dotenv.config()
const app = express()
app.use(express.json())

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

connectDB()

// A02 Kriptoqrafik xetalar
app.listen(process.env.PORT, () => console.log("Kiberhucumlardan mudafie olunacaq serverimiz calisir..."))
