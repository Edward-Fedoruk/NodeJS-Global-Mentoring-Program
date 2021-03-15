import { Request, Response } from 'express';
import create from '../../models/user/create';
import { User } from '../../models/user/types';

export default (req: Request, res: Response) => {
  const user: User = req.body;
  create(user)
    .then((createdUser) => res.status(200).json(createdUser))
    .catch((err) => res.status(400).json(err.message));
};
