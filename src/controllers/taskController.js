const svc = require('../services/taskService');

exports.create = async (req, res) => {
  try {
    const { user_id, title, description, date_creation, date_delivery, status } = req.body;
    const task = await svc.createTask(user_id, title, description, date_creation, date_delivery, status);
    res.status(201).json(task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => {
  const tasks = await svc.getAllTasks();
  res.json(tasks);
};

exports.detail = async (req, res) => {
  try {
    const task = await svc.getTaskById(req.params.id);
    task ? res.json(task) : res.sendStatus(404);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updated = await svc.updateTask(req.params.id, title, description, status);
    updated ? res.json(updated) : res.sendStatus(404);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await svc.deleteTask(req.params.id);
    deleted ? res.sendStatus(204) : res.sendStatus(404);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
