import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ error: 'token is not provided' });
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET ?? 'secret', (err) => {
      if (err) {
        return res.status(403).json('token is invalid');
      }
      return next();
    });
  }
};

export default authMiddleware;
