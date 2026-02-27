"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return savePromptOperation;
    }
});
const _necessary = require("necessary");
const _constants = require("../../constants");
const _validate = require("../../utilities/validate");
const _prompt = require("../../utilities/prompt");
const _descriptions = require("../../descriptions");
const _propagate = require("../../utilities/propagate");
const _messages = require("../../messages");
const { prompt } = _necessary.shellUtilities;
function savePromptOperation(proceed, abort, context) {
    const { yes, diff, diffs } = context, diffString = diff.asString();
    console.log(diffString);
    const answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.SAVE_UPDATES_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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
                const { releaseMap, releaseGraph } = context;
                (0, _propagate.removeDependencies)(diff, diffs, releaseMap, releaseGraph);
                (0, _propagate.removeDevDependencies)(diff, diffs, releaseMap, releaseGraph);
                abort();
                return;
            }
            const success = diff.save();
            if (!success) {
                console.log(_messages.FAILED_SAVE_MESSAGE);
                abort();
                return;
            }
            proceed();
            return;
        }
        console.log(_messages.FAILED_SAVE_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3NhdmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgU0FWRV9VUERBVEVTX1lFU19OT19ERVNDUklQVElPTiB9IGZyb20gXCIuLi8uLi9kZXNjcmlwdGlvbnNcIjtcbmltcG9ydCB7IHJlbW92ZURlcGVuZGVuY2llcywgcmVtb3ZlRGV2RGVwZW5kZW5jaWVzIH0gZnJvbSBcIi4uLy4uL3V0aWxpdGllcy9wcm9wYWdhdGVcIjtcbmltcG9ydCB7IEZBSUxFRF9TQVZFX01FU1NBR0UsIElOVkFMSURfQU5TV0VSX01FU1NBR0UgfSBmcm9tIFwiLi4vLi4vbWVzc2FnZXNcIjtcblxuY29uc3QgeyBwcm9tcHQgfSA9IHNoZWxsVXRpbGl0aWVzO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzYXZlUHJvbXB0T3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IHsgeWVzLCBkaWZmLCBkaWZmcyB9ID0gY29udGV4dCxcbiAgICAgICAgZGlmZlN0cmluZyA9IGRpZmYuYXNTdHJpbmcoKTtcblxuICBjb25zb2xlLmxvZyhkaWZmU3RyaW5nKTtcblxuICBjb25zdCBhbnN3ZXIgPSB5ZXMgP1xuICAgICAgICAgICAgICAgICAgIFlFUyA6XG4gICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICBhdHRlbXB0cyA9IEluZmluaXR5LFxuICAgICAgICBkZXNjcmlwdGlvbiA9IFNBVkVfVVBEQVRFU19ZRVNfTk9fREVTQ1JJUFRJT04sXG4gICAgICAgIGVycm9yTWVzc2FnZSA9IElOVkFMSURfQU5TV0VSX01FU1NBR0UsXG4gICAgICAgIHZhbGlkYXRpb25GdW5jdGlvbiA9IHZhbGlkYXRlQW5zd2VyLCAgLy8vXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgYW5zd2VyLFxuICAgICAgICAgIGF0dGVtcHRzLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb25cbiAgICAgICAgfTtcblxuICBwcm9tcHQob3B0aW9ucywgKGFuc3dlcikgPT4ge1xuICAgIGNvbnN0IHZhbGlkID0gKGFuc3dlciAhPT0gbnVsbCk7XG5cbiAgICBpZiAodmFsaWQpIHtcbiAgICAgIGNvbnN0IGFmZmlybWF0aXZlID0gaXNBbnN3ZXJBZmZpcm1hdGl2ZShhbnN3ZXIpO1xuXG4gICAgICBpZiAoIWFmZmlybWF0aXZlKSB7XG4gICAgICAgIGNvbnN0IHsgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoIH0gPSBjb250ZXh0O1xuXG4gICAgICAgIHJlbW92ZURlcGVuZGVuY2llcyhkaWZmLCBkaWZmcywgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoKTtcblxuICAgICAgICByZW1vdmVEZXZEZXBlbmRlbmNpZXMoZGlmZiwgZGlmZnMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCk7XG5cbiAgICAgICAgYWJvcnQoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBkaWZmLnNhdmUoKTtcblxuICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEZBSUxFRF9TQVZFX01FU1NBR0UpO1xuXG4gICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwcm9jZWVkKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zb2xlLmxvZyhGQUlMRURfU0FWRV9NRVNTQUdFKTtcblxuICAgIGFib3J0KCk7XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbInNhdmVQcm9tcHRPcGVyYXRpb24iLCJwcm9tcHQiLCJzaGVsbFV0aWxpdGllcyIsInByb2NlZWQiLCJhYm9ydCIsImNvbnRleHQiLCJ5ZXMiLCJkaWZmIiwiZGlmZnMiLCJkaWZmU3RyaW5nIiwiYXNTdHJpbmciLCJjb25zb2xlIiwibG9nIiwiYW5zd2VyIiwiWUVTIiwiYXR0ZW1wdHMiLCJJbmZpbml0eSIsImRlc2NyaXB0aW9uIiwiU0FWRV9VUERBVEVTX1lFU19OT19ERVNDUklQVElPTiIsImVycm9yTWVzc2FnZSIsIklOVkFMSURfQU5TV0VSX01FU1NBR0UiLCJ2YWxpZGF0aW9uRnVuY3Rpb24iLCJ2YWxpZGF0ZUFuc3dlciIsIm9wdGlvbnMiLCJ2YWxpZCIsImFmZmlybWF0aXZlIiwiaXNBbnN3ZXJBZmZpcm1hdGl2ZSIsInJlbGVhc2VNYXAiLCJyZWxlYXNlR3JhcGgiLCJyZW1vdmVEZXBlbmRlbmNpZXMiLCJyZW1vdmVEZXZEZXBlbmRlbmNpZXMiLCJzdWNjZXNzIiwic2F2ZSIsIkZBSUxFRF9TQVZFX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQWFBOzs7ZUFBd0JBOzs7MkJBWE87MkJBRVg7MEJBQ1c7d0JBQ0s7OEJBQ1k7MkJBQ1U7MEJBQ0U7QUFFNUQsTUFBTSxFQUFFQyxNQUFNLEVBQUUsR0FBR0MseUJBQWM7QUFFbEIsU0FBU0Ysb0JBQW9CRyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUNqRSxNQUFNLEVBQUVDLEdBQUcsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FBR0gsU0FDdkJJLGFBQWFGLEtBQUtHLFFBQVE7SUFFaENDLFFBQVFDLEdBQUcsQ0FBQ0g7SUFFWixNQUFNSSxTQUFTUCxNQUNFUSxjQUFHLEdBQ0QsTUFDYkMsV0FBV0MsVUFDWEMsY0FBY0MsNkNBQStCLEVBQzdDQyxlQUFlQyxnQ0FBc0IsRUFDckNDLHFCQUFxQkMsd0JBQWMsRUFDbkNDLFVBQVU7UUFDUlY7UUFDQUU7UUFDQUU7UUFDQUU7UUFDQUU7SUFDRjtJQUVOcEIsT0FBT3NCLFNBQVMsQ0FBQ1Y7UUFDZixNQUFNVyxRQUFTWCxXQUFXO1FBRTFCLElBQUlXLE9BQU87WUFDVCxNQUFNQyxjQUFjQyxJQUFBQSwyQkFBbUIsRUFBQ2I7WUFFeEMsSUFBSSxDQUFDWSxhQUFhO2dCQUNoQixNQUFNLEVBQUVFLFVBQVUsRUFBRUMsWUFBWSxFQUFFLEdBQUd2QjtnQkFFckN3QixJQUFBQSw2QkFBa0IsRUFBQ3RCLE1BQU1DLE9BQU9tQixZQUFZQztnQkFFNUNFLElBQUFBLGdDQUFxQixFQUFDdkIsTUFBTUMsT0FBT21CLFlBQVlDO2dCQUUvQ3hCO2dCQUVBO1lBQ0Y7WUFFQSxNQUFNMkIsVUFBVXhCLEtBQUt5QixJQUFJO1lBRXpCLElBQUksQ0FBQ0QsU0FBUztnQkFDWnBCLFFBQVFDLEdBQUcsQ0FBQ3FCLDZCQUFtQjtnQkFFL0I3QjtnQkFFQTtZQUNGO1lBRUFEO1lBRUE7UUFDRjtRQUVBUSxRQUFRQyxHQUFHLENBQUNxQiw2QkFBbUI7UUFFL0I3QjtJQUNGO0FBQ0YifQ==