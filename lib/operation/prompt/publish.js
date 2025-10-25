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
var _console = require("../../utilities/console");
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
                    (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
                    console.log(_messages.FAILED_PUBLISH_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
        console.log(_messages.FAILED_PUBLISH_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3B1Ymxpc2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgUFVCTElTSF9ZRVNfTk9fREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvY29uc29sZVwiO1xuaW1wb3J0IHsgcmVtb3ZlRGVwZW5kZW5jaWVzLCByZW1vdmVEZXZEZXBlbmRlbmNpZXMgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb3BhZ2F0ZVwiO1xuaW1wb3J0IHsgRkFJTEVEX1BVQkxJU0hfTUVTU0FHRSwgSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSB9IGZyb20gXCIuLi8uLi9tZXNzYWdlc1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHB1Ymxpc2hQcm9tcHRPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyB5ZXMsIGRpZmYsIGRpZmZzLCBxdWlldGx5IH0gPSBjb250ZXh0LFxuICAgICAgICBwdWJsaXNoYWJsZSA9IGRpZmYuaXNQdWJsaXNoYWJsZSgpO1xuXG4gIGlmICghcHVibGlzaGFibGUpIHtcbiAgICBwcm9jZWVkKCk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhbnN3ZXIgPSB5ZXMgP1xuICAgICAgICAgICAgICAgICAgIFlFUyA6XG4gICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICBhdHRlbXB0cyA9IEluZmluaXR5LFxuICAgICAgICBkZXNjcmlwdGlvbiA9IFBVQkxJU0hfWUVTX05PX0RFU0NSSVBUSU9OLFxuICAgICAgICBlcnJvck1lc3NhZ2UgPSBJTlZBTElEX0FOU1dFUl9NRVNTQUdFLFxuICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24gPSB2YWxpZGF0ZUFuc3dlciwgIC8vL1xuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIGFuc3dlcixcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBjb25zdCB2YWxpZCA9IChhbnN3ZXIgIT09IG51bGwpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBjb25zdCBhZmZpcm1hdGl2ZSA9IGlzQW5zd2VyQWZmaXJtYXRpdmUoYW5zd2VyKTtcblxuICAgICAgaWYgKCFhZmZpcm1hdGl2ZSkge1xuICAgICAgICBjb25zdCB7IHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCB9ID0gY29udGV4dDtcblxuICAgICAgICByZW1vdmVEZXBlbmRlbmNpZXMoZGlmZiwgZGlmZnMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCk7XG5cbiAgICAgICAgcmVtb3ZlRGV2RGVwZW5kZW5jaWVzKGRpZmYsIGRpZmZzLCByZWxlYXNlTWFwLCByZWxlYXNlR3JhcGgpO1xuXG4gICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkaWZmLnB1Ymxpc2gocXVpZXRseSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMoZGlmZiwgZGlmZnMpO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coRkFJTEVEX1BVQkxJU0hfTUVTU0FHRSk7XG5cbiAgICAgICAgICBhYm9ydCgpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2VlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyhkaWZmLCBkaWZmcyk7XG5cbiAgICBjb25zb2xlLmxvZyhGQUlMRURfUFVCTElTSF9NRVNTQUdFKTtcblxuICAgIGFib3J0KCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbInB1Ymxpc2hQcm9tcHRPcGVyYXRpb24iLCJwcm9tcHQiLCJzaGVsbFV0aWxpdGllcyIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJ5ZXMiLCJkaWZmIiwiZGlmZnMiLCJxdWlldGx5IiwicHVibGlzaGFibGUiLCJpc1B1Ymxpc2hhYmxlIiwiYW5zd2VyIiwiWUVTIiwiYXR0ZW1wdHMiLCJJbmZpbml0eSIsImRlc2NyaXB0aW9uIiwiUFVCTElTSF9ZRVNfTk9fREVTQ1JJUFRJT04iLCJlcnJvck1lc3NhZ2UiLCJJTlZBTElEX0FOU1dFUl9NRVNTQUdFIiwidmFsaWRhdGlvbkZ1bmN0aW9uIiwidmFsaWRhdGVBbnN3ZXIiLCJvcHRpb25zIiwidmFsaWQiLCJhZmZpcm1hdGl2ZSIsImlzQW5zd2VyQWZmaXJtYXRpdmUiLCJyZWxlYXNlTWFwIiwicmVsZWFzZUdyYXBoIiwicmVtb3ZlRGVwZW5kZW5jaWVzIiwicmVtb3ZlRGV2RGVwZW5kZW5jaWVzIiwicHVibGlzaCIsInN1Y2Nlc3MiLCJjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyIsImNvbnNvbGUiLCJsb2ciLCJGQUlMRURfUFVCTElTSF9NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFjQTs7O2VBQXdCQTs7O3lCQVpPO3lCQUVYO3dCQUNXO3NCQUNLOzRCQUNPO3VCQUNBO3lCQUNlO3dCQUNLO0FBRS9ELElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJEO0FBRU8sU0FBU0QsdUJBQXVCRyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUNwRSxJQUFRQyxNQUE4QkQsUUFBOUJDLEtBQUtDLE9BQXlCRixRQUF6QkUsTUFBTUMsUUFBbUJILFFBQW5CRyxPQUFPQyxVQUFZSixRQUFaSSxTQUNwQkMsY0FBY0gsS0FBS0ksYUFBYTtJQUV0QyxJQUFJLENBQUNELGFBQWE7UUFDaEJQO1FBRUE7SUFDRjtJQUVBLElBQU1TLFNBQVNOLE1BQ0VPLGNBQUcsR0FDRCxNQUNiQyxXQUFXQyxVQUNYQyxjQUFjQyx3Q0FBMEIsRUFDeENDLGVBQWVDLGdDQUFzQixFQUNyQ0MscUJBQXFCQyx3QkFBYyxFQUNuQ0MsVUFBVTtRQUNSVixRQUFBQTtRQUNBRSxVQUFBQTtRQUNBRSxhQUFBQTtRQUNBRSxjQUFBQTtRQUNBRSxvQkFBQUE7SUFDRjtJQUVObkIsT0FBT3FCLFNBQVMsU0FBQ1Y7UUFDZixJQUFNVyxRQUFTWCxXQUFXO1FBRTFCLElBQUlXLE9BQU87WUFDVCxJQUFNQyxjQUFjQyxJQUFBQSwyQkFBbUIsRUFBQ2I7WUFFeEMsSUFBSSxDQUFDWSxhQUFhO2dCQUNoQixJQUFRRSxhQUE2QnJCLFFBQTdCcUIsWUFBWUMsZUFBaUJ0QixRQUFqQnNCO2dCQUVwQkMsSUFBQUEsNkJBQWtCLEVBQUNyQixNQUFNQyxPQUFPa0IsWUFBWUM7Z0JBRTVDRSxJQUFBQSxnQ0FBcUIsRUFBQ3RCLE1BQU1DLE9BQU9rQixZQUFZQztnQkFFL0N2QjtnQkFFQTtZQUNGO1lBRUFHLEtBQUt1QixPQUFPLENBQUNyQixTQUFTLFNBQUNzQjtnQkFDckIsSUFBSSxDQUFDQSxTQUFTO29CQUNaQyxJQUFBQSxtQ0FBMEIsRUFBQ3pCLE1BQU1DO29CQUVqQ3lCLFFBQVFDLEdBQUcsQ0FBQ0MsZ0NBQXNCO29CQUVsQy9CO29CQUVBO2dCQUNGO2dCQUVBRDtZQUNGO1lBRUE7UUFDRjtRQUVBNkIsSUFBQUEsbUNBQTBCLEVBQUN6QixNQUFNQztRQUVqQ3lCLFFBQVFDLEdBQUcsQ0FBQ0MsZ0NBQXNCO1FBRWxDL0I7SUFDRjtBQUNGIn0=