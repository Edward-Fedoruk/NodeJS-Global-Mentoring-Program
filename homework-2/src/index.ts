import express from 'express';
import userRouter from './routers/user';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/user', userRouter);

app.listen(port, () => console.log(`listening on port ${port}`));
