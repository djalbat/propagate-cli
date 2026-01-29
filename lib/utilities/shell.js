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
var _child_process = /*#__PURE__*/ _interop_require_default(require("child_process"));
var _necessary = require("necessary");
var _validate = require("../utilities/validate");
var _terminal = require("../utilities/terminal");
var _prompt = require("../utilities/prompt");
var _messages = require("../messages");
var _descriptions = require("../descriptions");
var _constants = require("../constants");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var prompt = _necessary.shellUtilities.prompt, whilst = _necessary.asynchronousUtilities.whilst, UTF_8_ENCODING = _necessary.encodings.UTF_8_ENCODING;
function executePromptly(shellCommands, quietly, callback) {
    var success = execSync(shellCommands, quietly);
    if (success) {
        callback(success);
        return;
    }
    var attempts = _constants.PROMPT_ATTEMPTS, description = _descriptions.FAILED_SCRIPT_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
        attempts: attempts,
        description: description,
        errorMessage: errorMessage,
        validationFunction: validationFunction
    };
    prompt(options, function(answer) {
        var success;
        var valid = answer !== null;
        if (valid) {
            var affirmative = (0, _prompt.isAnswerAffirmative)(answer);
            success = affirmative ? execSync(shellCommands, quietly) : true; ///
        } else {
            success = false;
        }
        callback(success);
    });
}
function executeRepeatedly(shellCommands, specifier, index, length, quietly, callback) {
    var success = false;
    var delay = _constants.REPEATED_DELAY, offset = length - index, attempts = _constants.REPEATED_ATTEMPTS, operation = function(next, done, context, index) {
        if (index === attempts) {
            done();
            return;
        }
        var progressCount = index + 1, progressIndicator = _constants.FULL_STOP.repeat(progressCount);
        (0, _terminal.offsetConsoleLog)(" - ".concat(specifier).concat(progressIndicator), offset);
        execAsync(shellCommands, quietly, function(error, output) {
            if (!error) {
                success = true;
                done();
                return;
            }
            setTimeout(next, delay);
        });
    };
    whilst(operation, function() {
        callback(success);
    });
}
function execSync(shellCommands, quietly) {
    var success;
    try {
        var encoding = UTF_8_ENCODING, options = {
            encoding: encoding
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
    var encoding = UTF_8_ENCODING, options = {
        encoding: encoding
    };
    _child_process.default.exec(shellCommands, options, function(error, stdout, stderr) {
        var output = error ? stderr : stdout;
        if (!quietly) {
            process.stdout.write(output);
        }
        callback(error, output);
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvc2hlbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgZW5jb2RpbmdzLCBzaGVsbFV0aWxpdGllcywgYXN5bmNocm9ub3VzVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IG9mZnNldENvbnNvbGVMb2cgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3Rlcm1pbmFsXCI7XG5pbXBvcnQgeyBpc0Fuc3dlckFmZmlybWF0aXZlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9wcm9tcHRcIjtcbmltcG9ydCB7IElOVkFMSURfQU5TV0VSX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcbmltcG9ydCB7IEZBSUxFRF9TQ1JJUFRfREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBGVUxMX1NUT1AsIFJFUEVBVEVEX0RFTEFZLCBQUk9NUFRfQVRURU1QVFMsIFJFUEVBVEVEX0FUVEVNUFRTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXMsXG4gICAgICB7IHdoaWxzdCB9ID0gYXN5bmNocm9ub3VzVXRpbGl0aWVzLFxuICAgICAgeyBVVEZfOF9FTkNPRElORyB9ID0gZW5jb2RpbmdzO1xuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVByb21wdGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHN1Y2Nlc3MgPSBleGVjU3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5KTtcblxuICBpZiAoc3VjY2Vzcykge1xuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXR0ZW1wdHMgPSBQUk9NUFRfQVRURU1QVFMsXG4gICAgICAgIGRlc2NyaXB0aW9uID0gRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBsZXQgc3VjY2VzcztcblxuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBzdWNjZXNzID0gYWZmaXJtYXRpdmUgP1xuICAgICAgICAgICAgICAgICAgZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgcXVpZXRseSkgOlxuICAgICAgICAgICAgICAgICAgICB0cnVlOyAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVSZXBlYXRlZGx5KHNoZWxsQ29tbWFuZHMsIHNwZWNpZmllciwgaW5kZXgsIGxlbmd0aCwgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgbGV0IHN1Y2Nlc3MgPSBmYWxzZTtcblxuICBjb25zdCBkZWxheSA9IFJFUEVBVEVEX0RFTEFZLFxuICAgICAgICBvZmZzZXQgPSBsZW5ndGggLSBpbmRleCwgIC8vL1xuICAgICAgICBhdHRlbXB0cyA9IFJFUEVBVEVEX0FUVEVNUFRTLFxuICAgICAgICBvcGVyYXRpb24gPSAobmV4dCwgZG9uZSwgY29udGV4dCwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IGF0dGVtcHRzKSB7XG4gICAgICAgICAgICBkb25lKCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwcm9ncmVzc0NvdW50ID0gKGluZGV4ICsgMSksXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3NJbmRpY2F0b3IgPSBGVUxMX1NUT1AucmVwZWF0KHByb2dyZXNzQ291bnQpO1xuXG4gICAgICAgICAgb2Zmc2V0Q29uc29sZUxvZyhgIC0gJHtzcGVjaWZpZXJ9JHtwcm9ncmVzc0luZGljYXRvcn1gLCBvZmZzZXQpO1xuXG4gICAgICAgICAgZXhlY0FzeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChlcnJvciwgb3V0cHV0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGRvbmUoKTtcblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQobmV4dCwgZGVsYXkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gIHdoaWxzdChvcGVyYXRpb24sICgpID0+IHtcbiAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpIHtcbiAgbGV0IHN1Y2Nlc3M7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVuY29kaW5nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXQgPSBjaGlsZFByb2Nlc3MuZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIXF1aWV0bHkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG91dHB1dCk7XG4gICAgfVxuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc3VjY2VzcyA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG5cbmZ1bmN0aW9uIGV4ZWNBc3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjaykge1xuICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgfTtcblxuICBjaGlsZFByb2Nlc3MuZXhlYyhzaGVsbENvbW1hbmRzLCBvcHRpb25zLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gZXJyb3IgP1xuICAgICAgICAgICAgICAgICAgICAgc3RkZXJyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgc3Rkb3V0O1xuXG4gICAgaWYgKCFxdWlldGx5KSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShvdXRwdXQpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGVycm9yLCBvdXRwdXQpXG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImV4ZWN1dGVQcm9tcHRseSIsImV4ZWN1dGVSZXBlYXRlZGx5IiwicHJvbXB0Iiwic2hlbGxVdGlsaXRpZXMiLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJVVEZfOF9FTkNPRElORyIsImVuY29kaW5ncyIsInNoZWxsQ29tbWFuZHMiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzdWNjZXNzIiwiZXhlY1N5bmMiLCJhdHRlbXB0cyIsIlBST01QVF9BVFRFTVBUUyIsImRlc2NyaXB0aW9uIiwiRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJhbnN3ZXIiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsInNwZWNpZmllciIsImluZGV4IiwibGVuZ3RoIiwiZGVsYXkiLCJSRVBFQVRFRF9ERUxBWSIsIm9mZnNldCIsIlJFUEVBVEVEX0FUVEVNUFRTIiwib3BlcmF0aW9uIiwibmV4dCIsImRvbmUiLCJjb250ZXh0IiwicHJvZ3Jlc3NDb3VudCIsInByb2dyZXNzSW5kaWNhdG9yIiwiRlVMTF9TVE9QIiwicmVwZWF0Iiwib2Zmc2V0Q29uc29sZUxvZyIsImV4ZWNBc3luYyIsImVycm9yIiwib3V0cHV0Iiwic2V0VGltZW91dCIsImVuY29kaW5nIiwiY2hpbGRQcm9jZXNzIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwiZXhlYyIsInN0ZGVyciJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O1FBaUJnQkE7ZUFBQUE7O1FBdUNBQztlQUFBQTs7O29FQXREUzt5QkFFd0M7d0JBRWxDO3dCQUNFO3NCQUNHO3dCQUNHOzRCQUNHO3lCQUNvQzs7Ozs7O0FBRTlFLElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJELFFBQ0YsQUFBRUUsU0FBV0MsZ0NBQXFCLENBQWhDRCxRQUNGLEFBQUVFLGlCQUFtQkMsb0JBQVMsQ0FBNUJEO0FBRUQsU0FBU04sZ0JBQWdCUSxhQUFhLEVBQUVDLE9BQU8sRUFBRUMsUUFBUTtJQUM5RCxJQUFNQyxVQUFVQyxTQUFTSixlQUFlQztJQUV4QyxJQUFJRSxTQUFTO1FBQ1hELFNBQVNDO1FBRVQ7SUFDRjtJQUVBLElBQU1FLFdBQVdDLDBCQUFlLEVBQzFCQyxjQUFjQyx1Q0FBeUIsRUFDdkNDLGVBQWVDLGdDQUFzQixFQUNyQ0MscUJBQXFCQyx3QkFBYyxFQUNuQ0MsVUFBVTtRQUNSUixVQUFBQTtRQUNBRSxhQUFBQTtRQUNBRSxjQUFBQTtRQUNBRSxvQkFBQUE7SUFDRjtJQUVOakIsT0FBT21CLFNBQVMsU0FBQ0M7UUFDZixJQUFJWDtRQUVKLElBQU1ZLFFBQVNELFdBQVc7UUFFMUIsSUFBSUMsT0FBTztZQUNULElBQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDSDtZQUV4Q1gsVUFBVWEsY0FDRVosU0FBU0osZUFBZUMsV0FDdEIsTUFBTSxHQUFHO1FBQ3pCLE9BQU87WUFDTEUsVUFBVTtRQUNaO1FBRUFELFNBQVNDO0lBQ1g7QUFDRjtBQUVPLFNBQVNWLGtCQUFrQk8sYUFBYSxFQUFFa0IsU0FBUyxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRW5CLE9BQU8sRUFBRUMsUUFBUTtJQUMxRixJQUFJQyxVQUFVO0lBRWQsSUFBTWtCLFFBQVFDLHlCQUFjLEVBQ3RCQyxTQUFTSCxTQUFTRCxPQUNsQmQsV0FBV21CLDRCQUFpQixFQUM1QkMsWUFBWSxTQUFDQyxNQUFNQyxNQUFNQyxTQUFTVDtRQUNoQyxJQUFJQSxVQUFVZCxVQUFVO1lBQ3RCc0I7WUFFQTtRQUNGO1FBRUEsSUFBTUUsZ0JBQWlCVixRQUFRLEdBQ3pCVyxvQkFBb0JDLG9CQUFTLENBQUNDLE1BQU0sQ0FBQ0g7UUFFM0NJLElBQUFBLDBCQUFnQixFQUFDLEFBQUMsTUFBaUJILE9BQVpaLFdBQThCLE9BQWxCWSxvQkFBcUJQO1FBRXhEVyxVQUFVbEMsZUFBZUMsU0FBUyxTQUFDa0MsT0FBT0M7WUFDeEMsSUFBSSxDQUFDRCxPQUFPO2dCQUNWaEMsVUFBVTtnQkFFVndCO2dCQUVBO1lBQ0Y7WUFFQVUsV0FBV1gsTUFBTUw7UUFDbkI7SUFDRjtJQUVOekIsT0FBTzZCLFdBQVc7UUFDaEJ2QixTQUFTQztJQUNYO0FBQ0Y7QUFFQSxTQUFTQyxTQUFTSixhQUFhLEVBQUVDLE9BQU87SUFDdEMsSUFBSUU7SUFFSixJQUFJO1FBQ0YsSUFBTW1DLFdBQVd4QyxnQkFDWGUsVUFBVTtZQUNSeUIsVUFBQUE7UUFDRixHQUNBRixTQUFTRyxzQkFBWSxDQUFDbkMsUUFBUSxDQUFDSixlQUFlYTtRQUVwRCxJQUFJLENBQUNaLFNBQVM7WUFDWnVDLFFBQVFDLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDTjtRQUN2QjtRQUVBakMsVUFBVTtJQUNaLEVBQUUsT0FBT2dDLE9BQU87UUFDZGhDLFVBQVU7SUFDWjtJQUVBLE9BQU9BO0FBQ1Q7QUFFQSxTQUFTK0IsVUFBVWxDLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxRQUFRO0lBQ2pELElBQU1vQyxXQUFXeEMsZ0JBQ1hlLFVBQVU7UUFDUnlCLFVBQUFBO0lBQ0Y7SUFFTkMsc0JBQVksQ0FBQ0ksSUFBSSxDQUFDM0MsZUFBZWEsU0FBUyxTQUFDc0IsT0FBT00sUUFBUUc7UUFDeEQsSUFBTVIsU0FBU0QsUUFDRVMsU0FDRUg7UUFFbkIsSUFBSSxDQUFDeEMsU0FBUztZQUNadUMsUUFBUUMsTUFBTSxDQUFDQyxLQUFLLENBQUNOO1FBQ3ZCO1FBRUFsQyxTQUFTaUMsT0FBT0M7SUFDbEI7QUFDRiJ9