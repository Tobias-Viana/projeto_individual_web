
const path = require("path");
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const express = require("express");
const cors = require("cors");
const { pool } = require("./config/db");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, "public")));

app.use(async (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    try {
      const client = await pool.connect();
      client.release();
      next();
    } catch (err) {
      console.error('Erro de conexão com o banco:', err.message);
      return res.status(503).json({ 
        error: "Serviço temporariamente indisponível. Tente novamente mais tarde.",
        details: "Não foi possível conectar ao banco de dados."
      });
    }
  } else {
    next();
  }
});

app.get("/login", (req, res) => res.render("login"));
app.get("/register", (req, res) => res.redirect("/login"));
app.get("/", (req, res) => res.render("index"));

app.get("/tasks", async (req, res) => {
  try {
    res.render("tasks", { tasks: [] });
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

app.get("/categories", async (req, res) => {
  try {
    res.render("categories", { categories: [] });
  } catch (error) {
    res.render("categories", { categories: [], error: error.message });
  }
});



app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/taskRoutes"));
app.use("/api", require("./routes/categoryRoutes"));
app.use("/api", require("./routes/taskCategoryRoutes"));

app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND') {
    return res.status(503).json({ 
      error: "Serviço temporariamente indisponível. Tente novamente mais tarde.",
      details: "Problema de conexão com o banco de dados."
    });
  }
  
  res.status(500).json({ error: "Erro interno do servidor" });
});

app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    res.status(404).json({ error: "Rota não encontrada" });
  } else {
    res.status(404).render("404");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor escutando em http://localhost:${PORT}`)
);

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

module.exports = app;
