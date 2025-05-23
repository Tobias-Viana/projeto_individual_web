const { Router } = require('express');
const u = require('../controllers/userController');

const r = Router();

r.get('/', u.getAllUsers);
r.get('/:id', u.getUserById);
r.post('/', u.createUser);
r.put('/:id', u.updateUser);
r.delete('/:id', u.deleteUser);
r.post('/login', u.loginUser);

module.exports = r;