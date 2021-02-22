import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

export default (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const validationResult = schema.validate(req.body, { abortEarly: false });

  if (!validationResult.error) {
    next();
  } else {
    const errors = validationResult.error.details
      .map(({ message, context }) => {
        const label = context && context.label;
        return [label, message];
      });

    res.json({ errors });
  }
};
