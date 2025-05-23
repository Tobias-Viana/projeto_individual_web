const db = require('../config/db');

// Criar nova task
const createTask = async (id, user_id, title, description, date_creation, date_delivery, status) => {
  const query = `
    INSERT INTO task (id, user_id, title, description, date_creation, date_delivery, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [id, user_id, title, description, date_creation, date_delivery, status];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Listar todas as tasks
const getAllTasks = async () => {
  const query = 'SELECT id, user_id, title, description, date_creation, date_delivery, status FROM task';
  const result = await db.query(query);
  return result.rows;
};

// Pegar task por id
const getTaskById = async (id) => {
  const query = 'SELECT id, user_id, title, description, date_creation, date_delivery, status FROM task WHERE id = $1';
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// Atualizar task (title, description, status)
const updateTask = async (id, title, description, status) => {
  const query = `
    UPDATE task
    SET title = $1, description = $2, status = $3
    WHERE id = $4
    RETURNING *`;
  const values = [title, description, status, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Deletar task
const deleteTask = async (id) => {
  const query = 'DELETE FROM task WHERE id = $1 RETURNING *';
  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
