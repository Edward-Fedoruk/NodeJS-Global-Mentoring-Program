import express from 'express';
import joi from 'joi';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import validateBody from './validateBody';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

type User = {
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

const userSchema = joi.object({
  login: joi.string().alphanum().max(50).required(),
  password: joi
    .string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
    .message('password must contain minimum eight characters, at least one letter and one number')
    .required(),
  age: joi.number().min(4).max(30).required(),
  isDeleted: joi.boolean().required(),
});

app.post('/create', validateBody(userSchema), (req, res) => {
  const user: User = req.body;

  const t = userSchema.validate(user, { abortEarly: false });
  res.json(t);
  const userData = {
    id: uuidv4(),
    ...user,
  };

  fs.writeFile(path.join(__dirname, './data/userData.json'), JSON.stringify(userData))
    .then(() => res.status(201).send(userData))
    .catch(() => res.status(400).send({ message: 'bad request' }));
});

app.listen(port, () => console.log(`listening on port ${port}`));
