"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "execute", {
    enumerable: true,
    get: function() {
        return execute;
    }
});
var _child_process = /*#__PURE__*/ _interop_require_default(require("child_process"));
var _necessary = require("necessary");
var _validate = require("../utilities/validate");
var _prompt = require("../utilities/prompt");
var _messages = require("../messages");
var _descriptions = require("../descriptions");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
var prompt = _necessary.shellUtilities.prompt, UTF_8_ENCODING = _necessary.encodings.UTF_8_ENCODING;
function execute(shellCommands, quietly, callback) {
    var success = execSync(shellCommands, quietly);
    if (success) {
        callback(success);
        return;
    }
    var attempts = Infinity, description = _descriptions.FAILED_SCRIPT_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvc2hlbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBjaGlsZFByb2Nlc3MgZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcblxuaW1wb3J0IHsgZW5jb2RpbmdzLCBzaGVsbFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IHsgdmFsaWRhdGVBbnN3ZXIgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ZhbGlkYXRlXCI7XG5pbXBvcnQgeyBpc0Fuc3dlckFmZmlybWF0aXZlIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9wcm9tcHRcIjtcbmltcG9ydCB7IElOVkFMSURfQU5TV0VSX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcbmltcG9ydCB7IEZBSUxFRF9TQ1JJUFRfREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vZGVzY3JpcHRpb25zXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcyxcbiAgICAgIHsgVVRGXzhfRU5DT0RJTkcgfSA9IGVuY29kaW5ncztcblxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWN1dGUoc2hlbGxDb21tYW5kcywgcXVpZXRseSwgY2FsbGJhY2spIHtcbiAgY29uc3Qgc3VjY2VzcyA9IGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpO1xuXG4gIGlmIChzdWNjZXNzKSB7XG4gICAgY2FsbGJhY2soc3VjY2Vzcyk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhdHRlbXB0cyA9IEluZmluaXR5LFxuICAgICAgICBkZXNjcmlwdGlvbiA9IEZBSUxFRF9TQ1JJUFRfREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfQU5TV0VSX01FU1NBR0UsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IHZhbGlkYXRlQW5zd2VyLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgbGV0IHN1Y2Nlc3M7XG5cbiAgICBjb25zdCB2YWxpZCA9IChhbnN3ZXIgIT09IG51bGwpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBjb25zdCBhZmZpcm1hdGl2ZSA9IGlzQW5zd2VyQWZmaXJtYXRpdmUoYW5zd2VyKTtcblxuICAgICAgc3VjY2VzcyA9IGFmZmlybWF0aXZlID9cbiAgICAgICAgICAgICAgICAgIGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpIDpcbiAgICAgICAgICAgICAgICAgICAgdHJ1ZTsgLy8vXG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjYWxsYmFjayhzdWNjZXNzKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGV4ZWNTeW5jKHNoZWxsQ29tbWFuZHMsIHF1aWV0bHkpIHtcbiAgbGV0IHN1Y2Nlc3M7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBlbmNvZGluZyA9IFVURl84X0VOQ09ESU5HLCAgLy8vXG4gICAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGVuY29kaW5nXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXRwdXQgPSBjaGlsZFByb2Nlc3MuZXhlY1N5bmMoc2hlbGxDb21tYW5kcywgb3B0aW9ucyk7XG5cbiAgICBpZiAoIXF1aWV0bHkpIHtcbiAgICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG91dHB1dCk7XG4gICAgfVxuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgc3VjY2VzcyA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG4iXSwibmFtZXMiOlsiZXhlY3V0ZSIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwiVVRGXzhfRU5DT0RJTkciLCJlbmNvZGluZ3MiLCJzaGVsbENvbW1hbmRzIiwicXVpZXRseSIsImNhbGxiYWNrIiwic3VjY2VzcyIsImV4ZWNTeW5jIiwiYXR0ZW1wdHMiLCJJbmZpbml0eSIsImRlc2NyaXB0aW9uIiwiRkFJTEVEX1NDUklQVF9ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJhbnN3ZXIiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsImVuY29kaW5nIiwib3V0cHV0IiwiY2hpbGRQcm9jZXNzIiwicHJvY2VzcyIsInN0ZG91dCIsIndyaXRlIiwiZXJyb3IiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQWNnQkE7OztlQUFBQTs7O29FQVpTO3lCQUVpQjt3QkFFWDtzQkFDSzt3QkFDRzs0QkFDRzs7Ozs7O0FBRTFDLElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJELFFBQ0YsQUFBRUUsaUJBQW1CQyxvQkFBUyxDQUE1QkQ7QUFFRCxTQUFTSCxRQUFRSyxhQUFhLEVBQUVDLE9BQU8sRUFBRUMsUUFBUTtJQUN0RCxJQUFNQyxVQUFVQyxTQUFTSixlQUFlQztJQUV4QyxJQUFJRSxTQUFTO1FBQ1hELFNBQVNDO1FBRVQ7SUFDRjtJQUVBLElBQU1FLFdBQVdDLFVBQ1hDLGNBQWNDLHVDQUF5QixFQUN2Q0MsZUFBZUMsZ0NBQXNCLEVBQ3JDQyxxQkFBcUJDLHdCQUFjLEVBQ25DQyxVQUFVO1FBQ1JSLFVBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FFLGNBQUFBO1FBQ0FFLG9CQUFBQTtJQUNGO0lBRU5mLE9BQU9pQixTQUFTLFNBQUNDO1FBQ2YsSUFBSVg7UUFFSixJQUFNWSxRQUFTRCxXQUFXO1FBRTFCLElBQUlDLE9BQU87WUFDVCxJQUFNQyxjQUFjQyxJQUFBQSwyQkFBbUIsRUFBQ0g7WUFFeENYLFVBQVVhLGNBQ0VaLFNBQVNKLGVBQWVDLFdBQ3RCLE1BQU0sR0FBRztRQUN6QixPQUFPO1lBQ0xFLFVBQVU7UUFDWjtRQUVBRCxTQUFTQztJQUNYO0FBQ0Y7QUFFQSxTQUFTQyxTQUFTSixhQUFhLEVBQUVDLE9BQU87SUFDdEMsSUFBSUU7SUFFSixJQUFJO1FBQ0YsSUFBTWUsV0FBV3BCLGdCQUNYZSxVQUFVO1lBQ1JLLFVBQUFBO1FBQ0YsR0FDQUMsU0FBU0Msc0JBQVksQ0FBQ2hCLFFBQVEsQ0FBQ0osZUFBZWE7UUFFcEQsSUFBSSxDQUFDWixTQUFTO1lBQ1pvQixRQUFRQyxNQUFNLENBQUNDLEtBQUssQ0FBQ0o7UUFDdkI7UUFFQWhCLFVBQVU7SUFDWixFQUFFLE9BQU9xQixPQUFPO1FBQ2RyQixVQUFVO0lBQ1o7SUFFQSxPQUFPQTtBQUNUIn0=