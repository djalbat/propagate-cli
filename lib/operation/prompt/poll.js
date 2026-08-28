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
const _necessary = require("necessary");
const _constants = require("../../constants");
const _validate = require("../../utilities/validate");
const _prompt = require("../../utilities/prompt");
const _descriptions = require("../../descriptions");
const _messages = require("../../messages");
const { prompt } = _necessary.shellUtilities;
function pollPromptOperation(proceed, abort, context) {
    const { yes, diff } = context, answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.POLL_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
        answer,
        attempts,
        description,
        errorMessage,
        validationFunction
    };
    prompt(options, (answer)=>{
        const valid = answer !== null;
        if (valid) {
            const affirmative = (0, _prompt.isAnswerAffirmative)(answer);
            if (!affirmative) {
                proceed();
                return;
            }
            const { quietly, delay, attempts } = context;
            diff.poll(quietly, delay, attempts, (success)=>{
                if (!success) {
                    console.log(_messages.FAILED_POLL_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        console.log(_messages.FAILED_POLL_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3BvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgUE9MTF9ZRVNfTk9fREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBGQUlMRURfUE9MTF9NRVNTQUdFLCBJTlZBTElEX0FOU1dFUl9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9sbFByb21wdE9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCkge1xuICBjb25zdCB7IHllcywgZGlmZiB9ID0gY29udGV4dCxcbiAgICAgICAgYW5zd2VyID0geWVzID9cbiAgICAgICAgICAgICAgICAgICBZRVMgOlxuICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgYXR0ZW1wdHMgPSBJbmZpbml0eSxcbiAgICAgICAgZGVzY3JpcHRpb24gPSBQT0xMX1lFU19OT19ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhbnN3ZXIsXG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgY29uc3QgdmFsaWQgPSAoYW5zd2VyICE9PSBudWxsKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgY29uc3QgYWZmaXJtYXRpdmUgPSBpc0Fuc3dlckFmZmlybWF0aXZlKGFuc3dlcik7XG5cbiAgICAgIGlmICghYWZmaXJtYXRpdmUpIHtcbiAgICAgICAgcHJvY2VlZCgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBxdWlldGx5LCBkZWxheSwgYXR0ZW1wdHMgfSA9IGNvbnRleHQ7XG5cbiAgICAgIGRpZmYucG9sbChxdWlldGx5LCBkZWxheSwgYXR0ZW1wdHMsIChzdWNjZXNzKSA9PiB7XG4gICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKEZBSUxFRF9QT0xMX01FU1NBR0UpO1xuXG4gICAgICAgICAgYWJvcnQoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb2NlZWQoKTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coRkFJTEVEX1BPTExfTUVTU0FHRSk7XG5cbiAgICBhYm9ydCgpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJwb2xsUHJvbXB0T3BlcmF0aW9uIiwicHJvbXB0Iiwic2hlbGxVdGlsaXRpZXMiLCJwcm9jZWVkIiwiYWJvcnQiLCJjb250ZXh0IiwieWVzIiwiZGlmZiIsImFuc3dlciIsIllFUyIsImF0dGVtcHRzIiwiSW5maW5pdHkiLCJkZXNjcmlwdGlvbiIsIlBPTExfWUVTX05PX0RFU0NSSVBUSU9OIiwiZXJyb3JNZXNzYWdlIiwiSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSIsInZhbGlkYXRpb25GdW5jdGlvbiIsInZhbGlkYXRlQW5zd2VyIiwib3B0aW9ucyIsInZhbGlkIiwiYWZmaXJtYXRpdmUiLCJpc0Fuc3dlckFmZmlybWF0aXZlIiwicXVpZXRseSIsImRlbGF5IiwicG9sbCIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiRkFJTEVEX1BPTExfTUVTU0FHRSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBWUE7OztlQUF3QkE7OzsyQkFWTzsyQkFFWDswQkFDVzt3QkFDSzs4QkFDSTswQkFDb0I7QUFFNUQsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBR0MseUJBQWM7QUFFbEIsU0FBU0Ysb0JBQW9CRyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUNqRSxNQUFNLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFLEdBQUdGLFNBQ2hCRyxTQUFTRixNQUNFRyxjQUFHLEdBQ0QsTUFDYkMsV0FBV0MsVUFDWEMsY0FBY0MscUNBQXVCLEVBQ3JDQyxlQUFlQyxnQ0FBc0IsRUFDckNDLHFCQUFxQkMsd0JBQWMsRUFDbkNDLFVBQVU7UUFDUlY7UUFDQUU7UUFDQUU7UUFDQUU7UUFDQUU7SUFDRjtJQUVOZixPQUFPaUIsU0FBUyxDQUFDVjtRQUNmLE1BQU1XLFFBQVNYLFdBQVc7UUFFMUIsSUFBSVcsT0FBTztZQUNULE1BQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDYjtZQUV4QyxJQUFJLENBQUNZLGFBQWE7Z0JBQ2hCakI7Z0JBRUE7WUFDRjtZQUVBLE1BQU0sRUFBRW1CLE9BQU8sRUFBRUMsS0FBSyxFQUFFYixRQUFRLEVBQUUsR0FBR0w7WUFFckNFLEtBQUtpQixJQUFJLENBQUNGLFNBQVNDLE9BQU9iLFVBQVUsQ0FBQ2U7Z0JBQ25DLElBQUksQ0FBQ0EsU0FBUztvQkFDWkMsUUFBUUMsR0FBRyxDQUFDQyw2QkFBbUI7b0JBRS9CeEI7b0JBRUE7Z0JBQ0Y7Z0JBRUFEO1lBQ0Y7WUFFQTtRQUNGO1FBRUF1QixRQUFRQyxHQUFHLENBQUNDLDZCQUFtQjtRQUUvQnhCO0lBQ0Y7QUFDRiJ9