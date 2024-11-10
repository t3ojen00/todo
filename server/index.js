import express from 'express';
import cors from 'cors';
import { todoRouter } from './routes/todoRouter.js'
import { userRouter } from './routes/userRouter.js'
import { pool } from './helpers/db.js';

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false }));


app.use('/', todoRouter);
app.use('/user', userRouter);

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({error: err.message})
})

app.listen(port, () => {
    console.log(`juoksee portilla ${port}`)
    console.log('toimi perkele')
})

console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);