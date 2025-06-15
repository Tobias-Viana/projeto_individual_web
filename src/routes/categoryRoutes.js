const { Router } = require('express');
const c = require('../controllers/categoryController');
const r = Router();

r.post('/category', c.createCategory);
r.get('/category', c.listCategories);
r.get('/category/:id', c.getCategoryById);
r.put('/category/:id', c.updateCategory);
r.delete('/category/:id', c.deleteCategory);

module.exports = r;
