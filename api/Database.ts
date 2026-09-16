import { Pool } from "pg";
import "dotenv/config";

export class Database {
    private static database: Database | null = null;
    private pool: Pool;
    
    private constructor() {
        this.pool = new Pool({
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: Number(process.env.PGPORT)
        })
    }

    public static getInstance(): Database {
        if(!Database.database)
            Database.database = new Database();

        return Database.database;
    }

    public async query(text: string, params?: any[]) {
        try {
            const res = await this.pool.query(text, params);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }
}
