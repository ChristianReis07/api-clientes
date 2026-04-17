import { Router } from "express";

const clientes = [
  //array de objetos
  { id: 1, nome: "Ana Maria", email: "anamaria@gmail.com" },
  { id: 2, nome: "João Pedro", email: "joaopedro@gmail.com" },
];

const clienteController = {
  get: (req, res) => {
    //Retornar (response) todos os clientes cadastrados em formato JSON
    res.json(clientes);
  },
};

const router = Router();
router.get("/teste", (req, res) => res.json({ msg: "Funcionando" }));
router.get("/api/clientes", clienteController.get);

export default router;
