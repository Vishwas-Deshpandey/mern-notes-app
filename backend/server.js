import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoute.js'
import notesRoutes from './routes/notesRoute.js'
import path from 'path'

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use('/api/uploads/default', express.static(path.resolve('./backend/public/')))
app.use('/api/users', userRoutes);
app.use('/api/notes', notesRoutes);


app.get('/', (req,res) => {
    res.send("Server is ready")
})

app.use(notFound)
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server Listening at port ${PORT}`)
})