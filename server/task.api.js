const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/task", async (req, res) => {
  const tasks = await prisma.task.findMany();
  res.send(tasks);
});

app.get("/task/:id", async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send(task);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/task", async (req, res) => {
  try {
    const task = await prisma.task.create({
      data: req.body,
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.put("/task/:id", async (req, res) => {
  try {
    const task = await prisma.task.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });
    res.status(200).send(task);
  } catch (error) {
    res.send(error.message);
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const task = await prisma.task.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// listen port 3030
app.listen(3030, () => {
  console.log("Server is running on port 3030");
});
