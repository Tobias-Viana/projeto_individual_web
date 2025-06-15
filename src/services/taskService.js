const repo = require('../repositories/taskRepository');
const model = require('../models/taskModels');
const userRepo = require('../repositories/userRepository');

const createTask = async (users_id, title, description, date_creation, date_delivery, status, category_id = null) => {
  const userId = parseInt(users_id, 10);
  if (isNaN(userId)) throw new Error("ID de usuário inválido");

  try {
    const user = await userRepo.findById(userId);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const { error } = model.validate({ users_id: userId, title, description, date_creation, date_delivery, status, category_id });
    if (error) throw new Error(error.details[0].message);

    return await repo.createTask(userId, title, description, date_creation, date_delivery, status, category_id);
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async () => await repo.getAllTasks();

const getTasksByUserId = async (userId) => {
  if (!userId || isNaN(userId)) throw new Error("ID de usuário inválido");
  return await repo.getTasksByUserId(userId);
};

const getTaskById = async (id) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  return await repo.getTaskById(id);
};

const updateTask = async (id, title, description, status, date_delivery = null, category_id = null) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  const { error } = model.validateUpdate({ title, description, status, category_id });
  if (error) throw new Error(error.details[0].message);
  return await repo.updateTask(id, title, description, status, date_delivery, category_id);
};

const deleteTask = async (id) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  return await repo.deleteTask(id);
};

module.exports = {
  createTask,
  getAllTasks,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask,
};
