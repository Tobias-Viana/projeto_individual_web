const { message } = require('../models/userModels');
const svc = require('../services/userService');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Nome, email e senha são obrigatórios" });
    }
    
    const users = await svc.create({ name, email, password });
    
    res.status(201).json(users);
  } catch (e) {
    console.error('Erro ao criar usuário:', e);
    res.status(400).json({ error: e.message });
  }
};


exports.list = async (_, res) => res.json(await svc.list());

exports.detail = async (req, res) => {
  const users = await svc.detail(req.params.id);
  users ? res.json(users) : res.sendStatus(404);
};

exports.update = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await svc.update(req.params.id, { name, email });
    updated ? res.json(updated) : res.sendStatus(404);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  const deleted = await svc.remove(req.params.id);
  if (deleted) {
    res.status(200).json({ message: 'Usuário deletado' });
  } else {
    res.status(404).json({ error: 'Usuário não encontrado' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    const result = await svc.authenticate(email, password);
    if (!result) {
      return res.status(401).json({ error: 'Email ou senha inválidos' });
    }
    
    res.status(200).json(result);
  } catch (e) {
    console.error('Erro no login:', e);
    res.status(400).json({ error: e.message });
  }
};
