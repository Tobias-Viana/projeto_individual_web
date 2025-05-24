const db = require('../config/db');
const schema = require('../models/userModels');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

function validate(user) {
  const { error, value } = schema.validate(user);
  if (error) throw error;
  return value;
}

module.exports = {
  async create(user) {
    user = validate(user);
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [user.name, user.email, hashedPassword]
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

  async update(id, user) {
    user = validate(user);
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [user.name, user.email, id]
    );
    return result.rows[0];
  },

  async remove(id) {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id, name, email', [id]);
    return result.rows[0];
  },

  async findByEmailWithPassword(email) {
    const result = await db.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
};
