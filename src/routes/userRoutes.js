const { Router } = require('express');
const u = require('../controllers/userController');
const r = Router();

r.get('/users', u.list);
r.get('/users/:id', u.detail);
r.post('/users', u.create);
r.put('/users/:id', u.update);
r.delete('/users/:id', u.remove);
r.post('/login', u.login);

module.exports = r;