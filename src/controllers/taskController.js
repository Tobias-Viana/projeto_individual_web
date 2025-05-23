// Importar o módulo de conexão com o banco de dados
const pool = require('../config/db');

// Criar uma nova tarefa
exports.createTask = async (req, res) => {
  const { title, description, date_creation, date_delivery, status } = req.body;

  const query = 'INSERT INTO task (title, description, date_creation, date_delivery, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [title, description, date_creation, date_delivery, status];

  try {
    const result = await pool.query(query, values);
    const tarefa = result.rows[0];
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listTask = async (req, res) => {
  const query = 'SELECT * FROM task';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const query = `
    UPDATE task SET title = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4 RETURNING *`;
  const values = [title, description, status, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM task WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};