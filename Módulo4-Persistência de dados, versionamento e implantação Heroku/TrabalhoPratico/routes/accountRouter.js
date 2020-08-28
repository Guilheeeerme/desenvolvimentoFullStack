import express from "express";
import { accountModel } from "../models/accountModel.js";

const app = express();

app.put("/deposito", async (req, res) => {
  const { agencia, conta, balance } = req.body;
  if (!agencia || !conta || !balance) {
    return res.status(400).send("Parâmetros inválidos");
  }

  try {
    const data = await accountModel.findOne({ agencia, conta });
    if (!data) {
      res.status(404).send("Conta inexistente");
    }
    data.balance += balance;
    await data.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { app as accountRouter };
