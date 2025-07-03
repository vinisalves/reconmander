import { app, BrowserWindow } from "electron";
import * as path from "path";
import isDev from "electron-is-dev";
import { DbManager } from "./modules/Db/database.builder";
import "./modules/Workspace/workspace.ipc";

import { TerminalService } from "./modules/Terminal/terminal.service";
import TerminalIpc from "./modules/Terminal/terminal.ipc";

let mainWindow: BrowserWindow;

const db = DbManager.getInstance(
  path.join(__dirname, "../db_data", "reconmander.db")
);
db.initialize();

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  const urlLocation = isDev
    ? "http://localhost:5173"
    : `file://${path.join(__dirname, "../build/index.html")}`;
  mainWindow.loadURL(urlLocation);

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null!;
  });
}

app.whenReady().then(() => {
  createWindow();
  loadServices();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const loadServices = () => {
  new TerminalIpc().register();
};
