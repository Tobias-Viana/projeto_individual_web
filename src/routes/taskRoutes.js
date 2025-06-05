const { Router } = require('express');
const t = require('../controllers/taskController');

const r = Router();

r.post('/tasks', t.create);         
r.get('/tasks', t.list);            
r.get('/tasks/:id', t.detail);      
r.put('/tasks/:id', t.update);      
r.delete('/tasks/:id', t.remove);   

module.exports = r;