import { IPty } from "node-pty-prebuilt-multiarch";
import { WorkspaceEntity } from "../Workspace/workspace.entity";

export type TerminalEntity = {
  id: string;
  terminal: IPty;
  workspace: WorkspaceEntity;
};
