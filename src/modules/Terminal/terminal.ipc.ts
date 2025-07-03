import { app, ipcMain } from "electron";
import { TerminalFactory } from "./terminal.factory";
import type { TerminalEntity } from "./terminal.entity";
import { TerminalManager } from "./terminal.manager";
import { TerminalInputDto } from "./dto/terminal-input.dto";
import { TerminalService } from "./terminal.service";
import { CreateTerminalDto } from "./dto/create-terminal.dto";

export default class TerminalIpc {
  private readonly terminalFactory = new TerminalFactory();
  private readonly terminalManager = new TerminalManager();
  private readonly terminalService = new TerminalService(
    this.terminalFactory,
    this.terminalManager
  );
  register() {
    ipcMain.handle(
      "terminal:create",
      async (_event, dto: CreateTerminalDto) => {
        return this.terminalService.create(dto);
      }
    );

    ipcMain.on("terminal:input", (_event, dto: TerminalInputDto) => {
      return this.terminalService.input(dto);
    });

    ipcMain.on("terminal:subscribe", (event, session: string) => {
      return this.terminalService.subscribe(event, session);
    });

    ipcMain.on("terminal:kill", (_event, session: string) => {
      return this.terminalService.Kill(session);
    });

    ipcMain.on("terminal:kill-all", (_event) => {
      return this.terminalService.killAll();
    });

    // Cleanup on quit
    process.on("beforeExit", () => {});
  }
}
