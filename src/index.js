//Carregar a biblioteca do Express (Web)
import express from "express";
import swagger from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import swaggerfile from "./swagger-output.json" with { type: "json" };
import router from "./router/index.js";

//Inicializando a aplicação do Express
const app = express();

//Configurando o Express para trabalhar em modo 'json'
app.use(express.json());
app.use(router);

app.use("/docs", swagger.serve, swagger.setup(swaggerfile));

//Estrutura de dados para armazenar os clientes em memória
let clientes = [
  //array de objetos
  { id: 1, nome: "Ana Maria", email: "anamaria@gmail.com" },
  { id: 2, nome: "João Pedro", email: "joaopedro@gmail.com" },
];

// app.get("/api/clientes", (req, res) => {
//   //Retornar (response) todos os clientes cadastrados em formato JSON
//   res.json(clientes);
// });

app.get("/api/clientes/:id", (req, res) => {
  //Capturar o ID enviado no path da requisição (uri do endpoint)
  const id = parseInt(req.params.id);

  //Buscar o cliente pelo id
  const cliente = clientes.find((c) => c.id == id);

  //Verificando se o cliente não foi encontrado
  if (!cliente) {
    return res.status(404).json({
      mensagem: "Cliente não encontrado. Verifique o ID informado.",
    });
  }

  //Retornar os dado do cliente
  res.json(cliente);
});

app.post("/api/clientes", (req, res) => {
  //Capturar os dados recebidos do cliente
  const { nome } = req.body; //Nome do cliente
  const { email } = req.body; //Email do cliente

  //Criando um novo cliente
  const novoCliente = {
    id: clientes[clientes.length - 1].id + 1, //Id sequencial
    nome,
    email,
  };

  //Adicionando o cliente na lista / array
  clientes.push(novoCliente);

  //Retornar os dados do cliente cadastrado
  res.status(201).json(novoCliente);
});

app.put("/api/clientes/:id", (req, res) => {
  //Capturando o id enviado na URI (path) da requisição
  const id = parseInt(req.params.id);

  //Capturando o nome e email enviados no corpo da requisição
  const { nome } = req.body;
  const { email } = req.body;

  //Buscar o cliente pelo ID
  const cliente = clientes.find((c) => c.id == id);

  //Verificar se o cliente não foi encontrado
  if (!cliente) {
    return res.status(404).json({
      mensagem: "Cliente não encontrado para edição.",
    });
  }

  //Modificar os dados do cliente
  cliente.nome = nome;
  cliente.email = email;

  //Retornar os dados do cliente atualizado
  res.json(cliente);
});

app.delete("/api/clientes/:id", (req, res) => {
  // Capturar o ID enviado no path da URI
  const id = parseInt(req.params.id);

  //  Verificar se o cliente existe através do ID
  const existe = clientes.some((c) => c.id == id);

  if (!existe) {
    return res
      .status(404)
      .json({ mensagem: "Cliente não encontrado para exclusão" });
  }

  // Excluir o cliente
  clientes = clientes.filter((c) => c.id !== id);

  //retornar uma resposta
  res.json({
    mensagem: "Cliente excluído com sucesso.",
  });
});

const clientes_info = [
  { id: 1, Endereco: "Rua Dr Alfredo Backer329", Num: "154", CEP: "24452-001" },
  {
    id: 2,
    Endereco: "Avenida Jornalista Roberto Marinho",
    Num: "255",
    CEP: "24451-024",
  },
];

app.get("/api/clientes_info", (req, res) => {
  res.json(clientes_info);
});

//Executar o servidor da aplicação
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Swagger rodando em http://localhost:3000/docs");
});
