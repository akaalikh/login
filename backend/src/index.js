import express from 'express';
import cors from 'cors';
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import { verifyToken } from './middlewares/auth.middleware.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', verifyToken, userRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})