import express from "express";
import { Database } from "../Database";

const router = express.Router();
const db = Database.getInstance();

router.get("/", async (_req, res) => {
    try {
        const tasks = await db.query(`
            SELECT *
            FROM tasks
            WHERE is_deleted = FALSE
            ORDER BY created_at DESC;
        `);

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Erro ao listar tarefas." });
    }
});

router.post("/create", async (req, res) => {
    try {
        const { title, description, status, deadline } = req.body;

        const titleValue = title || null;
        const descriptionValue = description || null;
        const statusValue = status || "PENDING";
        const deadlineValue = deadline || null;

        const newTask = await db.query(`
            INSERT INTO tasks (title, description, status, deadline) 
            VALUES ($1, $2, $3, $4) RETURNING *;
        `, [titleValue, descriptionValue, statusValue, deadlineValue]);

        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({
            error: err,
            message: "Erro ao criar tarefa."
        });
    }
})

export default router;
