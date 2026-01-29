"use strict";

import readline from 'node:readline';

export function hideCursor() {
  process.stdout.write('\u001B[?25l');
}

export function showCursor() {
  process.stdout.write('\u001B[?25h');
}

export function offsetConsoleLog(message, offset) {
  readline.moveCursor(process.stdout, 0, -offset);

  readline.clearLine(process.stdout, 0);

  readline.cursorTo(process.stdout, 0);

  process.stdout.write(message);

  readline.moveCursor(process.stdout, 0, offset);

  readline.cursorTo(process.stdout, 0);
}
