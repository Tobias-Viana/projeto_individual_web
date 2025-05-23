const { Router } = require('express');
const t = require('../controllers/taskController');

const r = Router();

// Rotas para o CRUD de tarefas
r.post('/task', t.createTask);
r.get('/task', t.listTask);
r.put('/task/:id', t.editTask);
r.delete('/task/:id', t.deleteTask);

module.exports = r;