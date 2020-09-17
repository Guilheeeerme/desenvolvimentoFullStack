import express from "express";
import { promises as fs } from "fs";

const router = express.Router();

// Endpoint - Criar grade (exercicio 1)
router.post("/", async (req, res) => {
  let gradeAdd = req.body;
  try {
    const data = JSON.parse(await fs.readFile(global.fileName, "utf8"));

    gradeAdd = { id: data.nextId++, timestamp: new Date(), ...gradeAdd };
    data.grades.push(gradeAdd);

    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(gradeAdd);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Endpoint - Atualizar grade (exercicio 2)
router.put("/", async (req, res) => {
  let updateGrade = req.body;
  try {
    const data = JSON.parse(await fs.readFile(global.fileName, "utf8"));
    const index = data.grades.findIndex((grade) => grade.id == updateGrade.id);

    // O ideal é fazer validações...
    data.grades[index] = updateGrade;

    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(updateGrade);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Endpoint - Excluir grade (exercicio 3)
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = JSON.parse(await fs.readFile(global.fileName, "utf8"));
    const index = data.grades.findIndex((grade) => grade.id == id);

    data.grades.splice(index, 1);

    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
