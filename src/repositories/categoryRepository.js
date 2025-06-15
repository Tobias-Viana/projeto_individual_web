const db = require('../config/db');

const listCategories = async () => {
  const result = await db.query('SELECT id, name, description FROM category');
  return result.rows;
};

const getCategoryById = async (id) => {
  const result = await db.query('SELECT id, name, description FROM category WHERE id = $1', [id]);
  return result.rows[0];
};

const createCategory = async (name, description) => {
  const result = await db.query(
    'INSERT INTO category (name, description) VALUES ($1, $2) RETURNING id, name, description',
    [name, description]
  );
  return result.rows[0];
};

const updateCategory = async (id, name, description) => {
  const result = await db.query(
    'UPDATE category SET name = $1, description = $2 WHERE id = $3 RETURNING id, name, description',
    [name, description, id]
  );
  return result.rows[0];
};

const deleteCategory = async (id) => {
  const result = await db.query(
    'DELETE FROM category WHERE id = $1 RETURNING id, name, description',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
