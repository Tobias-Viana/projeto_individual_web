const { Router } = require('express');
const taskController = require('../controllers/taskController');
const router = Router();

// Padronizar todas as rotas para /tasks
router.post('/tasks', taskController.create);
router.get('/tasks', taskController.list);
router.get('/tasks/:id', taskController.detail);
router.put('/tasks/:id', taskController.update);
router.delete('/tasks/:id', taskController.remove);

module.exports = router;