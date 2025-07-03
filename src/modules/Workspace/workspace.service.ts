import { randomUUID } from "crypto";
import { DbManager } from "../Db/database.builder";
import { WorkspaceEntity } from "./workspace.entity";
import Database from "better-sqlite3";
import { CreateWorkspaceDto } from "./dtos/create-workspace.dto";
export class WorkspaceService {
  private db: any;
  constructor() {
    this.db = DbManager.getInstance().getDatabase();
  }

  getAll(): Promise<WorkspaceEntity[]> {
    const stmt = this.db.prepare("SELECT * FROM workspaces");
    return Promise.resolve(stmt.all() as WorkspaceEntity[]);
  }

  create(workspace: CreateWorkspaceDto): Promise<WorkspaceEntity> {
    const stmt = this.db.prepare(
      "INSERT INTO workspaces (id, name, logo) VALUES (?, ?, ?)"
    );

    const result = stmt.run(randomUUID(), workspace.name, workspace.logo);
    if (result.changes > 0) {
      return Promise.resolve(workspace);
    } else {
      return Promise.reject(new Error("Failed to create workspace"));
    }
  }
}
