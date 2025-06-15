const Joi = require('joi');

const taskSchema = Joi.object({
  id: Joi.number().integer(),
  users_id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null),
  date_creation: Joi.date().required(),
  date_delivery: Joi.date().required(),
  status: Joi.string().valid('pendente', 'em andamento', 'concluída').required(),
  category_id: Joi.number().integer().allow(null),
  created_at: Joi.date()
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('', null),
  status: Joi.string().valid('pendente', 'em andamento', 'concluída').required(),
  category_id: Joi.number().integer().allow(null)
});

module.exports = {
  validate: (task) => taskSchema.validate(task),
  validateUpdate: (task) => updateTaskSchema.validate(task),
  schema: taskSchema,
  updateSchema: updateTaskSchema
};
