const db = require('../config/db');

const createCategory = async (name, description, color, users_id) => {
  try {
    const result = await db.query(
      `INSERT INTO user_task_categories (name, description, color, users_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, description, color, users_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    throw error;
  }
};

const getCategoriesByUserId = async (users_id) => {
  try {
    const result = await db.query(
      'SELECT * FROM user_task_categories WHERE users_id = $1 ORDER BY name ASC',
      [users_id]
    );
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar categorias do usuário:', error);
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM user_task_categories WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar categoria por ID:', error);
    throw error;
  }
};

const updateCategory = async (id, name, description, color) => {
  try {
    const result = await db.query(
      `UPDATE user_task_categories
       SET name = $1, description = $2, color = $3
       WHERE id = $4
       RETURNING *`,
      [name, description, color, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    const result = await db.query(
      'DELETE FROM user_task_categories WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    throw error;
  }
};

const getTasksWithCategories = async (users_id) => {
  try {
    const result = await db.query(
      `SELECT t.*, tc.name as category_name, tc.color as category_color
       FROM tasks t
       LEFT JOIN user_task_categories tc ON t.category_id = tc.id
       WHERE t.users_id = $1
       ORDER BY t.date_creation DESC`,
      [users_id]
    );
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar tarefas com categorias:', error);
    throw error;
  }
};

module.exports = {
  createCategory,
  getCategoriesByUserId,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getTasksWithCategories
};
