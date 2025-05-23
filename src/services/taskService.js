const repo = require('../repositories/taskRepository');
const model = require('../models/taskModels');

const createTask = async (user_id, title, description, date_creation, date_delivery, status) => {
  const { error } = model.validate({ user_id, title, description, date_creation, date_delivery, status });
  if (error) throw new Error(error.details[0].message);
  return await repo.createTask(user_id, title, description, date_creation, date_delivery, status);
};

const getAllTasks = async () => await repo.getAllTasks();

const getTaskById = async (id) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  return await repo.getTaskById(id);
};

const updateTask = async (id, title, description, status) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  const { error } = model.validate({ user_id: 1, title, description, status }); // user_id fake só pra validar os campos obrigatórios
  if (error) throw new Error(error.details[0].message);
  return await repo.updateTask(id, title, description, status);
};

const deleteTask = async (id) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  return await repo.deleteTask(id);
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
