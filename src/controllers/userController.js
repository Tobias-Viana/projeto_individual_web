const svc = require('../services/userService');

exports.create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!password) throw new Error("Senha é obrigatória");
    const user = await svc.createUser(name, email, password);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.list = async (_, res) => res.json(await svc.getAllUsers());

exports.detail = async (req, res) => {
  const user = await svc.getUserById(req.params.id);
  user ? res.json(user) : res.sendStatus(404);
};

exports.update = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await svc.updateUser(req.params.id, name, email);
    updated ? res.json(updated) : res.sendStatus(404);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.remove = async (req, res) => {
  const deleted = await svc.deleteUser(req.params.id);
  deleted ? res.sendStatus(204) : res.sendStatus(404);
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error('Email e senha são obrigatórios');
    const user = await svc.verifyUserPassword(email, password);
    if (!user) return res.status(401).json({ error: 'Email ou senha inválidos' });
    res.status(200).json({ message: 'Login realizado com sucesso', user });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
