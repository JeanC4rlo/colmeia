import express from "express";
import { taskRepository } from "#repositories/taskRepository.ts";

const router = express.Router();

router.get("/", async (_req, res) => {
    try {
        const tasks = await taskRepository.findAll();

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Erro ao listar tarefas." });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        const deadlineValue = deadline ? new Date(deadline) : new Date();

        if (Number.isNaN(deadlineValue.getTime())) {
            res.status(400).json({ message: "A data da tarefa é inválida." });
            return;
        }

        const newTask = await taskRepository.create({
            title: typeof title === "string" && title.trim()
                ? title.trim()
                : "Tarefa não nomeada",
            description: typeof description === "string" ? description : "",
            deadline: deadlineValue,
        });

        res.status(201).json(newTask);
    } catch (err) {
        console.error("Erro ao criar tarefa:", err);
        res.status(500).json({
            message: "Erro ao criar tarefa.",
        });
    }
});

export default router;
