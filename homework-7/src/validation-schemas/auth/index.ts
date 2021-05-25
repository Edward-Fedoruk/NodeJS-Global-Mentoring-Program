import joi from 'joi';

export default joi.object({
  login: joi.string().alphanum().max(50),
  password: joi
    .string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
    .message('password is invalid'),
}).options({ presence: 'required' });
