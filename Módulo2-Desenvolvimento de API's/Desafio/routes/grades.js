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

// Endpoint - Buscar grade (exercicio 4)
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = JSON.parse(await fs.readFile(global.fileName, "utf8"));
    const grade = data.grades.find((grade) => grade.id == id);
    if (grade) {
      res.send(grade);
    } else {
      throw new Error("ID não existente");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Endpoint - Consultar notal total de todas as notas (exercicio 5)
// Post pega no body, GET via url
router.post("/total", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName, "utf8"));

    const { student, subject } = req.body;
    const grades = data.grades.filter(
      (grade) => grade.student === student && grade.subject === subject
    );

    const total = grades.reduce((prev, curr) => {
      return prev + curr.value;
    }, 0);
    res.send({ total });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Endpoint - Consultar média das grades de um determinado subject e type (exercicio 6)
router.get("/average/:subject/:type", async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(global.fileName, "utf8"));

    const { subject, type } = req.params;
    const grades = data.grades.filter(
      (grade) => grade.subject === subject && grade.type === type
    );

    if (!grades.length) {
      throw new Error(
        "Não foram encotrados registros para os parâmetros informados"
      );
    }
    const total = grades.reduce((prev, curr) => {
      return prev + curr.value;
    }, 0);
    res.send({ average: total / grades.length });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
