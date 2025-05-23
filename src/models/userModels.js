const db = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const getAllUsers = async () => {
  const result = await db.query('SELECT id, name, email FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (name, email, password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await db.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

const updateUser = async (id, name, email) => {
  const result = await db.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
    [name, email, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id, name, email', [id]);
  return result.rows[0];
};

const verifyUserPassword = async (email, password) => {
  const result = await db.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return { id: user.id, name: user.name, email: user.email };
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUserPassword,
};
