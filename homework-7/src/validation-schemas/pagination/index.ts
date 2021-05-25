import joi from 'joi';

export default joi.object({
  limit: joi
    .string()
    .pattern(new RegExp(/^\d+$/))
    .message('limit should be valid digit'),
  substring: joi.string(),
}).options({ presence: 'required' });
