const { Router } = require('express');
const c = require('../controllers/categoryController');

const r = Router();

r.get('/', c.getAllCategories);         
r.get('/:id', c.getCategoryById);      
r.post('/', c.createCategory);         
r.put('/:id', c.updateCategory);       
r.delete('/:id', c.deleteCategory);   

module.exports = r;
