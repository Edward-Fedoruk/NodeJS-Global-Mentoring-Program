import { Request, Response } from 'express';
import update from '../../models/user/update';
import { User } from '../../models/user/types';

export default (req: Request, res: Response) => {
  const updatedUserData: User = req.body;
  const { id } = req.params;

  update(id, updatedUserData)
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.status(404).json(error.message));
};
