import { Request, Response } from 'express';
import getSuggested from '../../models/user/getSuggested';

export default (req: Request, res: Response) => {
  const { limit, substring } = req.query;
  getSuggested(limit as string, substring as string)
    .then((data) => res.json(data))
    .catch((error) => res.status(404).json(error.message));
};
