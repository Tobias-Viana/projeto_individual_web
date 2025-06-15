const { Router } = require('express');
const tc = require('../controllers/taskCategoryController');
const r = Router();

r.post('/task-categories', tc.create);
r.get('/task-categories/user/:userId', tc.listByUser);
r.get('/task-categories/:id', tc.detail);
r.put('/task-categories/:id', tc.update);
r.delete('/task-categories/:id', tc.delete);

r.get('/tasks-with-categories/user/:userId', tc.getTasksWithCategories);

module.exports = r;
