const Joi = require("joi");

module.exports = Joi.object({
  id: Joi.number().integer().positive(),
  users_id: Joi.number().integer().positive().required(),
  title: Joi.string().min(3).required(),
  description: Joi.string().allow(''),
  date_creation: Joi.date().iso(),
  date_delivery: Joi.date().iso().required(),
  status: Joi.string().valid('pendente', 'em andamento', 'concluída').required()
});
