import { randomUUID } from "crypto";
import { TerminalEntity } from "./terminal.entity";

export class TerminalManager {
  private TERMINAL_SESSIONS = new Map<string, TerminalEntity>();

  register(terminal: TerminalEntity): string {
    console.info("new session created");
    const newSession = randomUUID();
    this.TERMINAL_SESSIONS.set(newSession, terminal);
    return newSession;
  }

  getSession(session: string): TerminalEntity {
    if (!this.TERMINAL_SESSIONS.has(session))
      throw new Error("Invalid session");

    const cachedSession = this.TERMINAL_SESSIONS.get(session);
    if (!cachedSession) throw new Error("Invalid session");

    return cachedSession;
  }

  killSession(session: string): void {
    try {
      const cachedSession = this.getSession(session);
      if (!cachedSession) throw new Error("Cannot Subscrive - Invalid Session");
      cachedSession.terminal.kill();
    } catch (error) {
      throw error;
    }
  }

  killAllSessions() {
    for (const session of this.TERMINAL_SESSIONS.values()) {
      session.terminal.kill();
    }
  }
}
