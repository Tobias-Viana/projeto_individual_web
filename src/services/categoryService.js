const categoryRepository = require('../repositories/categoryRepository');

const getAll = () => {
  return categoryRepository.getAllCategories();
};

const getById = (id) => {
  return categoryRepository.getCategoryById(id);
};

const create = (name, description) => {
  return categoryRepository.createCategory(name, description);
};

const update = (id, name, description) => {
  return categoryRepository.updateCategory(id, name, description);
};

const remove = (id) => {
  return categoryRepository.deleteCategory(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
