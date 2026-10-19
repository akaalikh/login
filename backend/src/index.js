import express from 'express';
import cors from 'cors';
import usersRouter from "./routes/user.route.js"

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send({ msg: 'gg ghaly' });
})

app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})