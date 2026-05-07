"use strict";

import { cursorTo, clearLine, moveCursor } from 'node:readline';

const { stdout } = process;

export function hideCursor() {
  stdout.write('\u001B[?25l');
}

export function showCursor() {
  stdout.write('\u001B[?25h');
}

export function offsetConsoleLog(message, offset) {
  moveCursor(stdout, 0, -offset);

  clearLine(stdout, 0);

  cursorTo(stdout, 0);

  stdout.write(message);

  moveCursor(stdout, 0, offset);

  cursorTo(stdout, 0);
}
