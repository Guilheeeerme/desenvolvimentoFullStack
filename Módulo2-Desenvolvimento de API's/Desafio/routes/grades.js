import express from "express";
import { promises as fs } from "fs";
const router = express.Router();

const folder = "./data";

// Endpoint - Criar grade (exercicio 1)
// prettier-ignore
router.post("/create", async (req, res) => {
  try {
    let gradeAdd = req.body;
    const data = JSON.parse(await fs.readFile(`./${folder}/grades.json`));

    gradeAdd.id = data.nextId++;
    gradeAdd.timestamp = new Date();

    const { id, student, subject, type, value, timestamp } = gradeAdd;
    data.grades.push({ id, student, subject, type, value, timestamp });

    await fs.writeFile(`./${folder}/grades.json`, JSON.stringify(data, null, 2)); 

    res.send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Endpoint - Atualizar grade (exercicio 2)
// prettier-ignore
router.put("/update/:id", async(req, res) => {
  const {id} = req.params;
  const { student, subject, type, value } = req.body;
  const data = JSON.parse(await fs.readFile(`./${folder}/grades.json`));
  const index = data.grades.findIndex(item => item.id == id);

  if (index < 0 ) {
    return res.status(400).json({ error: "User not found"});
  }

  const newObject = { id: index, student, subject, type, value, timestamp: data.grades[index].timestamp };

  data.grades[index] = {...newObject }

  await fs.writeFile(`./${folder}/grades.json`, JSON.stringify(data, null, 2));
  res.send(newObject)
})

// Endpoint - Excluir grade (exercicio 3)
// prettier-ignore
router.delete("/delete/:id", async(req, res) => {
  const {id} = req.params;
  const data = JSON.parse(await fs.readFile(`./${folder}/grades.json`));
  const index = data.grades.findIndex(item => item.id == id);

  data.grades.splice(index, 1);

  await fs.writeFile(`./${folder}/grades.json`, JSON.stringify(data, null, 2));
  res.send(data)
})

export default router;
