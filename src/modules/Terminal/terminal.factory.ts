import pty, { spawn } from "node-pty-prebuilt-multiarch";
import { TerminalEntity } from "./terminal.entity";
import { randomUUID } from "crypto";
import { CreateTerminalDto } from "./dto/create-terminal.dto";

export class TerminalFactory {
  create(createTerminalDto: CreateTerminalDto): TerminalEntity {
    const shell = process.platform === "win32" ? "cmd.exe" : "bash";

    console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrreeeeeeeee");
    const newTerminal = spawn(shell, [], {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: process.env.HOME || process.cwd(),
    });

    newTerminal.onExit(({ exitCode, signal }) => {
      console.log(
        `[Terminal  Exited with code: ${exitCode}, signal: ${signal}`
      );
      // You can add cleanup logic here
    });

    return {
      id: randomUUID(),
      workspace: {
        id: createTerminalDto.workspaceId,
        name: "testt",
      },
      terminal: newTerminal,
    };
  }
}
