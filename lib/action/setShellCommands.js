"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return setShellCommandsAction;
    }
});
var _setGitShellCommands = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/setGitShellCommands"));
var _setBuildShellCommands = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/setBuildShellCommands"));
var _setInstallShellCommands = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/setInstallShellCommands"));
var _setPublishShellCommands = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/setPublishShellCommands"));
var _operation = require("../utilities/operation");
var _configuration = require("../configuration");
var _messages = require("../messages");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function setShellCommandsAction() {
    var operations = [
        _setGitShellCommands.default,
        _setInstallShellCommands.default,
        _setBuildShellCommands.default,
        _setPublishShellCommands.default
    ], shellCommands = (0, _configuration.retrieveShellCommands)(), context = {
        shellCommands: shellCommands
    };
    (0, _operation.executeOperations)(operations, function(completed) {
        if (!completed) {
            console.log(_messages.FAILED_SET_SHELL_COMMANDS_MESSAGE);
            return;
        }
        var shellCommands = context.shellCommands;
        (0, _configuration.updateShellCommands)(shellCommands);
        console.log(_messages.SUCCESSFUL_SET_SHELL_COMMANDS_MESSAGE);
    }, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vc2V0U2hlbGxDb21tYW5kcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHNldEdpdFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvc2V0R2l0U2hlbGxDb21tYW5kc1wiO1xuaW1wb3J0IHNldEJ1aWxkU2hlbGxDb21tYW5kc1Byb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9zZXRCdWlsZFNoZWxsQ29tbWFuZHNcIjtcbmltcG9ydCBzZXRJbnN0YWxsU2hlbGxDb21tYW5kc1Byb21wdE9wZXJhdGlvbiBmcm9tIFwiLi4vb3BlcmF0aW9uL3Byb21wdC9zZXRJbnN0YWxsU2hlbGxDb21tYW5kc1wiO1xuaW1wb3J0IHNldFB1Ymxpc2hTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3NldFB1Ymxpc2hTaGVsbENvbW1hbmRzXCI7XG5cbmltcG9ydCB7IGV4ZWN1dGVPcGVyYXRpb25zIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9vcGVyYXRpb25cIjtcbmltcG9ydCB7IHJldHJpZXZlU2hlbGxDb21tYW5kcywgdXBkYXRlU2hlbGxDb21tYW5kcyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBGQUlMRURfU0VUX1NIRUxMX0NPTU1BTkRTX01FU1NBR0UsIFNVQ0NFU1NGVUxfU0VUX1NIRUxMX0NPTU1BTkRTX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0U2hlbGxDb21tYW5kc0FjdGlvbigpIHtcbiAgY29uc3Qgb3BlcmF0aW9ucyA9IFtcbiAgICAgICAgICBzZXRHaXRTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uLFxuICAgICAgICAgIHNldEluc3RhbGxTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uLFxuICAgICAgICAgIHNldEJ1aWxkU2hlbGxDb21tYW5kc1Byb21wdE9wZXJhdGlvbixcbiAgICAgICAgICBzZXRQdWJsaXNoU2hlbGxDb21tYW5kc1Byb21wdE9wZXJhdGlvblxuICAgICAgICBdLFxuICAgICAgICBzaGVsbENvbW1hbmRzID0gcmV0cmlldmVTaGVsbENvbW1hbmRzKCksXG4gICAgICAgIGNvbnRleHQgPSB7XG4gICAgICAgICAgc2hlbGxDb21tYW5kc1xuICAgICAgICB9O1xuXG4gIGV4ZWN1dGVPcGVyYXRpb25zKG9wZXJhdGlvbnMsIChjb21wbGV0ZWQpID0+IHtcbiAgICBpZiAoIWNvbXBsZXRlZCkge1xuICAgICAgY29uc29sZS5sb2coRkFJTEVEX1NFVF9TSEVMTF9DT01NQU5EU19NRVNTQUdFKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc2hlbGxDb21tYW5kcyB9ID0gY29udGV4dDtcblxuICAgIHVwZGF0ZVNoZWxsQ29tbWFuZHMoc2hlbGxDb21tYW5kcyk7XG5cbiAgICBjb25zb2xlLmxvZyhTVUNDRVNTRlVMX1NFVF9TSEVMTF9DT01NQU5EU19NRVNTQUdFKTtcbiAgfSwgY29udGV4dCk7XG59XG4iXSwibmFtZXMiOlsic2V0U2hlbGxDb21tYW5kc0FjdGlvbiIsIm9wZXJhdGlvbnMiLCJzZXRHaXRTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uIiwic2V0SW5zdGFsbFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24iLCJzZXRCdWlsZFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24iLCJzZXRQdWJsaXNoU2hlbGxDb21tYW5kc1Byb21wdE9wZXJhdGlvbiIsInNoZWxsQ29tbWFuZHMiLCJyZXRyaWV2ZVNoZWxsQ29tbWFuZHMiLCJjb250ZXh0IiwiZXhlY3V0ZU9wZXJhdGlvbnMiLCJjb21wbGV0ZWQiLCJjb25zb2xlIiwibG9nIiwiRkFJTEVEX1NFVF9TSEVMTF9DT01NQU5EU19NRVNTQUdFIiwidXBkYXRlU2hlbGxDb21tYW5kcyIsIlNVQ0NFU1NGVUxfU0VUX1NIRUxMX0NPTU1BTkRTX01FU1NBR0UiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQVdBOzs7ZUFBd0JBOzs7MEVBVHVCOzRFQUNFOzhFQUNFOzhFQUNBO3lCQUVqQjs2QkFDeUI7d0JBQzhCOzs7Ozs7QUFFMUUsU0FBU0E7SUFDdEIsSUFBTUMsYUFBYTtRQUNYQyw0QkFBa0M7UUFDbENDLGdDQUFzQztRQUN0Q0MsOEJBQW9DO1FBQ3BDQyxnQ0FBc0M7S0FDdkMsRUFDREMsZ0JBQWdCQyxJQUFBQSxvQ0FBcUIsS0FDckNDLFVBQVU7UUFDUkYsZUFBQUE7SUFDRjtJQUVORyxJQUFBQSw0QkFBaUIsRUFBQ1IsWUFBWSxTQUFDUztRQUM3QixJQUFJLENBQUNBLFdBQVc7WUFDZEMsUUFBUUMsR0FBRyxDQUFDQywyQ0FBaUM7WUFFN0M7UUFDRjtRQUVBLElBQU0sQUFBRVAsZ0JBQWtCRSxRQUFsQkY7UUFFUlEsSUFBQUEsa0NBQW1CLEVBQUNSO1FBRXBCSyxRQUFRQyxHQUFHLENBQUNHLCtDQUFxQztJQUNuRCxHQUFHUDtBQUNMIn0=