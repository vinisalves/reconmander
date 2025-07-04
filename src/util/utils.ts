const ANSI_COLORS = {
  reset: "\x1b[0m",

  // Regular colors
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",

  // Bright colors
  brightBlack: "\x1b[90m",
  brightRed: "\x1b[91m",
  brightGreen: "\x1b[92m",
  brightYellow: "\x1b[93m",
  brightBlue: "\x1b[94m",
  brightMagenta: "\x1b[95m",
  brightCyan: "\x1b[96m",
  brightWhite: "\x1b[97m",

  // Bold + colors
  bold: "\x1b[1m",
  boldRed: "\x1b[1;31m",
  boldGreen: "\x1b[1;32m",
  boldYellow: "\x1b[1;33m",
  boldBlue: "\x1b[1;34m",
  boldMagenta: "\x1b[1;35m",
  boldCyan: "\x1b[1;36m",
  boldWhite: "\x1b[1;37m",

  // Underline (optional)
  underline: "\x1b[4m",
};

const highlightWord = (
  ln: string,
  word: string,
  colorCode: keyof typeof ANSI_COLORS
) => {
  const words = ln.split("");
};
