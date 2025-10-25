"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return installPromptOperation;
    }
});
var _necessary = require("necessary");
var _constants = require("../../constants");
var _validate = require("../../utilities/validate");
var _prompt = require("../../utilities/prompt");
var _descriptions = require("../../descriptions");
var _console = require("../../utilities/console");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function installPromptOperation(proceed, abort, context) {
    var yes = context.yes, diff = context.diff, diffs = context.diffs, quietly = context.quietly, answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.INSTALL_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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
                proceed();
                return;
            }
            diff.install(quietly, function(success) {
                if (!success) {
                    (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
                    console.log(_messages.FAILED_INSTALL_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
        console.log(_messages.FAILED_INSTALL_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2luc3RhbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgSU5TVEFMTF9ZRVNfTk9fREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvY29uc29sZVwiO1xuaW1wb3J0IHsgRkFJTEVEX0lOU1RBTExfTUVTU0FHRSwgSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSB9IGZyb20gXCIuLi8uLi9tZXNzYWdlc1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc3RhbGxQcm9tcHRPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyB5ZXMsIGRpZmYsIGRpZmZzLCBxdWlldGx5IH0gPSBjb250ZXh0LFxuICAgICAgICBhbnN3ZXIgPSB5ZXMgP1xuICAgICAgICAgICAgICAgICAgIFlFUyA6XG4gICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICBhdHRlbXB0cyA9IEluZmluaXR5LFxuICAgICAgICBkZXNjcmlwdGlvbiA9IElOU1RBTExfWUVTX05PX0RFU0NSSVBUSU9OLFxuICAgICAgICBlcnJvck1lc3NhZ2UgPSBJTlZBTElEX0FOU1dFUl9NRVNTQUdFLFxuICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24gPSB2YWxpZGF0ZUFuc3dlciwgIC8vL1xuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIGFuc3dlcixcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBjb25zdCB2YWxpZCA9IChhbnN3ZXIgIT09IG51bGwpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBjb25zdCBhZmZpcm1hdGl2ZSA9IGlzQW5zd2VyQWZmaXJtYXRpdmUoYW5zd2VyKTtcblxuICAgICAgaWYgKCFhZmZpcm1hdGl2ZSkge1xuICAgICAgICBwcm9jZWVkKCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkaWZmLmluc3RhbGwocXVpZXRseSwgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMoZGlmZiwgZGlmZnMpO1xuXG4gICAgICAgICAgY29uc29sZS5sb2coRkFJTEVEX0lOU1RBTExfTUVTU0FHRSk7XG5cbiAgICAgICAgICBhYm9ydCgpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2VlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyhkaWZmLCBkaWZmcyk7XG5cbiAgICBjb25zb2xlLmxvZyhGQUlMRURfSU5TVEFMTF9NRVNTQUdFKTtcblxuICAgIGFib3J0KCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImluc3RhbGxQcm9tcHRPcGVyYXRpb24iLCJwcm9tcHQiLCJzaGVsbFV0aWxpdGllcyIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJ5ZXMiLCJkaWZmIiwiZGlmZnMiLCJxdWlldGx5IiwiYW5zd2VyIiwiWUVTIiwiYXR0ZW1wdHMiLCJJbmZpbml0eSIsImRlc2NyaXB0aW9uIiwiSU5TVEFMTF9ZRVNfTk9fREVTQ1JJUFRJT04iLCJlcnJvck1lc3NhZ2UiLCJJTlZBTElEX0FOU1dFUl9NRVNTQUdFIiwidmFsaWRhdGlvbkZ1bmN0aW9uIiwidmFsaWRhdGVBbnN3ZXIiLCJvcHRpb25zIiwidmFsaWQiLCJhZmZpcm1hdGl2ZSIsImlzQW5zd2VyQWZmaXJtYXRpdmUiLCJpbnN0YWxsIiwic3VjY2VzcyIsImNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZzIiwiY29uc29sZSIsImxvZyIsIkZBSUxFRF9JTlNUQUxMX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQWFBOzs7ZUFBd0JBOzs7eUJBWE87eUJBRVg7d0JBQ1c7c0JBQ0s7NEJBQ087dUJBQ0E7d0JBQ29CO0FBRS9ELElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJEO0FBRU8sU0FBU0QsdUJBQXVCRyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUNwRSxJQUFRQyxNQUE4QkQsUUFBOUJDLEtBQUtDLE9BQXlCRixRQUF6QkUsTUFBTUMsUUFBbUJILFFBQW5CRyxPQUFPQyxVQUFZSixRQUFaSSxTQUNwQkMsU0FBU0osTUFDRUssY0FBRyxHQUNELE1BQ2JDLFdBQVdDLFVBQ1hDLGNBQWNDLHdDQUEwQixFQUN4Q0MsZUFBZUMsZ0NBQXNCLEVBQ3JDQyxxQkFBcUJDLHdCQUFjLEVBQ25DQyxVQUFVO1FBQ1JWLFFBQUFBO1FBQ0FFLFVBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FFLGNBQUFBO1FBQ0FFLG9CQUFBQTtJQUNGO0lBRU5qQixPQUFPbUIsU0FBUyxTQUFDVjtRQUNmLElBQU1XLFFBQVNYLFdBQVc7UUFFMUIsSUFBSVcsT0FBTztZQUNULElBQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDYjtZQUV4QyxJQUFJLENBQUNZLGFBQWE7Z0JBQ2hCbkI7Z0JBRUE7WUFDRjtZQUVBSSxLQUFLaUIsT0FBTyxDQUFDZixTQUFTLFNBQUNnQjtnQkFDckIsSUFBSSxDQUFDQSxTQUFTO29CQUNaQyxJQUFBQSxtQ0FBMEIsRUFBQ25CLE1BQU1DO29CQUVqQ21CLFFBQVFDLEdBQUcsQ0FBQ0MsZ0NBQXNCO29CQUVsQ3pCO29CQUVBO2dCQUNGO2dCQUVBRDtZQUNGO1lBRUE7UUFDRjtRQUVBdUIsSUFBQUEsbUNBQTBCLEVBQUNuQixNQUFNQztRQUVqQ21CLFFBQVFDLEdBQUcsQ0FBQ0MsZ0NBQXNCO1FBRWxDekI7SUFDRjtBQUNGIn0=