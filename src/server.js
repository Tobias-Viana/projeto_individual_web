const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Configurar EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Rotas de views
app.get("/", (req, res) => res.render("index"));
app.get("/tasks", async (req, res) => {
  try {
    const taskService = require('./services/taskService');
    const tasks = await taskService.getAllTasks();
    res.render("tasks", { tasks });
  } catch (error) {
    res.render("tasks", { tasks: [], error: error.message });
  }
});
app.get("/tasks/create", (req, res) => res.render("create-task"));
app.get("/tasks/edit/:id", async (req, res) => {
  try {
    const taskService = require('./services/taskService');
    const task = await taskService.getTaskById(req.params.id);
    if (!task) {
      return res.redirect('/tasks');
    }
    res.render("edit-task", { task });
  } catch (error) {
    res.redirect('/tasks');
  }
});

// Rota para documentação
app.get("/docs", (_, res) => 
  res.sendFile(path.join(__dirname, "views", "docs.html"))
);

// Registra rotas de API
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/taskRoutes"));
app.use("/api", require("./routes/categoryRoutes"));

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor escutando em http://localhost:${PORT}`)
);

module.exports = app;
