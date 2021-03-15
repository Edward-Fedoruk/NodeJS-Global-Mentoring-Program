import { Request, Response } from 'express';
import find from '../../models/user/find';

export default (req: Request, res: Response) => {
  const { id: userId } = req.params;
  find(userId)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json(error.message));
};
