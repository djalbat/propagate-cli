"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return pollPromptOperation;
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
function pollPromptOperation(proceed, abort, context) {
    var yes = context.yes, diff = context.diff, diffs = context.diffs, quietly = context.quietly, releaseMap = context.releaseMap, names = releaseMap.getNames(), answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.POLL_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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
            diff.poll(names, quietly, function(success) {
                if (!success) {
                    (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
                    console.log(_messages.FAILED_POLL_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
        console.log(_messages.FAILED_POLL_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3BvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgUE9MTF9ZRVNfTk9fREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvY29uc29sZVwiO1xuaW1wb3J0IHsgRkFJTEVEX1BPTExfTUVTU0FHRSwgSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSB9IGZyb20gXCIuLi8uLi9tZXNzYWdlc1wiO1xuXG5jb25zdCB7IHByb21wdCB9ID0gc2hlbGxVdGlsaXRpZXM7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvbGxQcm9tcHRPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyB5ZXMsIGRpZmYsIGRpZmZzLCBxdWlldGx5LCByZWxlYXNlTWFwIH0gPSBjb250ZXh0LFxuICAgICAgICBuYW1lcyA9IHJlbGVhc2VNYXAuZ2V0TmFtZXMoKSxcbiAgICAgICAgYW5zd2VyID0geWVzID9cbiAgICAgICAgICAgICAgICAgICBZRVMgOlxuICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgYXR0ZW1wdHMgPSBJbmZpbml0eSxcbiAgICAgICAgZGVzY3JpcHRpb24gPSBQT0xMX1lFU19OT19ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhbnN3ZXIsXG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgY29uc3QgdmFsaWQgPSAoYW5zd2VyICE9PSBudWxsKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgY29uc3QgYWZmaXJtYXRpdmUgPSBpc0Fuc3dlckFmZmlybWF0aXZlKGFuc3dlcik7XG5cbiAgICAgIGlmICghYWZmaXJtYXRpdmUpIHtcbiAgICAgICAgcHJvY2VlZCgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGlmZi5wb2xsKG5hbWVzLCBxdWlldGx5LCAoc3VjY2VzcykgPT4ge1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyhkaWZmLCBkaWZmcyk7XG5cbiAgICAgICAgICBjb25zb2xlLmxvZyhGQUlMRURfUE9MTF9NRVNTQUdFKTtcblxuICAgICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZWVkKCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZzKGRpZmYsIGRpZmZzKTtcblxuICAgIGNvbnNvbGUubG9nKEZBSUxFRF9QT0xMX01FU1NBR0UpO1xuXG4gICAgYWJvcnQoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsicG9sbFByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInllcyIsImRpZmYiLCJkaWZmcyIsInF1aWV0bHkiLCJyZWxlYXNlTWFwIiwibmFtZXMiLCJnZXROYW1lcyIsImFuc3dlciIsIllFUyIsImF0dGVtcHRzIiwiSW5maW5pdHkiLCJkZXNjcmlwdGlvbiIsIlBPTExfWUVTX05PX0RFU0NSSVBUSU9OIiwiZXJyb3JNZXNzYWdlIiwiSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSIsInZhbGlkYXRpb25GdW5jdGlvbiIsInZhbGlkYXRlQW5zd2VyIiwib3B0aW9ucyIsInZhbGlkIiwiYWZmaXJtYXRpdmUiLCJpc0Fuc3dlckFmZmlybWF0aXZlIiwicG9sbCIsInN1Y2Nlc3MiLCJjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyIsImNvbnNvbGUiLCJsb2ciLCJGQUlMRURfUE9MTF9NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFhQTs7O2VBQXdCQTs7O3lCQVhPO3lCQUVYO3dCQUNXO3NCQUNLOzRCQUNJO3VCQUNHO3dCQUNpQjtBQUU1RCxJQUFNLEFBQUVDLFNBQVdDLHlCQUFjLENBQXpCRDtBQUVPLFNBQVNELG9CQUFvQkcsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDakUsSUFBUUMsTUFBMENELFFBQTFDQyxLQUFLQyxPQUFxQ0YsUUFBckNFLE1BQU1DLFFBQStCSCxRQUEvQkcsT0FBT0MsVUFBd0JKLFFBQXhCSSxTQUFTQyxhQUFlTCxRQUFmSyxZQUM3QkMsUUFBUUQsV0FBV0UsUUFBUSxJQUMzQkMsU0FBU1AsTUFDRVEsY0FBRyxHQUNELE1BQ2JDLFdBQVdDLFVBQ1hDLGNBQWNDLHFDQUF1QixFQUNyQ0MsZUFBZUMsZ0NBQXNCLEVBQ3JDQyxxQkFBcUJDLHdCQUFjLEVBQ25DQyxVQUFVO1FBQ1JWLFFBQUFBO1FBQ0FFLFVBQUFBO1FBQ0FFLGFBQUFBO1FBQ0FFLGNBQUFBO1FBQ0FFLG9CQUFBQTtJQUNGO0lBRU5wQixPQUFPc0IsU0FBUyxTQUFDVjtRQUNmLElBQU1XLFFBQVNYLFdBQVc7UUFFMUIsSUFBSVcsT0FBTztZQUNULElBQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDYjtZQUV4QyxJQUFJLENBQUNZLGFBQWE7Z0JBQ2hCdEI7Z0JBRUE7WUFDRjtZQUVBSSxLQUFLb0IsSUFBSSxDQUFDaEIsT0FBT0YsU0FBUyxTQUFDbUI7Z0JBQ3pCLElBQUksQ0FBQ0EsU0FBUztvQkFDWkMsSUFBQUEsbUNBQTBCLEVBQUN0QixNQUFNQztvQkFFakNzQixRQUFRQyxHQUFHLENBQUNDLDZCQUFtQjtvQkFFL0I1QjtvQkFFQTtnQkFDRjtnQkFFQUQ7WUFDRjtZQUVBO1FBQ0Y7UUFFQTBCLElBQUFBLG1DQUEwQixFQUFDdEIsTUFBTUM7UUFFakNzQixRQUFRQyxHQUFHLENBQUNDLDZCQUFtQjtRQUUvQjVCO0lBQ0Y7QUFDRiJ9