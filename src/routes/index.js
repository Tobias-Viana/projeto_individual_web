const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const taskRoutes = require('./taskRoutes');
const categoryRoutes = require('./categoryRoutes');

// Exemplo de rota GET
router.get('/', (req, res) => {
  res.redirect('/users');
});

router.use('/users', userRoutes);
router.use('/task', taskRoutes);
router.use('/category', categoryRoutes);

module.exports = router;