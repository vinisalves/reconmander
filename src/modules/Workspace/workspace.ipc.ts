// main/workspace.ipc.ts
import { app, ipcMain } from "electron";
import { WorkspaceService } from "./workspace.service";
import { CreateWorkspaceDto } from "./dtos/create-workspace.dto";

app.whenReady().then(() => {
  const workspaceService = new WorkspaceService();
  ipcMain.handle("workspace:getAll", async () => {
    return workspaceService.getAll();
  });

  ipcMain.handle(
    "workspace:create",
    async (_event, workspace: CreateWorkspaceDto) => {
      console.log("Electrion - Creating workspace via IPC API", workspace);
      return workspaceService.create(workspace);
    }
  );
});
