import { WorkspaceEntity } from "./modules/Workspace/workspace.entity";

export interface EntityApiInterface<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
}

declare global {
  interface Window {
    workspaceAPI: EntityApiInterface<WorkspaceEntity>;
  }
}
