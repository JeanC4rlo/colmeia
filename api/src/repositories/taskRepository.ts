import prismaClient from "#database/prismaClient.ts";
import { DBClient } from "#types/database/database.types.ts";
import { CreateTaskDTO } from "#types/task/task.types.ts";
import createCrudRepository from "#utils/helpers/createCrudRepository.ts";
import { Task } from "@prisma/client";

export function createTaskRepository(client: DBClient = prismaClient) {
    return {
        ...createCrudRepository<
            Task,
            { create: CreateTaskDTO },
            string,
            "update"
        >(client.task),

        async findAll() {
            client.task.findMany({
                where: { isDeleted: false },
                orderBy: { createdAt: "desc" },
            });
        },
    };
}

export const taskRepository = createTaskRepository();
