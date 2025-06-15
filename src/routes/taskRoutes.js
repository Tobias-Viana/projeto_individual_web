const { Router } = require('express');
const t = require('../controllers/taskController');
const r = Router();

r.post('/tasks', t.create);
r.get('/tasks', t.list);
r.get('/tasks/user/:userId', t.listByUser);
r.get('/tasks/:id', t.detail);
r.put('/tasks/:id', t.update);
r.delete('/tasks/:id', t.delete);

module.exports = r;