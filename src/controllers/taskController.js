const svc = require('../services/taskService');

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const { users_id, title, description, date_creation, date_delivery, status } = req.body;
    const task = await svc.createTask(users_id, title, description, date_creation, date_delivery, status);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  try {
    const tasks = await svc.getAllTasks();
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.detail = async (req, res) => {
  try {
    const task = await svc.getTaskById(req.params.id);
    task ? res.json(task) : res.status(404).json({ error: "Tarefa não encontrada" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updated = await svc.updateTask(req.params.id, title, description, status);
    updated ? res.json(updated) : res.status(404).json({ error: "Tarefa não encontrada" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await svc.deleteTask(req.params.id);
    deleted ? res.status(204).send() : res.status(404).json({ error: "Tarefa não encontrada" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};