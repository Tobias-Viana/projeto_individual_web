const express = require('express');
const r = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const categoryRoutes = require('./categoryRoutes');

// Exemplo de rota GET
r.get('/', (req, res) => {
  res.redirect('/users');
});

r.use('/users', userRoutes);
r.use('/task', taskRoutes);
r.use('/category', categoryRoutes);

module.exports = r;