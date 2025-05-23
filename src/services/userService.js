const db = require('../config/db');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const sql = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email';
  const result = await db.query(sql, [name, email, hashedPassword]);
  return result.rows[0];
}

async function getAllUsers() {
  const result = await db.query('SELECT id, name, email FROM users');
  return result.rows;
}

async function getUserById(id) {
  const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

async function updateUser(id, name, email) {
  const sql = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email';
  const result = await db.query(sql, [name, email, id]);
  return result.rows[0];
}

async function deleteUser(id) {
  const user = await getUserById(id);
  await db.query('DELETE FROM users WHERE id = $1', [id]);
  return user;
}

async function verifyUserPassword(email, password) {
  const result = await db.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;

  return { id: user.id, name: user.name, email: user.email };
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  verifyUserPassword,
};
