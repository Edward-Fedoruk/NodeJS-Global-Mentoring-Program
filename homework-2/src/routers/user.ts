import { Router } from 'express';
import getById from '../controllers/user/getById';
import update from '../controllers/user/update';
import create from '../controllers/user/create';
import remove from '../controllers/user/remove';
import getSuggested from '../controllers/user/getSuggested';
import validate from '../validate';
import userSchema from '../schemas/user';
import paginationSchema from '../schemas/pagination';

const userRouter = Router();

userRouter.get('/auto-suggest/', validate(paginationSchema, 'query'), getSuggested);
userRouter.post('/create', validate(userSchema.required, 'body'), create);
userRouter.delete('/remove/:id', remove);

userRouter.route('/:id')
  .get(getById)
  .put(validate(userSchema.optional, 'body'), update);

export default userRouter;
