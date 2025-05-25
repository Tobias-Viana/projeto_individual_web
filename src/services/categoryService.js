const categoryRepository = require('../repositories/categoryRepository');

const listCategories = () => {
  return categoryRepository.listCategories();
};

const getCategoryById = (id) => {
  return categoryRepository.getCategoryById(id);
};

const createCategory = (name, description) => {
  return categoryRepository.createCategory(name, description);
};

const updateCategory = (id, name, description) => {
  return categoryRepository.updateCategory(id, name, description);
};

const deleteCategory = (id) => {
  return categoryRepository.deleteCategory(id);
};

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
