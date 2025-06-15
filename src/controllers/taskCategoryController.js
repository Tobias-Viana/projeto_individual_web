const taskCategoryService = require('../services/taskCategoryService');

exports.create = async (req, res) => {
  try {
    const { name, description, color, users_id } = req.body;
    
    if (!name || !users_id) {
      return res.status(400).json({ error: "Nome e ID do usuário são obrigatórios" });
    }
    
    const category = await taskCategoryService.createCategory(
      name, 
      description, 
      color || '#3b82f6', 
      users_id
    );
    
    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.listByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const categories = await taskCategoryService.getCategoriesByUserId(userId);
    res.json(categories);
  } catch (error) {
    console.error('Erro ao listar categorias do usuário:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const category = await taskCategoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    res.json(category);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }
    
    const category = await taskCategoryService.updateCategory(
      req.params.id, 
      name, 
      description, 
      color
    );
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    
    res.json(category);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const category = await taskCategoryService.deleteCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoria não encontrada" });
    }
    
    res.json({ message: "Categoria excluída com sucesso" });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.getTasksWithCategories = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await taskCategoryService.getTasksWithCategories(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao buscar tarefas com categorias:', error);
    res.status(500).json({ error: error.message });
  }
};
