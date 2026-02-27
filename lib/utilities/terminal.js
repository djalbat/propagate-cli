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
const _nodereadline = /*#__PURE__*/ _interop_require_default(require("node:readline"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function hideCursor() {
    process.stdout.write('\u001B[?25l');
}
function showCursor() {
    process.stdout.write('\u001B[?25h');
}
function offsetConsoleLog(message, offset) {
    _nodereadline.default.moveCursor(process.stdout, 0, -offset);
    _nodereadline.default.clearLine(process.stdout, 0);
    _nodereadline.default.cursorTo(process.stdout, 0);
    process.stdout.write(message);
    _nodereadline.default.moveCursor(process.stdout, 0, offset);
    _nodereadline.default.cursorTo(process.stdout, 0);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvdGVybWluYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCByZWFkbGluZSBmcm9tICdub2RlOnJlYWRsaW5lJztcblxuZXhwb3J0IGZ1bmN0aW9uIGhpZGVDdXJzb3IoKSB7XG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXHUwMDFCWz8yNWwnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDdXJzb3IoKSB7XG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKCdcXHUwMDFCWz8yNWgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9mZnNldENvbnNvbGVMb2cobWVzc2FnZSwgb2Zmc2V0KSB7XG4gIHJlYWRsaW5lLm1vdmVDdXJzb3IocHJvY2Vzcy5zdGRvdXQsIDAsIC1vZmZzZXQpO1xuXG4gIHJlYWRsaW5lLmNsZWFyTGluZShwcm9jZXNzLnN0ZG91dCwgMCk7XG5cbiAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO1xuXG4gIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG1lc3NhZ2UpO1xuXG4gIHJlYWRsaW5lLm1vdmVDdXJzb3IocHJvY2Vzcy5zdGRvdXQsIDAsIG9mZnNldCk7XG5cbiAgcmVhZGxpbmUuY3Vyc29yVG8ocHJvY2Vzcy5zdGRvdXQsIDApO1xufVxuIl0sIm5hbWVzIjpbImhpZGVDdXJzb3IiLCJvZmZzZXRDb25zb2xlTG9nIiwic2hvd0N1cnNvciIsInByb2Nlc3MiLCJzdGRvdXQiLCJ3cml0ZSIsIm1lc3NhZ2UiLCJvZmZzZXQiLCJyZWFkbGluZSIsIm1vdmVDdXJzb3IiLCJjbGVhckxpbmUiLCJjdXJzb3JUbyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O1FBSWdCQTtlQUFBQTs7UUFRQUM7ZUFBQUE7O1FBSkFDO2VBQUFBOzs7cUVBTks7Ozs7OztBQUVkLFNBQVNGO0lBQ2RHLFFBQVFDLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDO0FBQ3ZCO0FBRU8sU0FBU0g7SUFDZEMsUUFBUUMsTUFBTSxDQUFDQyxLQUFLLENBQUM7QUFDdkI7QUFFTyxTQUFTSixpQkFBaUJLLE9BQU8sRUFBRUMsTUFBTTtJQUM5Q0MscUJBQVEsQ0FBQ0MsVUFBVSxDQUFDTixRQUFRQyxNQUFNLEVBQUUsR0FBRyxDQUFDRztJQUV4Q0MscUJBQVEsQ0FBQ0UsU0FBUyxDQUFDUCxRQUFRQyxNQUFNLEVBQUU7SUFFbkNJLHFCQUFRLENBQUNHLFFBQVEsQ0FBQ1IsUUFBUUMsTUFBTSxFQUFFO0lBRWxDRCxRQUFRQyxNQUFNLENBQUNDLEtBQUssQ0FBQ0M7SUFFckJFLHFCQUFRLENBQUNDLFVBQVUsQ0FBQ04sUUFBUUMsTUFBTSxFQUFFLEdBQUdHO0lBRXZDQyxxQkFBUSxDQUFDRyxRQUFRLENBQUNSLFFBQVFDLE1BQU0sRUFBRTtBQUNwQyJ9