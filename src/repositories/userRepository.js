const db = require('../config/db');

const create = async (userData) => {
  try {
    const result = await db.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [userData.name, userData.email, userData.password]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};

const findByEmailWithPassword = async (email) => {
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar usuário por email com senha:', error);
    throw error;
  }
};

const findByEmail = async (email) => {
  try {
    const result = await db.query('SELECT id, name, email FROM users WHERE email = $1', [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    throw error;
  }
};

const findById = async (id) => {
  try {
    const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT id, name, email FROM users');
    return result.rows;
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    throw error;
  }
};

const updateUser = async (id, name, email) => {
  try {
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING id, name, email',
      [name, email, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

module.exports = {
  create,
  findByEmailWithPassword,
  findByEmail,
  findById,
  getAllUsers,
  updateUser,
  deleteUser
};
