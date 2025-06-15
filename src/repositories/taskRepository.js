const db = require('../config/db');

const createTask = async (users_id, title, description, date_creation, date_delivery, status, category_id = null) => {
  try {
    const result = await db.query(
      `INSERT INTO tasks (users_id, title, description, date_creation, date_delivery, status, category_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [users_id, title, description, date_creation, date_delivery, status, category_id]
    );

    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar tarefa no banco:', error);
    throw error;
  }
};

const getAllTasks = async () => {
  try {
    const result = await db.query('SELECT * FROM tasks ORDER BY date_creation DESC');
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar todas as tarefas:', error);
    throw error;
  }
};

const getTasksByUserId = async (users_id) => {
  try {
    const result = await db.query(
      'SELECT * FROM tasks WHERE users_id = $1 ORDER BY date_creation DESC',
      [users_id]
    );
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar tarefas do usuário:', error);
    throw error;
  }
};

const getTaskById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar tarefa por ID:', error);
    throw error;
  }
};

const updateTask = async (id, title, description, status, date_delivery = null, category_id = null) => {
  try {
    let query, params;

    if (date_delivery && category_id !== null) {
      query = `UPDATE tasks
               SET title = $1, description = $2, status = $3, date_delivery = $4, category_id = $5
               WHERE id = $6
               RETURNING *`;
      params = [title, description, status, date_delivery, category_id, id];
    } else if (date_delivery) {
      query = `UPDATE tasks
               SET title = $1, description = $2, status = $3, date_delivery = $4
               WHERE id = $5
               RETURNING *`;
      params = [title, description, status, date_delivery, id];
    } else if (category_id !== null) {
      query = `UPDATE tasks
               SET title = $1, description = $2, status = $3, category_id = $4
               WHERE id = $5
               RETURNING *`;
      params = [title, description, status, category_id, id];
    } else {
      query = `UPDATE tasks
               SET title = $1, description = $2, status = $3
               WHERE id = $4
               RETURNING *`;
      params = [title, description, status, id];
    }

    const result = await db.query(query, params);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const result = await db.query(
      'DELETE FROM tasks WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTasksByUserId,
  getTaskById,
  updateTask,
  deleteTask
};
