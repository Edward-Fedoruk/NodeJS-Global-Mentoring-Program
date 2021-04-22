import joi from 'joi';

export default joi.object({
  groupName: joi.string(),
  permissions: joi.array().items(joi.string().valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')),
}).options({ presence: 'required' });
