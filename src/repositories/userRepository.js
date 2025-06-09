const db = require('../config/db');
const schema = require('../models/userModels');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function validate(users) {
  const { error, value } = schema.validate(users);
  if (error) throw error;
  return value;
}

module.exports = {
  async create(users) {
    users = validate(users);
    const hashedPassword = await bcrypt.hash(users.password, SALT_ROUNDS);
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [users.name, users.email, hashedPassword]
    );
    return result.rows[0];
  },

  async findAll() {
    const result = await db.query('SELECT id, name, email FROM users');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },

  async update(id, users) {
    users = validate(users);
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [users.name, users.email, id]
    );
    return result.rows[0];
  },

  async remove(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id, name, email', [id]);
    return result.rows[0];
  },

  async findByEmailWithPassword(email) {
    const result = await db.query('SELECT id, name, email, password FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
};
