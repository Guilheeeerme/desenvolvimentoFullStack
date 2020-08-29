import { accountModel } from "../models/accountModel.js";

const deposito = async (req, res) => {
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
};

const saque = async (req, res) => {
  const { agencia, conta, balance } = req.body;
  if (!agencia || !conta || !balance) {
    return res.status(400).send("Parâmetros inválidos");
  }

  try {
    const data = await accountModel.findOne({ agencia, conta });
    if (!data) {
      res.status(404).send("Conta inexistente");
    }
    const newBalance = (data.balance -= balance) - 1;
    if (newBalance < 0) {
      return res.status(400).send("Saldo insuficiente");
    }
    data.balance = newBalance;
    await data.save();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const saldo = async (req, res) => {
  const { agencia, conta } = req.body;
  if (!agencia || !conta) {
    return res.status(400).send("Parâmetros inválidos");
  }

  try {
    const data = await accountModel.findOne({ agencia, conta });
    if (!data) {
      res.status(404).send("Conta inexistente");
    }
    res.send(`Balance: R$ ${data.balance}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const excluir = async (req, res) => {
  const { agencia, conta } = req.body;
  if (!agencia || !conta) {
    return res.status(400).send("Parâmetros inválidos");
  }

  try {
    const data = await accountModel.findOneAndDelete({ agencia, conta });
    if (!data) {
      res.status(404).send("Conta inexistente");
    }
    const contasAtivas = await accountModel.find({ agencia });
    res.send(contasAtivas);
  } catch (error) {
    res.status(500).send(error);
  }
};

const transferir = async (req, res) => {
  const { accOrigem, accDestino, valor } = req.body;
  if (!accOrigem || !accDestino || !valor) {
    return res.status(400).send("Parâmetros inválidos");
  }

  const findAccOrigem = await accountModel.findOne({ conta: accOrigem });
  const findAccDestino = await accountModel.findOne({ conta: accDestino });

  if (findAccOrigem.agencia !== findAccDestino.agencia) {
    findAccOrigem.balance -= 8;
  }

  findAccOrigem.balance -= valor;
  findAccDestino.balance += valor;

  await findAccOrigem.save();
  await findAccDestino.save();
  res.send(findAccOrigem);
};

export default { deposito, saque, saldo, excluir, transferir };
