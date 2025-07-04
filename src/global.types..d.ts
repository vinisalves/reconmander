import type { CreateTerminalDto } from "./modules/Terminal/dto/create-terminal.dto";
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
    workspaceApi: EntityApiInterface<WorkspaceEntity>;
    terminalIpc: {
      create: (dto: CreateTerminalDto) => Promise<any>;
      sendInput: (dto: TerminalInputDto) => void;
      subscribe: (session: string) => void;
      removeListener: (
        callback: (event: any, dto: TerminalInputDto) => void
      ) => void;
      onTerminalOutput: (
        callback: (data: { session: string; output: string }) => void
      ) => void;
    };
  }
}
