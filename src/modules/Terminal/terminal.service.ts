import { CreateTerminalDto } from "./dto/create-terminal.dto";
import { TerminalInputDto } from "./dto/terminal-input.dto";
import { TerminalFactory } from "./terminal.factory";
import { TerminalManager } from "./terminal.manager";

export class TerminalService {
  constructor(
    private readonly terminalFactory = new TerminalFactory(),
    private readonly terminalManager = new TerminalManager()
  ) {}

  create(createTerminalDto: CreateTerminalDto) {
    try {
      const terminal = this.terminalFactory.create(createTerminalDto);
      const session = this.terminalManager.register(terminal);
      return { session };
    } catch (error) {
      console.error("Failed to create terminal:", error);
      return { error: "Failed to create terminal" };
    }
  }

  input(dto: TerminalInputDto): void {
    console.log(dto.input);
    const session = this.terminalManager.getSession(dto.session);
    if (!session) throw new Error("Cannot Input - Invalid session");
    if (session?.terminal) {
      session.terminal.write(dto.input);
    }
  }

  Kill(session: string) {
    return this.terminalManager.killSession(session);
  }
  killAll(): void {
    this.terminalManager.killAllSessions();
  }

  subscribe(event: Electron.IpcMainEvent, session: string) {
    console.log("******************************************* subscribe");
    const cachedSession = this.terminalManager.getSession(session);

    if (!cachedSession) throw new Error("Cannot Subscrive - Invalid Session");
    if (!cachedSession.terminal) throw new Error("Invalid Terminal");
    if (cachedSession?.terminal) {
      console.log("****************************************** subscribed");
      cachedSession.terminal.onData((data) => {
        console.log("ondata", data);
        event.sender.send("terminal:output", { session, output: data });
      });
    }
  }
}
