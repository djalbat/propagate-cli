"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return publishPromptOperation;
    }
});
var _necessary = require("necessary");
var _constants = require("../../constants");
var _validate = require("../../utilities/validate");
var _prompt = require("../../utilities/prompt");
var _descriptions = require("../../descriptions");
var _propagate = require("../../utilities/propagate");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function publishPromptOperation(proceed, abort, context) {
    var yes = context.yes, diff = context.diff, diffs = context.diffs, quietly = context.quietly, publishable = diff.isPublishable();
    if (!publishable) {
        proceed();
        return;
    }
    var answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.PUBLISH_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
        answer: answer,
        attempts: attempts,
        description: description,
        errorMessage: errorMessage,
        validationFunction: validationFunction
    };
    prompt(options, function(answer) {
        var valid = answer !== null;
        if (valid) {
            var affirmative = (0, _prompt.isAnswerAffirmative)(answer);
            if (!affirmative) {
                var releaseMap = context.releaseMap, releaseGraph = context.releaseGraph;
                (0, _propagate.removeDependencies)(diff, diffs, releaseMap, releaseGraph);
                (0, _propagate.removeDevDependencies)(diff, diffs, releaseMap, releaseGraph);
                abort();
                return;
            }
            diff.publish(quietly, function(success) {
                if (!success) {
                    console.log(_messages.FAILED_PUBLISH_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        console.log(_messages.FAILED_PUBLISH_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3B1Ymxpc2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgUFVCTElTSF9ZRVNfTk9fREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyByZW1vdmVEZXBlbmRlbmNpZXMsIHJlbW92ZURldkRlcGVuZGVuY2llcyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcHJvcGFnYXRlXCI7XG5pbXBvcnQgeyBGQUlMRURfUFVCTElTSF9NRVNTQUdFLCBJTlZBTElEX0FOU1dFUl9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHVibGlzaFByb21wdE9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCkge1xuICBjb25zdCB7IHllcywgZGlmZiwgZGlmZnMsIHF1aWV0bHkgfSA9IGNvbnRleHQsXG4gICAgICAgIHB1Ymxpc2hhYmxlID0gZGlmZi5pc1B1Ymxpc2hhYmxlKCk7XG5cbiAgaWYgKCFwdWJsaXNoYWJsZSkge1xuICAgIHByb2NlZWQoKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGFuc3dlciA9IHllcyA/XG4gICAgICAgICAgICAgICAgICAgWUVTIDpcbiAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGF0dGVtcHRzID0gSW5maW5pdHksXG4gICAgICAgIGRlc2NyaXB0aW9uID0gUFVCTElTSF9ZRVNfTk9fREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfQU5TV0VSX01FU1NBR0UsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IHZhbGlkYXRlQW5zd2VyLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYW5zd2VyLFxuICAgICAgICAgIGF0dGVtcHRzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb25cbiAgICAgICAgfTtcblxuICBwcm9tcHQob3B0aW9ucywgKGFuc3dlcikgPT4ge1xuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBpZiAoIWFmZmlybWF0aXZlKSB7XG4gICAgICAgIGNvbnN0IHsgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoIH0gPSBjb250ZXh0O1xuXG4gICAgICAgIHJlbW92ZURlcGVuZGVuY2llcyhkaWZmLCBkaWZmcywgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoKTtcblxuICAgICAgICByZW1vdmVEZXZEZXBlbmRlbmNpZXMoZGlmZiwgZGlmZnMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCk7XG5cbiAgICAgICAgYWJvcnQoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRpZmYucHVibGlzaChxdWlldGx5LCAoc3VjY2VzcykgPT4ge1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhGQUlMRURfUFVCTElTSF9NRVNTQUdFKTtcblxuICAgICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZWVkKCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKEZBSUxFRF9QVUJMSVNIX01FU1NBR0UpO1xuXG4gICAgYWJvcnQoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsicHVibGlzaFByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInllcyIsImRpZmYiLCJkaWZmcyIsInF1aWV0bHkiLCJwdWJsaXNoYWJsZSIsImlzUHVibGlzaGFibGUiLCJhbnN3ZXIiLCJZRVMiLCJhdHRlbXB0cyIsIkluZmluaXR5IiwiZGVzY3JpcHRpb24iLCJQVUJMSVNIX1lFU19OT19ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsInJlbGVhc2VNYXAiLCJyZWxlYXNlR3JhcGgiLCJyZW1vdmVEZXBlbmRlbmNpZXMiLCJyZW1vdmVEZXZEZXBlbmRlbmNpZXMiLCJwdWJsaXNoIiwic3VjY2VzcyIsImNvbnNvbGUiLCJsb2ciLCJGQUlMRURfUFVCTElTSF9NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFhQTs7O2VBQXdCQTs7O3lCQVhPO3lCQUVYO3dCQUNXO3NCQUNLOzRCQUNPO3lCQUNlO3dCQUNLO0FBRS9ELElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJEO0FBRU8sU0FBU0QsdUJBQXVCRyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUNwRSxJQUFRQyxNQUE4QkQsUUFBOUJDLEtBQUtDLE9BQXlCRixRQUF6QkUsTUFBTUMsUUFBbUJILFFBQW5CRyxPQUFPQyxVQUFZSixRQUFaSSxTQUNwQkMsY0FBY0gsS0FBS0ksYUFBYTtJQUV0QyxJQUFJLENBQUNELGFBQWE7UUFDaEJQO1FBRUE7SUFDRjtJQUVBLElBQU1TLFNBQVNOLE1BQ0VPLGNBQUcsR0FDRCxNQUNiQyxXQUFXQyxVQUNYQyxjQUFjQyx3Q0FBMEIsRUFDeENDLGVBQWVDLGdDQUFzQixFQUNyQ0MscUJBQXFCQyx3QkFBYyxFQUNuQ0MsVUFBVTtRQUNSVixRQUFBQTtRQUNBRSxVQUFBQTtRQUNBRSxhQUFBQTtRQUNBRSxjQUFBQTtRQUNBRSxvQkFBQUE7SUFDRjtJQUVObkIsT0FBT3FCLFNBQVMsU0FBQ1Y7UUFDZixJQUFNVyxRQUFTWCxXQUFXO1FBRTFCLElBQUlXLE9BQU87WUFDVCxJQUFNQyxjQUFjQyxJQUFBQSwyQkFBbUIsRUFBQ2I7WUFFeEMsSUFBSSxDQUFDWSxhQUFhO2dCQUNoQixJQUFRRSxhQUE2QnJCLFFBQTdCcUIsWUFBWUMsZUFBaUJ0QixRQUFqQnNCO2dCQUVwQkMsSUFBQUEsNkJBQWtCLEVBQUNyQixNQUFNQyxPQUFPa0IsWUFBWUM7Z0JBRTVDRSxJQUFBQSxnQ0FBcUIsRUFBQ3RCLE1BQU1DLE9BQU9rQixZQUFZQztnQkFFL0N2QjtnQkFFQTtZQUNGO1lBRUFHLEtBQUt1QixPQUFPLENBQUNyQixTQUFTLFNBQUNzQjtnQkFDckIsSUFBSSxDQUFDQSxTQUFTO29CQUNaQyxRQUFRQyxHQUFHLENBQUNDLGdDQUFzQjtvQkFFbEM5QjtvQkFFQTtnQkFDRjtnQkFFQUQ7WUFDRjtZQUVBO1FBQ0Y7UUFFQTZCLFFBQVFDLEdBQUcsQ0FBQ0MsZ0NBQXNCO1FBRWxDOUI7SUFDRjtBQUNGIn0=