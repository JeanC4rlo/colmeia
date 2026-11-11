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

        const titleValue = title || null;
        const descriptionValue = description || null;
        const deadlineValue = deadline || null;

        const newTask = await taskRepository.create({
            title: titleValue,
            description: descriptionValue,
            deadline: deadlineValue,
        });

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Erro ao criar tarefa.",
        });
    }
});

export default router;
