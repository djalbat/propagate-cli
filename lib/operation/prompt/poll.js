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
    const { yes, diff, diffs, quietly } = context, answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.POLL_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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
            diff.poll(quietly, (success)=>{
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3BvbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgUE9MTF9ZRVNfTk9fREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyBGQUlMRURfUE9MTF9NRVNTQUdFLCBJTlZBTElEX0FOU1dFUl9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG9sbFByb21wdE9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCkge1xuICBjb25zdCB7IHllcywgZGlmZiwgZGlmZnMsIHF1aWV0bHkgfSA9IGNvbnRleHQsXG4gICAgICAgIGFuc3dlciA9IHllcyA/XG4gICAgICAgICAgICAgICAgICAgWUVTIDpcbiAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgIGF0dGVtcHRzID0gSW5maW5pdHksXG4gICAgICAgIGRlc2NyaXB0aW9uID0gUE9MTF9ZRVNfTk9fREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfQU5TV0VSX01FU1NBR0UsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IHZhbGlkYXRlQW5zd2VyLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYW5zd2VyLFxuICAgICAgICAgIGF0dGVtcHRzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb25cbiAgICAgICAgfTtcblxuICBwcm9tcHQob3B0aW9ucywgKGFuc3dlcikgPT4ge1xuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBpZiAoIWFmZmlybWF0aXZlKSB7XG4gICAgICAgIHByb2NlZWQoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRpZmYucG9sbChxdWlldGx5LCAoc3VjY2VzcykgPT4ge1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhGQUlMRURfUE9MTF9NRVNTQUdFKTtcblxuICAgICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBwcm9jZWVkKCk7XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKEZBSUxFRF9QT0xMX01FU1NBR0UpO1xuXG4gICAgYWJvcnQoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsicG9sbFByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInllcyIsImRpZmYiLCJkaWZmcyIsInF1aWV0bHkiLCJhbnN3ZXIiLCJZRVMiLCJhdHRlbXB0cyIsIkluZmluaXR5IiwiZGVzY3JpcHRpb24iLCJQT0xMX1lFU19OT19ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsInBvbGwiLCJzdWNjZXNzIiwiY29uc29sZSIsImxvZyIsIkZBSUxFRF9QT0xMX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQVlBOzs7ZUFBd0JBOzs7MkJBVk87MkJBRVg7MEJBQ1c7d0JBQ0s7OEJBQ0k7MEJBQ29CO0FBRTVELE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjO0FBRWxCLFNBQVNGLG9CQUFvQkcsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDakUsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxPQUFPLEVBQUUsR0FBR0osU0FDaENLLFNBQVNKLE1BQ0VLLGNBQUcsR0FDRCxNQUNiQyxXQUFXQyxVQUNYQyxjQUFjQyxxQ0FBdUIsRUFDckNDLGVBQWVDLGdDQUFzQixFQUNyQ0MscUJBQXFCQyx3QkFBYyxFQUNuQ0MsVUFBVTtRQUNSVjtRQUNBRTtRQUNBRTtRQUNBRTtRQUNBRTtJQUNGO0lBRU5qQixPQUFPbUIsU0FBUyxDQUFDVjtRQUNmLE1BQU1XLFFBQVNYLFdBQVc7UUFFMUIsSUFBSVcsT0FBTztZQUNULE1BQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDYjtZQUV4QyxJQUFJLENBQUNZLGFBQWE7Z0JBQ2hCbkI7Z0JBRUE7WUFDRjtZQUVBSSxLQUFLaUIsSUFBSSxDQUFDZixTQUFTLENBQUNnQjtnQkFDbEIsSUFBSSxDQUFDQSxTQUFTO29CQUNaQyxRQUFRQyxHQUFHLENBQUNDLDZCQUFtQjtvQkFFL0J4QjtvQkFFQTtnQkFDRjtnQkFFQUQ7WUFDRjtZQUVBO1FBQ0Y7UUFFQXVCLFFBQVFDLEdBQUcsQ0FBQ0MsNkJBQW1CO1FBRS9CeEI7SUFDRjtBQUNGIn0=