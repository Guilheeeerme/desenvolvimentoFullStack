import express from "express";
import accountController from "../controllers/accountController.js";

const app = express();

app.put("/deposito", accountController.deposito);

app.put("/saque", accountController.saque);

app.get("/saldo", accountController.saldo);

app.delete("/excluir", accountController.excluir);

export { app as accountRouter };
