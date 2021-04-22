import type { NextFunction, Request, Response } from 'express';
import type { ObjectSchema } from 'joi';

export default (
  schema: ObjectSchema,
  type: 'body' | 'query',
) => (req: Request, res: Response, next: NextFunction): void => {
  const validationResult = schema.validate(req[type], { abortEarly: false });

  if (!validationResult.error) {
    next();
  } else {
    const errors = validationResult?.error?.details
      .map(({ message, context }) => {
        const label = context && context.label;
        return [label, message];
      });

    res.json({ errors });
  }
};
