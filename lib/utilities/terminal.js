"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get hideCursor () {
        return hideCursor;
    },
    get offsetConsoleLog () {
        return offsetConsoleLog;
    },
    get showCursor () {
        return showCursor;
    }
});
const _nodereadline = require("node:readline");
const { stdout } = process;
function hideCursor() {
    stdout.write('\u001B[?25l');
}
function showCursor() {
    stdout.write('\u001B[?25h');
}
function offsetConsoleLog(message, offset) {
    (0, _nodereadline.moveCursor)(stdout, 0, -offset);
    (0, _nodereadline.clearLine)(stdout, 0);
    (0, _nodereadline.cursorTo)(stdout, 0);
    stdout.write(message);
    (0, _nodereadline.moveCursor)(stdout, 0, offset);
    (0, _nodereadline.cursorTo)(stdout, 0);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvdGVybWluYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IGN1cnNvclRvLCBjbGVhckxpbmUsIG1vdmVDdXJzb3IgfSBmcm9tICdub2RlOnJlYWRsaW5lJztcblxuY29uc3QgeyBzdGRvdXQgfSA9IHByb2Nlc3M7XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWRlQ3Vyc29yKCkge1xuICBzdGRvdXQud3JpdGUoJ1xcdTAwMUJbPzI1bCcpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0N1cnNvcigpIHtcbiAgc3Rkb3V0LndyaXRlKCdcXHUwMDFCWz8yNWgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldENvbnNvbGVMb2cobWVzc2FnZSwgb2Zmc2V0KSB7XG4gIG1vdmVDdXJzb3Ioc3Rkb3V0LCAwLCAtb2Zmc2V0KTtcblxuICBjbGVhckxpbmUoc3Rkb3V0LCAwKTtcblxuICBjdXJzb3JUbyhzdGRvdXQsIDApO1xuXG4gIHN0ZG91dC53cml0ZShtZXNzYWdlKTtcblxuICBtb3ZlQ3Vyc29yKHN0ZG91dCwgMCwgb2Zmc2V0KTtcblxuICBjdXJzb3JUbyhzdGRvdXQsIDApO1xufVxuIl0sIm5hbWVzIjpbImhpZGVDdXJzb3IiLCJvZmZzZXRDb25zb2xlTG9nIiwic2hvd0N1cnNvciIsInN0ZG91dCIsInByb2Nlc3MiLCJ3cml0ZSIsIm1lc3NhZ2UiLCJvZmZzZXQiLCJtb3ZlQ3Vyc29yIiwiY2xlYXJMaW5lIiwiY3Vyc29yVG8iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQU1nQkE7ZUFBQUE7O1FBUUFDO2VBQUFBOztRQUpBQztlQUFBQTs7OzhCQVJnQztBQUVoRCxNQUFNLEVBQUVDLE1BQU0sRUFBRSxHQUFHQztBQUVaLFNBQVNKO0lBQ2RHLE9BQU9FLEtBQUssQ0FBQztBQUNmO0FBRU8sU0FBU0g7SUFDZEMsT0FBT0UsS0FBSyxDQUFDO0FBQ2Y7QUFFTyxTQUFTSixpQkFBaUJLLE9BQU8sRUFBRUMsTUFBTTtJQUM5Q0MsSUFBQUEsd0JBQVUsRUFBQ0wsUUFBUSxHQUFHLENBQUNJO0lBRXZCRSxJQUFBQSx1QkFBUyxFQUFDTixRQUFRO0lBRWxCTyxJQUFBQSxzQkFBUSxFQUFDUCxRQUFRO0lBRWpCQSxPQUFPRSxLQUFLLENBQUNDO0lBRWJFLElBQUFBLHdCQUFVLEVBQUNMLFFBQVEsR0FBR0k7SUFFdEJHLElBQUFBLHNCQUFRLEVBQUNQLFFBQVE7QUFDbkIifQ==