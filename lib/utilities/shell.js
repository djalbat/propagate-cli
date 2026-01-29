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
        console.log("   - ".concat(shellCommands, " (").concat(index, ")"));
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvc2hlbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgZW5jb2RpbmdzLCBzaGVsbFV0aWxpdGllcywgYXN5bmNocm9ub3VzVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSB9IGZyb20gXCIuLi9tZXNzYWdlc1wiO1xuaW1wb3J0IHsgRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTiB9IGZyb20gXCIuLi9kZXNjcmlwdGlvbnNcIjtcbmltcG9ydCB7IFJFUEVBVEVEX0RFTEFZLCBQUk9NUFRfQVRURU1QVFMsIFJFUEVBVEVEX0FUVEVNUFRTIH0gZnJvbSBcIi4uL2NvbnN0YW50c1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXMsXG4gICAgICB7IHdoaWxzdCB9ID0gYXN5bmNocm9ub3VzVXRpbGl0aWVzLFxuICAgICAgeyBVVEZfOF9FTkNPRElORyB9ID0gZW5jb2RpbmdzO1xuXG5leHBvcnQgZnVuY3Rpb24gZXhlY3V0ZVByb21wdGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IHN1Y2Nlc3MgPSBleGVjU3luYyhzaGVsbENvbW1hbmRzLCBxdWlldGx5KTtcblxuICBpZiAoc3VjY2Vzcykge1xuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXR0ZW1wdHMgPSBQUk9NUFRfQVRURU1QVFMsXG4gICAgICAgIGRlc2NyaXB0aW9uID0gRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBsZXQgc3VjY2VzcztcblxuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBzdWNjZXNzID0gYWZmaXJtYXRpdmUgP1xuICAgICAgICAgICAgICAgICAgZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgcXVpZXRseSkgOlxuICAgICAgICAgICAgICAgICAgICB0cnVlOyAvLy9cbiAgICB9IGVsc2Uge1xuICAgICAgc3VjY2VzcyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGVSZXBlYXRlZGx5KHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gIGxldCBzdWNjZXNzID0gZmFsc2U7XG5cbiAgY29uc3QgZGVsYXkgPSBSRVBFQVRFRF9ERUxBWSxcbiAgICAgICAgYXR0ZW1wdHMgPSBSRVBFQVRFRF9BVFRFTVBUUyxcbiAgICAgICAgb3BlcmF0aW9uID0gKG5leHQsIGRvbmUsIGNvbnRleHQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBhdHRlbXB0cykge1xuICAgICAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc29sZS5sb2coYCAgIC0gJHtzaGVsbENvbW1hbmRzfSAoJHtpbmRleH0pYCk7XG5cbiAgICAgICAgICBleGVjQXN5bmMoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgKGVycm9yLCBvdXRwdXQpID0+IHtcbiAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgc3VjY2VzcyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgZG9uZSgpO1xuXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dChuZXh0LCBkZWxheSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgd2hpbHN0KG9wZXJhdGlvbiwgKCkgPT4ge1xuICAgIGNhbGxiYWNrKHN1Y2Nlc3MpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgcXVpZXRseSkge1xuICBsZXQgc3VjY2VzcztcblxuICB0cnkge1xuICAgIGNvbnN0IGVuY29kaW5nID0gVVRGXzhfRU5DT0RJTkcsICAvLy9cbiAgICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgICAgZW5jb2RpbmdcbiAgICAgICAgICB9LFxuICAgICAgICAgIG91dHB1dCA9IGNoaWxkUHJvY2Vzcy5leGVjU3luYyhzaGVsbENvbW1hbmRzLCBvcHRpb25zKTtcblxuICAgIGlmICghcXVpZXRseSkge1xuICAgICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUob3V0cHV0KTtcbiAgICB9XG5cbiAgICBzdWNjZXNzID0gdHJ1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBzdWNjZXNzID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gc3VjY2Vzcztcbn1cblxuZnVuY3Rpb24gZXhlY0FzeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHksIGNhbGxiYWNrKSB7XG4gIGNvbnN0IGVuY29kaW5nID0gVVRGXzhfRU5DT0RJTkcsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBlbmNvZGluZ1xuICAgICAgICB9O1xuXG4gIGNoaWxkUHJvY2Vzcy5leGVjKHNoZWxsQ29tbWFuZHMsIG9wdGlvbnMsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcbiAgICBjb25zdCBvdXRwdXQgPSBlcnJvciA/XG4gICAgICAgICAgICAgICAgICAgICBzdGRlcnIgOlxuICAgICAgICAgICAgICAgICAgICAgICBzdGRvdXQ7XG5cbiAgICBpZiAoIXF1aWV0bHkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG91dHB1dCk7XG4gICAgfVxuXG4gICAgY2FsbGJhY2soZXJyb3IsIG91dHB1dClcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiZXhlY3V0ZVByb21wdGx5IiwiZXhlY3V0ZVJlcGVhdGVkbHkiLCJwcm9tcHQiLCJzaGVsbFV0aWxpdGllcyIsIndoaWxzdCIsImFzeW5jaHJvbm91c1V0aWxpdGllcyIsIlVURl84X0VOQ09ESU5HIiwiZW5jb2RpbmdzIiwic2hlbGxDb21tYW5kcyIsInF1aWV0bHkiLCJjYWxsYmFjayIsInN1Y2Nlc3MiLCJleGVjU3luYyIsImF0dGVtcHRzIiwiUFJPTVBUX0FUVEVNUFRTIiwiZGVzY3JpcHRpb24iLCJGQUlMRURfU0NSSVBUX0RFU0NSSVBUSU9OIiwiZXJyb3JNZXNzYWdlIiwiSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSIsInZhbGlkYXRpb25GdW5jdGlvbiIsInZhbGlkYXRlQW5zd2VyIiwib3B0aW9ucyIsImFuc3dlciIsInZhbGlkIiwiYWZmaXJtYXRpdmUiLCJpc0Fuc3dlckFmZmlybWF0aXZlIiwiZGVsYXkiLCJSRVBFQVRFRF9ERUxBWSIsIlJFUEVBVEVEX0FUVEVNUFRTIiwib3BlcmF0aW9uIiwibmV4dCIsImRvbmUiLCJjb250ZXh0IiwiaW5kZXgiLCJjb25zb2xlIiwibG9nIiwiZXhlY0FzeW5jIiwiZXJyb3IiLCJvdXRwdXQiLCJzZXRUaW1lb3V0IiwiZW5jb2RpbmciLCJjaGlsZFByb2Nlc3MiLCJwcm9jZXNzIiwic3Rkb3V0Iiwid3JpdGUiLCJleGVjIiwic3RkZXJyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFnQmdCQTtlQUFBQTs7UUF1Q0FDO2VBQUFBOzs7b0VBckRTO3lCQUV3Qzt3QkFFbEM7c0JBQ0s7d0JBQ0c7NEJBQ0c7eUJBQ3lCOzs7Ozs7QUFFbkUsSUFBTSxBQUFFQyxTQUFXQyx5QkFBYyxDQUF6QkQsUUFDRixBQUFFRSxTQUFXQyxnQ0FBcUIsQ0FBaENELFFBQ0YsQUFBRUUsaUJBQW1CQyxvQkFBUyxDQUE1QkQ7QUFFRCxTQUFTTixnQkFBZ0JRLGFBQWEsRUFBRUMsT0FBTyxFQUFFQyxRQUFRO0lBQzlELElBQU1DLFVBQVVDLFNBQVNKLGVBQWVDO0lBRXhDLElBQUlFLFNBQVM7UUFDWEQsU0FBU0M7UUFFVDtJQUNGO0lBRUEsSUFBTUUsV0FBV0MsMEJBQWUsRUFDMUJDLGNBQWNDLHVDQUF5QixFQUN2Q0MsZUFBZUMsZ0NBQXNCLEVBQ3JDQyxxQkFBcUJDLHdCQUFjLEVBQ25DQyxVQUFVO1FBQ1JSLFVBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FFLGNBQUFBO1FBQ0FFLG9CQUFBQTtJQUNGO0lBRU5qQixPQUFPbUIsU0FBUyxTQUFDQztRQUNmLElBQUlYO1FBRUosSUFBTVksUUFBU0QsV0FBVztRQUUxQixJQUFJQyxPQUFPO1lBQ1QsSUFBTUMsY0FBY0MsSUFBQUEsMkJBQW1CLEVBQUNIO1lBRXhDWCxVQUFVYSxjQUNFWixTQUFTSixlQUFlQyxXQUN0QixNQUFNLEdBQUc7UUFDekIsT0FBTztZQUNMRSxVQUFVO1FBQ1o7UUFFQUQsU0FBU0M7SUFDWDtBQUNGO0FBRU8sU0FBU1Ysa0JBQWtCTyxhQUFhLEVBQUVDLE9BQU8sRUFBRUMsUUFBUTtJQUNoRSxJQUFJQyxVQUFVO0lBRWQsSUFBTWUsUUFBUUMseUJBQWMsRUFDdEJkLFdBQVdlLDRCQUFpQixFQUM1QkMsWUFBWSxTQUFDQyxNQUFNQyxNQUFNQyxTQUFTQztRQUNoQyxJQUFJQSxVQUFVcEIsVUFBVTtZQUN0QmtCO1lBRUE7UUFDRjtRQUVBRyxRQUFRQyxHQUFHLENBQUMsQUFBQyxRQUF5QkYsT0FBbEJ6QixlQUFjLE1BQVUsT0FBTnlCLE9BQU07UUFFNUNHLFVBQVU1QixlQUFlQyxTQUFTLFNBQUM0QixPQUFPQztZQUN4QyxJQUFJLENBQUNELE9BQU87Z0JBQ1YxQixVQUFVO2dCQUVWb0I7Z0JBRUE7WUFDRjtZQUVBUSxXQUFXVCxNQUFNSjtRQUNuQjtJQUNGO0lBRU50QixPQUFPeUIsV0FBVztRQUNoQm5CLFNBQVNDO0lBQ1g7QUFDRjtBQUVBLFNBQVNDLFNBQVNKLGFBQWEsRUFBRUMsT0FBTztJQUN0QyxJQUFJRTtJQUVKLElBQUk7UUFDRixJQUFNNkIsV0FBV2xDLGdCQUNYZSxVQUFVO1lBQ1JtQixVQUFBQTtRQUNGLEdBQ0FGLFNBQVNHLHNCQUFZLENBQUM3QixRQUFRLENBQUNKLGVBQWVhO1FBRXBELElBQUksQ0FBQ1osU0FBUztZQUNaaUMsUUFBUUMsTUFBTSxDQUFDQyxLQUFLLENBQUNOO1FBQ3ZCO1FBRUEzQixVQUFVO0lBQ1osRUFBRSxPQUFPMEIsT0FBTztRQUNkMUIsVUFBVTtJQUNaO0lBRUEsT0FBT0E7QUFDVDtBQUVBLFNBQVN5QixVQUFVNUIsYUFBYSxFQUFFQyxPQUFPLEVBQUVDLFFBQVE7SUFDakQsSUFBTThCLFdBQVdsQyxnQkFDWGUsVUFBVTtRQUNSbUIsVUFBQUE7SUFDRjtJQUVOQyxzQkFBWSxDQUFDSSxJQUFJLENBQUNyQyxlQUFlYSxTQUFTLFNBQUNnQixPQUFPTSxRQUFRRztRQUN4RCxJQUFNUixTQUFTRCxRQUNFUyxTQUNFSDtRQUVuQixJQUFJLENBQUNsQyxTQUFTO1lBQ1ppQyxRQUFRQyxNQUFNLENBQUNDLEtBQUssQ0FBQ047UUFDdkI7UUFFQTVCLFNBQVMyQixPQUFPQztJQUNsQjtBQUNGIn0=