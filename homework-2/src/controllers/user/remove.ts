import { Request, Response } from 'express';
import remove from '../../models/user/remove';

export default (req: Request, res: Response) => {
  const { id } = req.params;

  remove(id)
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.status(404).json(error.message));
};
