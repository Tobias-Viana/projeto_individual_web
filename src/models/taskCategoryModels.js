const Joi = require('joi');

const taskCategorySchema = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().allow('', null),
  color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/).default('#3b82f6'),
  users_id: Joi.number().integer().required(),
  created_at: Joi.date()
});

const updateTaskCategorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  description: Joi.string().allow('', null),
  color: Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/)
});

module.exports = {
  validate: (category) => taskCategorySchema.validate(category),
  validateUpdate: (category) => updateTaskCategorySchema.validate(category),
  schema: taskCategorySchema,
  updateSchema: updateTaskCategorySchema
};
