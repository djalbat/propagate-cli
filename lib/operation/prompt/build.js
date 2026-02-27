"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return buildPromptOperation;
    }
});
const _necessary = require("necessary");
const _constants = require("../../constants");
const _validate = require("../../utilities/validate");
const _prompt = require("../../utilities/prompt");
const _descriptions = require("../../descriptions");
const _messages = require("../../messages");
const { prompt } = _necessary.shellUtilities;
function buildPromptOperation(proceed, abort, context) {
    const { yes, diff, diffs, quietly } = context, answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.BUILD_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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
            diff.build(quietly, (success)=>{
                if (!success) {
                    console.log(_messages.FAILED_BUILD_MESSAGE);
                    abort();
                    return;
                }
                proceed();
            });
            return;
        }
        console.log(_messages.FAILED_BUILD_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L2J1aWxkLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBzaGVsbFV0aWxpdGllcyB9IGZyb20gXCJuZWNlc3NhcnlcIjtcblxuaW1wb3J0IHsgWUVTIH0gZnJvbSBcIi4uLy4uL2NvbnN0YW50c1wiO1xuaW1wb3J0IHsgdmFsaWRhdGVBbnN3ZXIgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3ZhbGlkYXRlXCI7XG5pbXBvcnQgeyBpc0Fuc3dlckFmZmlybWF0aXZlIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9wcm9tcHRcIjtcbmltcG9ydCB7IEJVSUxEX1lFU19OT19ERVNDUklQVElPTiB9IGZyb20gXCIuLi8uLi9kZXNjcmlwdGlvbnNcIjtcbmltcG9ydCB7IEZBSUxFRF9CVUlMRF9NRVNTQUdFLCBJTlZBTElEX0FOU1dFUl9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRQcm9tcHRPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyB5ZXMsIGRpZmYsIGRpZmZzLCBxdWlldGx5IH0gPSBjb250ZXh0LFxuICAgICAgICBhbnN3ZXIgPSB5ZXMgP1xuICAgICAgICAgICAgICAgICAgIFlFUyA6XG4gICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICBhdHRlbXB0cyA9IEluZmluaXR5LFxuICAgICAgICBkZXNjcmlwdGlvbiA9IEJVSUxEX1lFU19OT19ERVNDUklQVElPTixcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSxcbiAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uID0gdmFsaWRhdGVBbnN3ZXIsICAvLy9cbiAgICAgICAgb3B0aW9ucyA9IHtcbiAgICAgICAgICBhbnN3ZXIsXG4gICAgICAgICAgYXR0ZW1wdHMsXG4gICAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIHZhbGlkYXRpb25GdW5jdGlvblxuICAgICAgICB9O1xuXG4gIHByb21wdChvcHRpb25zLCAoYW5zd2VyKSA9PiB7XG4gICAgY29uc3QgdmFsaWQgPSAoYW5zd2VyICE9PSBudWxsKTtcblxuICAgIGlmICh2YWxpZCkge1xuICAgICAgY29uc3QgYWZmaXJtYXRpdmUgPSBpc0Fuc3dlckFmZmlybWF0aXZlKGFuc3dlcik7XG5cbiAgICAgIGlmICghYWZmaXJtYXRpdmUpIHtcbiAgICAgICAgcHJvY2VlZCgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGlmZi5idWlsZChxdWlldGx5LCAoc3VjY2VzcykgPT4ge1xuICAgICAgICBpZiAoIXN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhGQUlMRURfQlVJTERfTUVTU0FHRSk7XG5cbiAgICAgICAgICBhYm9ydCgpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvY2VlZCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhGQUlMRURfQlVJTERfTUVTU0FHRSk7XG5cbiAgICBhYm9ydCgpO1xuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJidWlsZFByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInllcyIsImRpZmYiLCJkaWZmcyIsInF1aWV0bHkiLCJhbnN3ZXIiLCJZRVMiLCJhdHRlbXB0cyIsIkluZmluaXR5IiwiZGVzY3JpcHRpb24iLCJCVUlMRF9ZRVNfTk9fREVTQ1JJUFRJT04iLCJlcnJvck1lc3NhZ2UiLCJJTlZBTElEX0FOU1dFUl9NRVNTQUdFIiwidmFsaWRhdGlvbkZ1bmN0aW9uIiwidmFsaWRhdGVBbnN3ZXIiLCJvcHRpb25zIiwidmFsaWQiLCJhZmZpcm1hdGl2ZSIsImlzQW5zd2VyQWZmaXJtYXRpdmUiLCJidWlsZCIsInN1Y2Nlc3MiLCJjb25zb2xlIiwibG9nIiwiRkFJTEVEX0JVSUxEX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQVlBOzs7ZUFBd0JBOzs7MkJBVk87MkJBRVg7MEJBQ1c7d0JBQ0s7OEJBQ0s7MEJBQ29CO0FBRTdELE1BQU0sRUFBRUMsTUFBTSxFQUFFLEdBQUdDLHlCQUFjO0FBRWxCLFNBQVNGLHFCQUFxQkcsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDbEUsTUFBTSxFQUFFQyxHQUFHLEVBQUVDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxPQUFPLEVBQUUsR0FBR0osU0FDaENLLFNBQVNKLE1BQ0VLLGNBQUcsR0FDRCxNQUNiQyxXQUFXQyxVQUNYQyxjQUFjQyxzQ0FBd0IsRUFDdENDLGVBQWVDLGdDQUFzQixFQUNyQ0MscUJBQXFCQyx3QkFBYyxFQUNuQ0MsVUFBVTtRQUNSVjtRQUNBRTtRQUNBRTtRQUNBRTtRQUNBRTtJQUNGO0lBRU5qQixPQUFPbUIsU0FBUyxDQUFDVjtRQUNmLE1BQU1XLFFBQVNYLFdBQVc7UUFFMUIsSUFBSVcsT0FBTztZQUNULE1BQU1DLGNBQWNDLElBQUFBLDJCQUFtQixFQUFDYjtZQUV4QyxJQUFJLENBQUNZLGFBQWE7Z0JBQ2hCbkI7Z0JBRUE7WUFDRjtZQUVBSSxLQUFLaUIsS0FBSyxDQUFDZixTQUFTLENBQUNnQjtnQkFDbkIsSUFBSSxDQUFDQSxTQUFTO29CQUNaQyxRQUFRQyxHQUFHLENBQUNDLDhCQUFvQjtvQkFFaEN4QjtvQkFFQTtnQkFDRjtnQkFFQUQ7WUFDRjtZQUVBO1FBQ0Y7UUFFQXVCLFFBQVFDLEdBQUcsQ0FBQ0MsOEJBQW9CO1FBRWhDeEI7SUFDRjtBQUNGIn0=