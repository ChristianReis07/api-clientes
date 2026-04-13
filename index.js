// Carregar biblioteca do Express (web)
const express = require("express");

// Inicializando a aplicação
const app = express();

// Rota padrão no navegador para exibir um Hello World
app.get("/", (req, res) => {
  res.send("Hello World! I'm a Node JS application.");
});

// Executar o srevidor da aplicação
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
