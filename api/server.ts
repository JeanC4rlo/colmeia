import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js"; 
import "dotenv/config";

const PORT = 5000;

const app = express();
const allowedOrigin = process.env.VITE_URL || "http://localhost:5173";
const corsOptions = {
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

const apiRouter = express.Router();
apiRouter.use("/tasks", taskRoutes);

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`\x1b[36m[express]\x1b[0m Servidor Express rodando em http://localhost:${PORT}`);
});
