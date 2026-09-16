export async function up(client) {
  await client.query(`
    CREATE OR REPLACE FUNCTION update_modtime_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);

  await client.query(`
    CREATE TYPE status_enum AS ENUM('PENDING', 'DONE', 'NOT_DONE');
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title VARCHAR(100),
      description TEXT,
      deadline TIMESTAMP,
      status status_enum DEFAULT 'PENDING',
      is_deleted BOOLEAN DEFAULT FALSE,

      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE OR REPLACE TRIGGER update_tasks_modtime
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_modtime_column();
  `);
}

export async function down(client) {
  await client.query(`DROP TRIGGER IF EXISTS update_tasks_modtime ON tasks`)
  await client.query(`DROP FUNCTION IF EXISTS update_modtime_column();`)
  await client.query(`DROP TABLE IF EXISTS tasks;`);
}
