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
    get executePromptly () {
        return executePromptly;
    },
    get executeRepeatedly () {
        return executeRepeatedly;
    }
});
const _child_process = /*#__PURE__*/ _interop_require_default(require("child_process"));
const _necessary = require("necessary");
const _validate = require("../utilities/validate");
const _terminal = require("../utilities/terminal");
const _prompt = require("../utilities/prompt");
const _messages = require("../messages");
const _descriptions = require("../descriptions");
const _constants = require("../constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const { prompt } = _necessary.shellUtilities, { whilst } = _necessary.asynchronousUtilities, { UTF_8_ENCODING } = _necessary.encodings;
function executePromptly(shellCommands, quietly, callback) {
    const success = execSync(shellCommands, quietly);
    if (success) {
        callback(success);
        return;
    }
    const attempts = _constants.PROMPT_ATTEMPTS, description = _descriptions.FAILED_SCRIPT_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
        attempts,
        description,
        errorMessage,
        validationFunction
    };
    prompt(options, (answer)=>{
        let success;
        const valid = answer !== null;
        if (valid) {
            const affirmative = (0, _prompt.isAnswerAffirmative)(answer);
            success = affirmative ? execSync(shellCommands, quietly) : true; ///
        } else {
            success = false;
        }
        callback(success);
    });
}
function executeRepeatedly(shellCommands, specifier, index, length, quietly, delay, attempts, callback) {
    let success = false;
    const offset = length - index, operation = (next, done, context, index)=>{
        if (index === attempts) {
            done();
            return;
        }
        const progressCount = index + 1, progressIndicator = _constants.FULL_STOP.repeat(progressCount);
        (0, _terminal.offsetConsoleLog)(` - ${specifier}${progressIndicator}`, offset);
        execAsync(shellCommands, quietly, (error, output)=>{
            if (!error) {
                success = true;
                done();
                return;
            }
            setTimeout(next, delay);
        });
    };
    whilst(operation, ()=>{
        callback(success);
    });
}
function execSync(shellCommands, quietly) {
    let success;
    try {
        const encoding = UTF_8_ENCODING, options = {
            encoding
        }, output = _child_process.default.execSync(shellCommands, options);
        if (!quietly) {
            process.stdout.write(output);
        }
        success = true;
    } catch (error) {
        success = false;
    }
    return success;
}
function execAsync(shellCommands, quietly, callback) {
    const encoding = UTF_8_ENCODING, options = {
        encoding
    };
    _child_process.default.exec(shellCommands, options, (error, stdout, stderr)=>{
        const output = error ? stderr : stdout;
        if (!quietly) {
            process.stdout.write(output);
        }
        callback(error, output);
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvc2hlbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgZW5jb2RpbmdzLCBzaGVsbFV0aWxpdGllcywgYXN5bmNocm9ub3VzVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IG9mZnNldENvbnNvbGVMb2cgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3Rlcm1pbmFsXCI7XG5pbXBvcnQgeyBpc0Fuc3dlckFmZmlybWF0aXZlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9wcm9tcHRcIjtcbmltcG9ydCB7IElOVkFMSURfQU5TV0VSX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcbmltcG9ydCB7IEZBSUxFRF9TQ1JJUFRfREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBGVUxMX1NUT1AsIFBST01QVF9BVFRFTVBUUyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBwcm9tcHQgfSA9IHNoZWxsVXRpbGl0aWVzLFxuICAgICAgeyB3aGlsc3QgfSA9IGFzeW5jaHJvbm91c1V0aWxpdGllcyxcbiAgICAgIHsgVVRGXzhfRU5DT0RJTkcgfSA9IGVuY29kaW5ncztcblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVQcm9tcHRseShzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjaykge1xuICBjb25zdCBzdWNjZXNzID0gZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgcXVpZXRseSk7XG5cbiAgaWYgKHN1Y2Nlc3MpIHtcbiAgICBjYWxsYmFjayhzdWNjZXNzKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGF0dGVtcHRzID0gUFJPTVBUX0FUVEVNUFRTLFxuICAgICAgICBkZXNjcmlwdGlvbiA9IEZBSUxFRF9TQ1JJUFRfREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfQU5TV0VSX01FU1NBR0UsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IHZhbGlkYXRlQW5zd2VyLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgbGV0IHN1Y2Nlc3M7XG5cbiAgICBjb25zdCB2YWxpZCA9IChhbnN3ZXIgIT09IG51bGwpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBjb25zdCBhZmZpcm1hdGl2ZSA9IGlzQW5zd2VyQWZmaXJtYXRpdmUoYW5zd2VyKTtcblxuICAgICAgc3VjY2VzcyA9IGFmZmlybWF0aXZlID9cbiAgICAgICAgICAgICAgICAgIGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpIDpcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZTsgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleGVjdXRlUmVwZWF0ZWRseShzaGVsbENvbW1hbmRzLCBzcGVjaWZpZXIsIGluZGV4LCBsZW5ndGgsIHF1aWV0bHksIGRlbGF5LCBhdHRlbXB0cywgY2FsbGJhY2spIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBjb25zdCBvZmZzZXQgPSBsZW5ndGggLSBpbmRleCwgIC8vL1xuICAgICAgICBvcGVyYXRpb24gPSAobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IGF0dGVtcHRzKSB7XG4gICAgICAgICAgICBkb25lKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcm9ncmVzc0NvdW50ID0gKGluZGV4ICsgMSksXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NJbmRpY2F0b3IgPSBGVUxMX1NUT1AucmVwZWF0KHByb2dyZXNzQ291bnQpO1xuXG4gICAgICAgICAgb2Zmc2V0Q29uc29sZUxvZyhgIC0gJHtzcGVjaWZpZXJ9JHtwcm9ncmVzc0luZGljYXRvcn1gLCBvZmZzZXQpO1xuXG4gICAgICAgICAgZXhlY0FzeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChlcnJvciwgb3V0cHV0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGRvbmUoKTtcblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQobmV4dCwgZGVsYXkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gIHdoaWxzdChvcGVyYXRpb24sICgpID0+IHtcbiAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpIHtcbiAgbGV0IHN1Y2Nlc3M7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVuY29kaW5nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXQgPSBjaGlsZFByb2Nlc3MuZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIXF1aWV0bHkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG91dHB1dCk7XG4gICAgfVxuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc3VjY2VzcyA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG5cbmZ1bmN0aW9uIGV4ZWNBc3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjaykge1xuICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgfTtcblxuICBjaGlsZFByb2Nlc3MuZXhlYyhzaGVsbENvbW1hbmRzLCBvcHRpb25zLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gZXJyb3IgP1xuICAgICAgICAgICAgICAgICAgICAgc3RkZXJyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgc3Rkb3V0O1xuXG4gICAgaWYgKCFxdWlldGx5KSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShvdXRwdXQpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGVycm9yLCBvdXRwdXQpXG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImV4ZWN1dGVQcm9tcHRseSIsImV4ZWN1dGVSZXBlYXRlZGx5IiwicHJvbXB0Iiwic2hlbGxVdGlsaXRpZXMiLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJVVEZfOF9FTkNPRElORyIsImVuY29kaW5ncyIsInNoZWxsQ29tbWFuZHMiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzdWNjZXNzIiwiZXhlY1N5bmMiLCJhdHRlbXB0cyIsIlBST01QVF9BVFRFTVBUUyIsImRlc2NyaXB0aW9uIiwiRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJhbnN3ZXIiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsInNwZWNpZmllciIsImluZGV4IiwibGVuZ3RoIiwiZGVsYXkiLCJvZmZzZXQiLCJvcGVyYXRpb24iLCJuZXh0IiwiZG9uZSIsImNvbnRleHQiLCJwcm9ncmVzc0NvdW50IiwicHJvZ3Jlc3NJbmRpY2F0b3IiLCJGVUxMX1NUT1AiLCJyZXBlYXQiLCJvZmZzZXRDb25zb2xlTG9nIiwiZXhlY0FzeW5jIiwiZXJyb3IiLCJvdXRwdXQiLCJzZXRUaW1lb3V0IiwiZW5jb2RpbmciLCJjaGlsZFByb2Nlc3MiLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJleGVjIiwic3RkZXJyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFpQmdCQTtlQUFBQTs7UUF1Q0FDO2VBQUFBOzs7c0VBdERTOzJCQUV3QzswQkFFbEM7MEJBQ0U7d0JBQ0c7MEJBQ0c7OEJBQ0c7MkJBQ0M7Ozs7OztBQUUzQyxNQUFNLEVBQUVDLE1BQU0sRUFBRSxHQUFHQyx5QkFBYyxFQUMzQixFQUFFQyxNQUFNLEVBQUUsR0FBR0MsZ0NBQXFCLEVBQ2xDLEVBQUVDLGNBQWMsRUFBRSxHQUFHQyxvQkFBUztBQUU3QixTQUFTUCxnQkFBZ0JRLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxRQUFRO0lBQzlELE1BQU1DLFVBQVVDLFNBQVNKLGVBQWVDO0lBRXhDLElBQUlFLFNBQVM7UUFDWEQsU0FBU0M7UUFFVDtJQUNGO0lBRUEsTUFBTUUsV0FBV0MsMEJBQWUsRUFDMUJDLGNBQWNDLHVDQUF5QixFQUN2Q0MsZUFBZUMsZ0NBQXNCLEVBQ3JDQyxxQkFBcUJDLHdCQUFjLEVBQ25DQyxVQUFVO1FBQ1JSO1FBQ0FFO1FBQ0FFO1FBQ0FFO0lBQ0Y7SUFFTmpCLE9BQU9tQixTQUFTLENBQUNDO1FBQ2YsSUFBSVg7UUFFSixNQUFNWSxRQUFTRCxXQUFXO1FBRTFCLElBQUlDLE9BQU87WUFDVCxNQUFNQyxjQUFjQyxJQUFBQSwyQkFBbUIsRUFBQ0g7WUFFeENYLFVBQVVhLGNBQ0VaLFNBQVNKLGVBQWVDLFdBQ3RCLE1BQU0sR0FBRztRQUN6QixPQUFPO1lBQ0xFLFVBQVU7UUFDWjtRQUVBRCxTQUFTQztJQUNYO0FBQ0Y7QUFFTyxTQUFTVixrQkFBa0JPLGFBQWEsRUFBRWtCLFNBQVMsRUFBRUMsS0FBSyxFQUFFQyxNQUFNLEVBQUVuQixPQUFPLEVBQUVvQixLQUFLLEVBQUVoQixRQUFRLEVBQUVILFFBQVE7SUFDM0csSUFBSUMsVUFBVTtJQUVkLE1BQU1tQixTQUFTRixTQUFTRCxPQUNsQkksWUFBWSxDQUFDQyxNQUFNQyxNQUFNQyxTQUFTUDtRQUNoQyxJQUFJQSxVQUFVZCxVQUFVO1lBQ3RCb0I7WUFFQTtRQUNGO1FBRUEsTUFBTUUsZ0JBQWlCUixRQUFRLEdBQ3pCUyxvQkFBb0JDLG9CQUFTLENBQUNDLE1BQU0sQ0FBQ0g7UUFFM0NJLElBQUFBLDBCQUFnQixFQUFDLENBQUMsR0FBRyxFQUFFYixZQUFZVSxtQkFBbUIsRUFBRU47UUFFeERVLFVBQVVoQyxlQUFlQyxTQUFTLENBQUNnQyxPQUFPQztZQUN4QyxJQUFJLENBQUNELE9BQU87Z0JBQ1Y5QixVQUFVO2dCQUVWc0I7Z0JBRUE7WUFDRjtZQUVBVSxXQUFXWCxNQUFNSDtRQUNuQjtJQUNGO0lBRU56QixPQUFPMkIsV0FBVztRQUNoQnJCLFNBQVNDO0lBQ1g7QUFDRjtBQUVBLFNBQVNDLFNBQVNKLGFBQWEsRUFBRUMsT0FBTztJQUN0QyxJQUFJRTtJQUVKLElBQUk7UUFDRixNQUFNaUMsV0FBV3RDLGdCQUNYZSxVQUFVO1lBQ1J1QjtRQUNGLEdBQ0FGLFNBQVNHLHNCQUFZLENBQUNqQyxRQUFRLENBQUNKLGVBQWVhO1FBRXBELElBQUksQ0FBQ1osU0FBUztZQUNacUMsUUFBUUMsTUFBTSxDQUFDQyxLQUFLLENBQUNOO1FBQ3ZCO1FBRUEvQixVQUFVO0lBQ1osRUFBRSxPQUFPOEIsT0FBTztRQUNkOUIsVUFBVTtJQUNaO0lBRUEsT0FBT0E7QUFDVDtBQUVBLFNBQVM2QixVQUFVaEMsYUFBYSxFQUFFQyxPQUFPLEVBQUVDLFFBQVE7SUFDakQsTUFBTWtDLFdBQVd0QyxnQkFDWGUsVUFBVTtRQUNSdUI7SUFDRjtJQUVOQyxzQkFBWSxDQUFDSSxJQUFJLENBQUN6QyxlQUFlYSxTQUFTLENBQUNvQixPQUFPTSxRQUFRRztRQUN4RCxNQUFNUixTQUFTRCxRQUNFUyxTQUNFSDtRQUVuQixJQUFJLENBQUN0QyxTQUFTO1lBQ1pxQyxRQUFRQyxNQUFNLENBQUNDLEtBQUssQ0FBQ047UUFDdkI7UUFFQWhDLFNBQVMrQixPQUFPQztJQUNsQjtBQUNGIn0=