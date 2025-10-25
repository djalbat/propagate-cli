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
var _necessary = require("necessary");
var _constants = require("../../constants");
var _validate = require("../../utilities/validate");
var _prompt = require("../../utilities/prompt");
var _console = require("../../utilities/console");
var _descriptions = require("../../descriptions");
var _propagate = require("../../utilities/propagate");
var _messages = require("../../messages");
var prompt = _necessary.shellUtilities.prompt;
function savePromptOperation(proceed, abort, context) {
    var yes = context.yes, diff = context.diff, diffs = context.diffs, diffString = diff.asString();
    console.log(diffString);
    var answer = yes ? _constants.YES : null, attempts = Infinity, description = _descriptions.SAVE_UPDATES_YES_NO_DESCRIPTION, errorMessage = _messages.INVALID_ANSWER_MESSAGE, validationFunction = _validate.validateAnswer, options = {
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
            var success = diff.save();
            if (!success) {
                (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
                console.log(_messages.FAILED_SAVE_MESSAGE);
                abort();
                return;
            }
            proceed();
            return;
        }
        (0, _console.consoleLogUnpublishedDiffs)(diff, diffs);
        console.log(_messages.FAILED_SAVE_MESSAGE);
        abort();
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVyYXRpb24vcHJvbXB0L3NhdmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHNoZWxsVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyBZRVMgfSBmcm9tIFwiLi4vLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyB2YWxpZGF0ZUFuc3dlciB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvdmFsaWRhdGVcIjtcbmltcG9ydCB7IGlzQW5zd2VyQWZmaXJtYXRpdmUgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL3Byb21wdFwiO1xuaW1wb3J0IHsgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMgfSBmcm9tIFwiLi4vLi4vdXRpbGl0aWVzL2NvbnNvbGVcIjtcbmltcG9ydCB7IFNBVkVfVVBEQVRFU19ZRVNfTk9fREVTQ1JJUFRJT04gfSBmcm9tIFwiLi4vLi4vZGVzY3JpcHRpb25zXCI7XG5pbXBvcnQgeyByZW1vdmVEZXBlbmRlbmNpZXMsIHJlbW92ZURldkRlcGVuZGVuY2llcyB9IGZyb20gXCIuLi8uLi91dGlsaXRpZXMvcHJvcGFnYXRlXCI7XG5pbXBvcnQgeyBGQUlMRURfU0FWRV9NRVNTQUdFLCBJTlZBTElEX0FOU1dFUl9NRVNTQUdFIH0gZnJvbSBcIi4uLy4uL21lc3NhZ2VzXCI7XG5cbmNvbnN0IHsgcHJvbXB0IH0gPSBzaGVsbFV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2F2ZVByb21wdE9wZXJhdGlvbihwcm9jZWVkLCBhYm9ydCwgY29udGV4dCkge1xuICBjb25zdCB7IHllcywgZGlmZiwgZGlmZnMgfSA9IGNvbnRleHQsXG4gICAgICAgIGRpZmZTdHJpbmcgPSBkaWZmLmFzU3RyaW5nKCk7XG5cbiAgY29uc29sZS5sb2coZGlmZlN0cmluZyk7XG5cbiAgY29uc3QgYW5zd2VyID0geWVzID9cbiAgICAgICAgICAgICAgICAgICBZRVMgOlxuICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgYXR0ZW1wdHMgPSBJbmZpbml0eSxcbiAgICAgICAgZGVzY3JpcHRpb24gPSBTQVZFX1VQREFURVNfWUVTX05PX0RFU0NSSVBUSU9OLFxuICAgICAgICBlcnJvck1lc3NhZ2UgPSBJTlZBTElEX0FOU1dFUl9NRVNTQUdFLFxuICAgICAgICB2YWxpZGF0aW9uRnVuY3Rpb24gPSB2YWxpZGF0ZUFuc3dlciwgIC8vL1xuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIGFuc3dlcixcbiAgICAgICAgICBhdHRlbXB0cyxcbiAgICAgICAgICBkZXNjcmlwdGlvbixcbiAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgdmFsaWRhdGlvbkZ1bmN0aW9uXG4gICAgICAgIH07XG5cbiAgcHJvbXB0KG9wdGlvbnMsIChhbnN3ZXIpID0+IHtcbiAgICBjb25zdCB2YWxpZCA9IChhbnN3ZXIgIT09IG51bGwpO1xuXG4gICAgaWYgKHZhbGlkKSB7XG4gICAgICBjb25zdCBhZmZpcm1hdGl2ZSA9IGlzQW5zd2VyQWZmaXJtYXRpdmUoYW5zd2VyKTtcblxuICAgICAgaWYgKCFhZmZpcm1hdGl2ZSkge1xuICAgICAgICBjb25zdCB7IHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCB9ID0gY29udGV4dDtcblxuICAgICAgICByZW1vdmVEZXBlbmRlbmNpZXMoZGlmZiwgZGlmZnMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCk7XG5cbiAgICAgICAgcmVtb3ZlRGV2RGVwZW5kZW5jaWVzKGRpZmYsIGRpZmZzLCByZWxlYXNlTWFwLCByZWxlYXNlR3JhcGgpO1xuXG4gICAgICAgIGFib3J0KCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzdWNjZXNzID0gZGlmZi5zYXZlKCk7XG5cbiAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyhkaWZmLCBkaWZmcyk7XG5cbiAgICAgICAgY29uc29sZS5sb2coRkFJTEVEX1NBVkVfTUVTU0FHRSk7XG5cbiAgICAgICAgYWJvcnQoKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHByb2NlZWQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZzKGRpZmYsIGRpZmZzKTtcblxuICAgIGNvbnNvbGUubG9nKEZBSUxFRF9TQVZFX01FU1NBR0UpO1xuXG4gICAgYWJvcnQoKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsic2F2ZVByb21wdE9wZXJhdGlvbiIsInByb21wdCIsInNoZWxsVXRpbGl0aWVzIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInllcyIsImRpZmYiLCJkaWZmcyIsImRpZmZTdHJpbmciLCJhc1N0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJhbnN3ZXIiLCJZRVMiLCJhdHRlbXB0cyIsIkluZmluaXR5IiwiZGVzY3JpcHRpb24iLCJTQVZFX1VQREFURVNfWUVTX05PX0RFU0NSSVBUSU9OIiwiZXJyb3JNZXNzYWdlIiwiSU5WQUxJRF9BTlNXRVJfTUVTU0FHRSIsInZhbGlkYXRpb25GdW5jdGlvbiIsInZhbGlkYXRlQW5zd2VyIiwib3B0aW9ucyIsInZhbGlkIiwiYWZmaXJtYXRpdmUiLCJpc0Fuc3dlckFmZmlybWF0aXZlIiwicmVsZWFzZU1hcCIsInJlbGVhc2VHcmFwaCIsInJlbW92ZURlcGVuZGVuY2llcyIsInJlbW92ZURldkRlcGVuZGVuY2llcyIsInN1Y2Nlc3MiLCJzYXZlIiwiY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMiLCJGQUlMRURfU0FWRV9NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFjQTs7O2VBQXdCQTs7O3lCQVpPO3lCQUVYO3dCQUNXO3NCQUNLO3VCQUNPOzRCQUNLO3lCQUNVO3dCQUNFO0FBRTVELElBQU0sQUFBRUMsU0FBV0MseUJBQWMsQ0FBekJEO0FBRU8sU0FBU0Qsb0JBQW9CRyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUNqRSxJQUFRQyxNQUFxQkQsUUFBckJDLEtBQUtDLE9BQWdCRixRQUFoQkUsTUFBTUMsUUFBVUgsUUFBVkcsT0FDYkMsYUFBYUYsS0FBS0csUUFBUTtJQUVoQ0MsUUFBUUMsR0FBRyxDQUFDSDtJQUVaLElBQU1JLFNBQVNQLE1BQ0VRLGNBQUcsR0FDRCxNQUNiQyxXQUFXQyxVQUNYQyxjQUFjQyw2Q0FBK0IsRUFDN0NDLGVBQWVDLGdDQUFzQixFQUNyQ0MscUJBQXFCQyx3QkFBYyxFQUNuQ0MsVUFBVTtRQUNSVixRQUFBQTtRQUNBRSxVQUFBQTtRQUNBRSxhQUFBQTtRQUNBRSxjQUFBQTtRQUNBRSxvQkFBQUE7SUFDRjtJQUVOcEIsT0FBT3NCLFNBQVMsU0FBQ1Y7UUFDZixJQUFNVyxRQUFTWCxXQUFXO1FBRTFCLElBQUlXLE9BQU87WUFDVCxJQUFNQyxjQUFjQyxJQUFBQSwyQkFBbUIsRUFBQ2I7WUFFeEMsSUFBSSxDQUFDWSxhQUFhO2dCQUNoQixJQUFRRSxhQUE2QnRCLFFBQTdCc0IsWUFBWUMsZUFBaUJ2QixRQUFqQnVCO2dCQUVwQkMsSUFBQUEsNkJBQWtCLEVBQUN0QixNQUFNQyxPQUFPbUIsWUFBWUM7Z0JBRTVDRSxJQUFBQSxnQ0FBcUIsRUFBQ3ZCLE1BQU1DLE9BQU9tQixZQUFZQztnQkFFL0N4QjtnQkFFQTtZQUNGO1lBRUEsSUFBTTJCLFVBQVV4QixLQUFLeUIsSUFBSTtZQUV6QixJQUFJLENBQUNELFNBQVM7Z0JBQ1pFLElBQUFBLG1DQUEwQixFQUFDMUIsTUFBTUM7Z0JBRWpDRyxRQUFRQyxHQUFHLENBQUNzQiw2QkFBbUI7Z0JBRS9COUI7Z0JBRUE7WUFDRjtZQUVBRDtZQUVBO1FBQ0Y7UUFFQThCLElBQUFBLG1DQUEwQixFQUFDMUIsTUFBTUM7UUFFakNHLFFBQVFDLEdBQUcsQ0FBQ3NCLDZCQUFtQjtRQUUvQjlCO0lBQ0Y7QUFDRiJ9