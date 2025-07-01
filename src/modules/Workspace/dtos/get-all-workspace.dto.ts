import { WorkspaceEntity } from "../workspace.entity";

export class GetAllWorkspaceDto {
  workspaces: WorkspaceEntity[];

  constructor(workspaces: WorkspaceEntity[]) {
    this.workspaces = workspaces;
  }
}
