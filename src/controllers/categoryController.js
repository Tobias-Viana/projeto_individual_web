const svc = require('../services/categoryService');
const categoryModel = require('../models/categoryModels');

exports.createCategory = async (req, res) => {
  try {
    const { error, value } = categoryModel.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const category = await svc.createCategory(value.name, value.description);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listCategories = async (_, res) => {
  try {
    const categories = await svc.listCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await svc.getCategoryById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { error, value } = categoryModel.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updated = await svc.updateCategory(req.params.id, value.name, value.description);
    if (!updated) return res.status(404).json({ message: 'Categoria não encontrada' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await svc.deleteCategory(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
