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
function executeRepeatedly(shellCommands, quietly, callback) {
    var success = false;
    var delay = _constants.REPEATED_DELAY, attempts = _constants.REPEATED_ATTEMPTS, operation = function(next, done, context, index) {
        if (index === attempts) {
            done();
            return;
        }
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvc2hlbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgZW5jb2RpbmdzLCBzaGVsbFV0aWxpdGllcywgYXN5bmNocm9ub3VzVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSB9IGZyb20gXCIuLi9tZXNzYWdlc1wiO1xuaW1wb3J0IHsgRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTiB9IGZyb20gXCIuLi9kZXNjcmlwdGlvbnNcIjtcbmltcG9ydCB7IFJFUEVBVEVEX0RFTEFZLCBQUk9NUFRfQVRURU1QVFMsIFJFUEVBVEVEX0FUVEVNUFRTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXMsXG4gICAgICB7IHdoaWxzdCB9ID0gYXN5bmNocm9ub3VzVXRpbGl0aWVzLFxuICAgICAgeyBVVEZfOF9FTkNPRElORyB9ID0gZW5jb2RpbmdzO1xuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVByb21wdGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHN1Y2Nlc3MgPSBleGVjU3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5KTtcblxuICBpZiAoc3VjY2Vzcykge1xuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXR0ZW1wdHMgPSBQUk9NUFRfQVRURU1QVFMsXG4gICAgICAgIGRlc2NyaXB0aW9uID0gRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBsZXQgc3VjY2VzcztcblxuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBzdWNjZXNzID0gYWZmaXJtYXRpdmUgP1xuICAgICAgICAgICAgICAgICAgZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgcXVpZXRseSkgOlxuICAgICAgICAgICAgICAgICAgICB0cnVlOyAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVSZXBlYXRlZGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgY29uc3QgZGVsYXkgPSBSRVBFQVRFRF9ERUxBWSxcbiAgICAgICAgYXR0ZW1wdHMgPSBSRVBFQVRFRF9BVFRFTVBUUyxcbiAgICAgICAgb3BlcmF0aW9uID0gKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBhdHRlbXB0cykge1xuICAgICAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXhlY0FzeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIChlcnJvciwgb3V0cHV0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGRvbmUoKTtcblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQobmV4dCwgZGVsYXkpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gIHdoaWxzdChvcGVyYXRpb24sICgpID0+IHtcbiAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpIHtcbiAgbGV0IHN1Y2Nlc3M7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVuY29kaW5nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXQgPSBjaGlsZFByb2Nlc3MuZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIXF1aWV0bHkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG91dHB1dCk7XG4gICAgfVxuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc3VjY2VzcyA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG5cbmZ1bmN0aW9uIGV4ZWNBc3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5LCBjYWxsYmFjaykge1xuICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgfTtcblxuICBjaGlsZFByb2Nlc3MuZXhlYyhzaGVsbENvbW1hbmRzLCBvcHRpb25zLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XG4gICAgY29uc3Qgb3V0cHV0ID0gZXJyb3IgP1xuICAgICAgICAgICAgICAgICAgICAgc3RkZXJyIDpcbiAgICAgICAgICAgICAgICAgICAgICAgc3Rkb3V0O1xuXG4gICAgaWYgKCFxdWlldGx5KSB7XG4gICAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShvdXRwdXQpO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKGVycm9yLCBvdXRwdXQpXG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImV4ZWN1dGVQcm9tcHRseSIsImV4ZWN1dGVSZXBlYXRlZGx5IiwicHJvbXB0Iiwic2hlbGxVdGlsaXRpZXMiLCJ3aGlsc3QiLCJhc3luY2hyb25vdXNVdGlsaXRpZXMiLCJVVEZfOF9FTkNPRElORyIsImVuY29kaW5ncyIsInNoZWxsQ29tbWFuZHMiLCJxdWlldGx5IiwiY2FsbGJhY2siLCJzdWNjZXNzIiwiZXhlY1N5bmMiLCJhdHRlbXB0cyIsIlBST01QVF9BVFRFTVBUUyIsImRlc2NyaXB0aW9uIiwiRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJhbnN3ZXIiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsImRlbGF5IiwiUkVQRUFURURfREVMQVkiLCJSRVBFQVRFRF9BVFRFTVBUUyIsIm9wZXJhdGlvbiIsIm5leHQiLCJkb25lIiwiY29udGV4dCIsImluZGV4IiwiZXhlY0FzeW5jIiwiZXJyb3IiLCJvdXRwdXQiLCJzZXRUaW1lb3V0IiwiZW5jb2RpbmciLCJjaGlsZFByb2Nlc3MiLCJwcm9jZXNzIiwi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