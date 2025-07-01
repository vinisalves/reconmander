import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("workspaceAPI", {
  getAll: () => ipcRenderer.invoke("workspace:getAll"),
  create: (ws: any) => ipcRenderer.invoke("workspace:create", ws),
});
