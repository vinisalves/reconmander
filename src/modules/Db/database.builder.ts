import Database from "better-sqlite3";

export class DbManager {
  private static instance: DbManager | null = null;
  private db: any;
  private constructor(dbPath: string) {
    this.db = new Database(dbPath, { verbose: console.log });
  }

  public static getInstance(dbPath?: string): DbManager {
    if (!DbManager.instance) {
      if (!dbPath) {
        throw new Error(
          "Database path must be provided for the first instance."
        );
      }
      DbManager.instance = new DbManager(dbPath);
    }
    return DbManager.instance;
  }

  public getDatabase(): any {
    return this.db;
  }

  public close(): void {
    this.db.close();
    DbManager.instance = null;
  }

  public initialize(): void {
    this.db.exec(`
            CREATE TABLE IF NOT EXISTS workspaces (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                logo TEXT DEFAULT '',
                createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
                updatedAt TEXT DEFAULT CURRENT_TIMESTAMP,            
                isArchived BOOLEAN DEFAULT FALSE
            );
        `);
  }
}
