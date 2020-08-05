import express from "express";
import gradesRouter from "./routes/grades.js";
import { promises as fs } from "fs";

const folder = "./data";

const app = express();
app.use(express.json());

app.use("/grades", gradesRouter);

// Lê o arquivo e liga o server
app.listen(3000, async () => {
  try {
    await fs.readFile(`./${folder}/grades.json`);
  } catch (error) {
    console.log(error);
  }
  console.log("API Started");
});
