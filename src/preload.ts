import { contextBridge, ipcRenderer } from "electron";
import { TerminalInputDto } from "./modules/Terminal/dto/terminal-input.dto";
import { WorkspaceEntity } from "./modules/Workspace/workspace.entity";
import { CreateWorkspaceDto } from "./modules/Workspace/dtos/create-workspace.dto";
import { CreateTerminalDto } from "./modules/Terminal/dto/create-terminal.dto";
import { subscribe } from "diagnostics_channel";

contextBridge.exposeInMainWorld("workspaceApi", {
  getAll: () => ipcRenderer.invoke("workspace:getAll"),
  create: (ws: CreateWorkspaceDto) =>
    ipcRenderer.invoke("workspace:create", ws),
});

contextBridge.exposeInMainWorld("terminalIpc", {
  create: (createTerminalDto: CreateTerminalDto) => {
    return ipcRenderer.invoke("terminal:create", createTerminalDto);
  },

  sendInput: (terminalInputDto: TerminalInputDto) => {
    ipcRenderer.send("terminal:input", terminalInputDto);
  },
  onTerminalOutput: (
    callback: (data: { session: string; output: string }) => void
  ) => {
    ipcRenderer.on("terminal:output", (_event, data) => callback(data));
  },

  subscribe: (session: string) => {
    ipcRenderer.send("terminal:subscribe", session);
  },
});
