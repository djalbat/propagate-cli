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
function executeRepeatedly(shellCommands, specifier, index, length, quietly, callback) {
    let success = false;
    const delay = _constants.REPEATED_DELAY, offset = length - index, attempts = _constants.REPEATED_ATTEMPTS, operation = (next, done, context, index)=>{
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvc2hlbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgZW5jb2RpbmdzLCBzaGVsbFV0aWxpdGllcywgYXN5bmNocm9ub3VzVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IG9mZnNldENvbnNvbGVMb2cgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3Rlcm1pbmFsXCI7XG5pbXBvcnQgeyBpc0Fuc3dlckFmZmlybWF0aXZlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9wcm9tcHRcIjtcbmltcG9ydCB7IElOVkFMSURfQU5TV0VSX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcbmltcG9ydCB7IEZBSUxFRF9TQ1JJUFRfREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBGVUxMX1NUT1AsIFJFUEVBVEVEX0RFTEFZLCBQUk9NUFRfQVRURU1QVFMsIFJFUEVBVEVEX0FUVEVNUFRTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXMsXG4gICAgICB7IHdoaWxzdCB9ID0gYXN5bmNocm9ub3VzVXRpbGl0aWVzLFxuICAgICAgeyBVVEZfOF9FTkNPRElORyB9ID0gZW5jb2RpbmdzO1xuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVByb21wdGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHN1Y2Nlc3MgPSBleGVjU3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5KTtcblxuICBpZiAoc3VjY2Vzcykge1xuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXR0ZW1wdHMgPSBQUk9NUFRfQVRURU1QVFMsXG4gICAgICAgIGRlc2NyaXB0aW9uID0gRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBsZXQgc3VjY2VzcztcblxuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBzdWNjZXNzID0gYWZmaXJtYXRpdmUgP1xuICAgICAgICAgICAgICAgICAgZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgcXVpZXRseSkgOlxuICAgICAgICAgICAgICAgICAgICB0cnVlOyAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVSZXBlYXRlZGx5KHNoZWxsQ29tbWFuZHMsIHNwZWNpZmllciwgaW5kZXgsIGxlbmd0aCwgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBjb25zdCBkZWxheSA9IFJFUEVBVEVEX0RFTEFZLFxuICAgICAgICBvZmZzZXQgPSBsZW5ndGggLSBpbmRleCwgIC8vL1xuICAgICAgICBhdHRlbXB0cyA9IFJFUEVBVEVEX0FUVEVNUFRTLFxuICAgICAgICBvcGVyYXRpb24gPSAobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IGF0dGVtcHRzKSB7XG4gICAgICAgICAgICBkb25lKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcm9ncmVzc0NvdW50ID0gKGluZGV4ICsgMSksXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NJbmRpY2F0b3IgPSBGVUxMX1NUT1AucmVwZWF0KHByb2dyZXNzQ291bnQpO1xuXG4gICAgICAgICAgb2Zmc2V0Q29uc29sZUxvZyhgIC0gJHtzcGVjaWZpZXJ9JHtwcm9ncmVzc0luZGljYXRvcn1gLCBvZmZzZXQpO1xuXG4gICAgICAgICAgZXhlY0FzeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChlcnJvciwgb3V0cHV0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGRvbmUoKTtcblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQobmV4dCwgZGVsYXkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gIHdoaWxzdChvcGVyYXRpb24sICgpID0+IHtcbiAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpIHtcbiAgbGV0IHN1Y2Nlc3M7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVuY29kaW5nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXQgPSBjaGlsZFByb2Nlc3MuZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIXF1aWV0bHkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG91dHB1dCk7XG4gICAgfVxuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc3VjY2VzcyA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG5cbmZ1bmN0aW9uIGV4ZWNBc3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjaykge1xuICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgfTtcblxuICBjaGlsZFByb2Nlc3MuZXhlYyhzaGVsbENvbW1hbmRzLCBvcHRpb25zLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gZXJyb3IgP1xuICAgICAgICAgICAgICAgICAgICAgc3RkZXJyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgc3Rkb3V0O1xuXG4gICAgaWYgKCFxdWlldGx5KSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShvdXRwdXQpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGVycm9yLCBvdXRwdXQpXG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImV4ZWN1dGVQcm9tcHRseSIsImV4ZWN1dGVSZXBlYXRlZGx5IiwicHJvbXB0Iiwic2hlbGxVdGlsaXRpZXMiLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJVVEZfOF9FTkNPRElORyIsImVuY29kaW5ncyIsInNoZWxsQ29tbWFuZHMiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzdWNjZXNzIiwiZXhlY1N5bmMiLCJhdHRlbXB0cyIsIlBST01QVF9BVFRFTVBUUyIsImRlc2NyaXB0aW9uIiwiRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJhbnN3ZXIiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsInNwZWNpZmllciIsImluZGV4IiwibGVuZ3RoIiwiZGVsYXkiLCJSRVBFQVRFRF9ERUxBWSIsIm9mZnNldCIsIlJFUEVBVEVEX0FUVEVNUFRTIiwib3BlcmF0aW9uIiwibmV4dCIsImRvbmUiLCJjb250ZXh0IiwicHJvZ3Jlc3NDb3VudCIsInByb2dyZXNzSW5kaWNhdG9yIiwiRlVMTF9TVE9QIiwicmVwZWF0Iiwib2Zmc2V0Q29uc29sZUxvZyIsImV4ZWNBc3luYyIsImVycm9yIiwib3V0cHV0Iiwic2V0VGltZW91dCIsImVuY29kaW5nIiwiY2hpbGRQcm9jZXNzIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwiZXhlYyIsInN0ZGVyciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O1FBaUJnQkE7ZUFBQUE7O1FBdUNBQztlQUFBQTs7O3NFQXREUzsyQkFFd0M7MEJBRWxDOzBCQUNFO3dCQUNHOzBCQUNHOzhCQUNHOzJCQUNvQzs7Ozs7O0FBRTlFLE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjLEVBQzNCLEVBQUVDLE1BQU0sRUFBRSxHQUFHQyxnQ0FBcUIsRUFDbEMsRUFBRUMsY0FBYyxFQUFFLEdBQUdDLG9CQUFTO0FBRTdCLFNBQVNQLGdCQUFnQlEsYUFBYSxFQUFFQyxPQUFPLEVBQUVDLFFBQVE7SUFDOUQsTUFBTUMsVUFBVUMsU0FBU0osZUFBZUM7SUFFeEMsSUFBSUUsU0FBUztRQUNYRCxTQUFTQztRQUVUO0lBQ0Y7SUFFQSxNQUFNRSxXQUFXQywwQkFBZSxFQUMxQkMsY0FBY0MsdUNBQXlCLEVBQ3ZDQyxlQUFlQyxnQ0FBc0IsRUFDckNDLHFCQUFxQkMsd0JBQWMsRUFDbkNDLFVBQVU7UUFDUlI7UUFDQUU7UUFDQUU7UUFDQUU7SUFDRjtJQUVOakIsT0FBT21CLFNBQVMsQ0FBQ0M7UUFDZixJQUFJWDtRQUVKLE1BQU1ZLFFBQVNELFdBQVc7UUFFMUIsSUFBSUMsT0FBTztZQUNULE1BQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDSDtZQUV4Q1gsVUFBVWEsY0FDRVosU0FBU0osZUFBZUMsV0FDdEIsTUFBTSxHQUFHO1FBQ3pCLE9BQU87WUFDTEUsVUFBVTtRQUNaO1FBRUFELFNBQVNDO0lBQ1g7QUFDRjtBQUVPLFNBQVNWLGtCQUFrQk8sYUFBYSxFQUFFa0IsU0FBUyxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRW5CLE9BQU8sRUFBRUMsUUFBUTtJQUMxRixJQUFJQyxVQUFVO0lBRWQsTUFBTWtCLFFBQVFDLHlCQUFjLEVBQ3RCQyxTQUFTSCxTQUFTRCxPQUNsQmQsV0FBV21CLDRCQUFpQixFQUM1QkMsWUFBWSxDQUFDQyxNQUFNQyxNQUFNQyxTQUFTVDtRQUNoQyxJQUFJQSxVQUFVZCxVQUFVO1lBQ3RCc0I7WUFFQTtRQUNGO1FBRUEsTUFBTUUsZ0JBQWlCVixRQUFRLEdBQ3pCVyxvQkFBb0JDLG9CQUFTLENBQUNDLE1BQU0sQ0FBQ0g7UUFFM0NJLElBQUFBLDBCQUFnQixFQUFDLENBQUMsR0FBRyxFQUFFZixZQUFZWSxtQkFBbUIsRUFBRVA7UUFFeERXLFVBQVVsQyxlQUFlQyxTQUFTLENBQUNrQyxPQUFPQztZQUN4QyxJQUFJLENBQUNELE9BQU87Z0JBQ1ZoQyxVQUFVO2dCQUVWd0I7Z0JBRUE7WUFDRjtZQUVBVSxXQUFXWCxNQUFNTDtRQUNuQjtJQUNGO0lBRU56QixPQUFPNkIsV0FBVztRQUNoQnZCLFNBQVNDO0lBQ1g7QUFDRjtBQUVBLFNBQVNDLFNBQVNKLGFBQWEsRUFBRUMsT0FBTztJQUN0QyxJQUFJRTtJQUVKLElBQUk7UUFDRixNQUFNbUMsV0FBV3hDLGdCQUNYZSxVQUFVO1lBQ1J5QjtRQUNGLEdBQ0FGLFNBQVNHLHNCQUFZLENBQUNuQyxRQUFRLENBQUNKLGVBQWVhO1FBRXBELElBQUksQ0FBQ1osU0FBUztZQUNadUMsUUFBUUMsTUFBTSxDQUFDQyxLQUFLLENBQUNOO1FBQ3ZCO1FBRUFqQyxVQUFVO0lBQ1osRUFBRSxPQUFPZ0MsT0FBTztRQUNkaEMsVUFBVTtJQUNaO0lBRUEsT0FBT0E7QUFDVDtBQUVBLFNBQVMrQixVQUFVbEMsYUFBYSxFQUFFQyxPQUFPLEVBQUVDLFFBQVE7SUFDakQsTUFBTW9DLFdBQVd4QyxnQkFDWGUsVUFBVTtRQUNSeUI7SUFDRjtJQUVOQyxzQkFBWSxDQUFDSSxJQUFJLENBQUMzQyxlQUFlYSxTQUFTLENBQUNzQixPQUFPTSxRQUFRRztRQUN4RCxNQUFNUixTQUFTRCxRQUNFUyxTQUNFSDtRQUVuQixJQUFJLENBQUN4QyxTQUFTO1lBQ1p1QyxRQUFRQyxNQUFNLENBQUNDLEtBQUssQ0FBQ047UUFDdkI7UUFFQWxDLFNBQVNpQyxPQUFPQztJQUNsQjtBQUNGIn0=