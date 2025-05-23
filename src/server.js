const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// rota raiz devolve a página de documentação
app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname, "views", "docs.html"))
);

// registra rotas de API
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/taskRoutes"));
app.use("/api", require("./routes/categoryRoutes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Servidor escutando em http://localhost:${PORT}`)
);

module.exports = app;