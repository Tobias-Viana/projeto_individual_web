const repo = require('../repositories/taskRepository');
const model = require('../models/taskModels');
const userRepo = require('../repositories/userRepository');

const createTask = async (user_id, title, description, date_creation, date_delivery, status) => {
  // Validar user_id
  const userId = parseInt(user_id, 10);
  if (isNaN(userId)) throw new Error("ID de usuário inválido");
  
  // Verificar se o usuário existe
  const user = await userRepo.findById(userId);
  if (!user) throw new Error("Usuário não encontrado");
  
  const { error } = model.validate({ user_id: userId, title, description, date_creation, date_delivery, status });
  if (error) throw new Error(error.details[0].message);
  
  return await repo.createTask(userId, title, description, date_creation, date_delivery, status);
};

const getAllTasks = async () => await repo.getAllTasks();

const getTaskById = async (id) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  return await repo.getTaskById(id);
};

const updateTask = async (id, title, description, status) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  const { error } = model.validate({ id: 1, user_id: 1, title, description, status }); // valores fictícios para validação
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