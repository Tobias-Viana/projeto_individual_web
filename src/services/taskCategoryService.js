const repo = require('../repositories/taskCategoryRepository');
const model = require('../models/taskCategoryModels');

const createCategory = async (name, description, color, users_id) => {
  const userId = parseInt(users_id, 10);
  if (isNaN(userId)) throw new Error("ID de usuário inválido");
  
  const { error } = model.validate({ name, description, color, users_id: userId });
  if (error) throw new Error(error.details[0].message);
  
  return await repo.createCategory(name, description, color, userId);
};

const getCategoriesByUserId = async (users_id) => {
  const userId = parseInt(users_id, 10);
  if (isNaN(userId)) throw new Error("ID de usuário inválido");
  
  return await repo.getCategoriesByUserId(userId);
};

const getCategoryById = async (id) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  return await repo.getCategoryById(id);
};

const updateCategory = async (id, name, description, color) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  
  const { error } = model.validateUpdate({ name, description, color });
  if (error) throw new Error(error.details[0].message);
  
  return await repo.updateCategory(id, name, description, color);
};

const deleteCategory = async (id) => {
  if (!id || isNaN(id)) throw new Error("ID inválido");
  return await repo.deleteCategory(id);
};

const getTasksWithCategories = async (users_id) => {
  const userId = parseInt(users_id, 10);
  if (isNaN(userId)) throw new Error("ID de usuário inválido");
  
  return await repo.getTasksWithCategories(userId);
};

module.exports = {
  createCategory,
  getCategoriesByUserId,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTasksWithCategories
};
