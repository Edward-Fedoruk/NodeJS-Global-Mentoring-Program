import joi from 'joi';

const optional = joi.object({
  login: joi.string().alphanum().max(50),
  password: joi
    .string()
    .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'))
    .message('password must contain minimum eight characters, at least one letter and one number'),
  age: joi.number().min(4).max(30),
});

const required = optional.options({ presence: 'required' });

export default {
  optional,
  required,
};
