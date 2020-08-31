import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import { accountRouter } from "./routes/accountRouter.js";

// IIFE, conexão
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7yv1z.gcp.mongodb.net/Bootcamp?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
    console.log("Conectado ao MongoDB Atlas");
  } catch (error) {
    console.log("Erro ao conectador ao MongoDB Atlas" + error);
  }
})();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(process.env.PORT, () => console.log("API Started"));
