const taskService = require('../services/taskService');

exports.create = async (req, res) => {
  try {
    const { users_id, title, description, date_creation, date_delivery, status, category_id } = req.body;
    
    if (!users_id || !title || !date_creation || !date_delivery || !status) {
      return res.status(400).json({ error: "Todos os campos obrigatórios devem ser preenchidos" });
    }

    const task = await taskService.createTask(
      users_id,
      title,
      description,
      date_creation,
      date_delivery,
      status,
      category_id
    );

    res.status(201).json(task);
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.list = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao listar tarefas:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.listByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const tasks = await taskService.getTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    console.error('Erro ao listar tarefas do usuário:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.json(task);
  } catch (error) {
    console.error('Erro ao buscar tarefa:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, status, date_delivery, category_id } = req.body;
    if (!title || !status) {
      return res.status(400).json({ error: "Título e status são obrigatórios" });
    }

    const task = await taskService.updateTask(req.params.id, title, description, status, date_delivery, category_id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    res.json(task);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    
    res.json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    res.status(400).json({ error: error.message });
  }
};
