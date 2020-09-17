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
// prettier-ignore
router.put("/update/:id", async(req, res) => {
  const {id} = req.params;
  const { student, subject, type, value } = req.body;
  const data = JSON.parse(await fs.readFile(global.fileName));
  const index = data.grades.findIndex(item => item.id == id);

  if (index < 0 ) {
    return res.status(400).json({ error: "User not found"});
  }

  const newObject = { id: index, student, subject, type, value, timestamp: data.grades[index].timestamp };

  data.grades[index] = {...newObject }

  await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
  res.send(newObject)
})

// Endpoint - Excluir grade (exercicio 3)
// prettier-ignore
router.delete("/delete/:id", async(req, res) => {
  const {id} = req.params;
  const data = JSON.parse(await fs.readFile(global.fileName));
  const index = data.grades.findIndex(item => item.id == id);

  data.grades.splice(index, 1);

  await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
  res.send(data)
})

export default router;
