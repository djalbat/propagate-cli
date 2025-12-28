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
var _setPollShellCommands = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/setPollShellCommands"));
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
        _setPollShellCommands.default,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vc2V0U2hlbGxDb21tYW5kcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHNldEdpdFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvc2V0R2l0U2hlbGxDb21tYW5kc1wiO1xuaW1wb3J0IHNldFBvbGxTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3NldFBvbGxTaGVsbENvbW1hbmRzXCI7XG5pbXBvcnQgc2V0QnVpbGRTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3NldEJ1aWxkU2hlbGxDb21tYW5kc1wiO1xuaW1wb3J0IHNldEluc3RhbGxTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3NldEluc3RhbGxTaGVsbENvbW1hbmRzXCI7XG5pbXBvcnQgc2V0UHVibGlzaFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24gZnJvbSBcIi4uL29wZXJhdGlvbi9wcm9tcHQvc2V0UHVibGlzaFNoZWxsQ29tbWFuZHNcIjtcblxuaW1wb3J0IHsgZXhlY3V0ZU9wZXJhdGlvbnMgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL29wZXJhdGlvblwiO1xuaW1wb3J0IHsgcmV0cmlldmVTaGVsbENvbW1hbmRzLCB1cGRhdGVTaGVsbENvbW1hbmRzIH0gZnJvbSBcIi4uL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IEZBSUxFRF9TRVRfU0hFTExfQ09NTUFORFNfTUVTU0FHRSwgU1VDQ0VTU0ZVTF9TRVRfU0hFTExfQ09NTUFORFNfTUVTU0FHRSB9IGZyb20gXCIuLi9tZXNzYWdlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRTaGVsbENvbW1hbmRzQWN0aW9uKCkge1xuICBjb25zdCBvcGVyYXRpb25zID0gW1xuICAgICAgICAgIHNldEdpdFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24sXG4gICAgICAgICAgc2V0UG9sbFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24sXG4gICAgICAgICAgc2V0SW5zdGFsbFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24sXG4gICAgICAgICAgc2V0QnVpbGRTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uLFxuICAgICAgICAgIHNldFB1Ymxpc2hTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uXG4gICAgICAgIF0sXG4gICAgICAgIHNoZWxsQ29tbWFuZHMgPSByZXRyaWV2ZVNoZWxsQ29tbWFuZHMoKSxcbiAgICAgICAgY29udGV4dCA9IHtcbiAgICAgICAgICBzaGVsbENvbW1hbmRzXG4gICAgICAgIH07XG5cbiAgZXhlY3V0ZU9wZXJhdGlvbnMob3BlcmF0aW9ucywgKGNvbXBsZXRlZCkgPT4ge1xuICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhGQUlMRURfU0VUX1NIRUxMX0NPTU1BTkRTX01FU1NBR0UpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBzaGVsbENvbW1hbmRzIH0gPSBjb250ZXh0O1xuXG4gICAgdXBkYXRlU2hlbGxDb21tYW5kcyhzaGVsbENvbW1hbmRzKTtcblxuICAgIGNvbnNvbGUubG9nKFNVQ0NFU1NGVUxfU0VUX1NIRUxMX0NPTU1BTkRTX01FU1NBR0UpO1xuICB9LCBjb250ZXh0KTtcbn1cbiJdLCJuYW1lcyI6WyJzZXRTaGVsbENvbW1hbmRzQWN0aW9uIiwib3BlcmF0aW9ucyIsInNldEdpdFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24iLCJzZXRQb2xsU2hlbGxDb21tYW5kc1Byb21wdE9wZXJhdGlvbiIsInNldEluc3RhbGxTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uIiwic2V0QnVpbGRTaGVsbENvbW1hbmRzUHJvbXB0T3BlcmF0aW9uIiwic2V0UHVibGlzaFNoZWxsQ29tbWFuZHNQcm9tcHRPcGVyYXRpb24iLCJzaGVsbENvbW1hbmRzIiwicmV0cmlldmVTaGVsbENvbW1hbmRzIiwiY29udGV4dCIsImV4ZWN1dGVPcGVyYXRpb25zIiwiY29tcGxldGVkIiwiY29uc29sZSIsImxvZyIsIkZBSUxFRF9TRVRfU0hFTExfQ09NTUFORFNfTUVTU0FHRSIsInVwZGF0ZVNoZWxsQ29tbWFuZHMiLCJTVUNDRVNTRlVMX1NFVF9TSEVMTF9DT01NQU5EU19NRVNTQUdFIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFZQTs7O2VBQXdCQTs7OzBFQVZ1QjsyRUFDQzs0RUFDQzs4RUFDRTs4RUFDQTt5QkFFakI7NkJBQ3lCO3dCQUM4Qjs7Ozs7O0FBRTFFLFNBQVNBO0lBQ3RCLElBQU1DLGFBQWE7UUFDWEMsNEJBQWtDO1FBQ2xDQyw2QkFBbUM7UUFDbkNDLGdDQUFzQztRQUN0Q0MsOEJBQW9DO1FBQ3BDQyxnQ0FBc0M7S0FDdkMsRUFDREMsZ0JBQWdCQyxJQUFBQSxvQ0FBcUIsS0FDckNDLFVBQVU7UUFDUkYsZUFBQUE7SUFDRjtJQUVORyxJQUFBQSw0QkFBaUIsRUFBQ1QsWUFBWSxTQUFDVTtRQUM3QixJQUFJLENBQUNBLFdBQVc7WUFDZEMsUUFBUUMsR0FBRyxDQUFDQywyQ0FBaUM7WUFFN0M7UUFDRjtRQUVBLElBQU0sQUFBRVAsZ0JBQWtCRSxRQUFsQkY7UUFFUlEsSUFBQUEsa0NBQW1CLEVBQUNSO1FBRXBCSyxRQUFRQyxHQUFHLENBQUNHLCtDQUFxQztJQUNuRCxHQUFHUDtBQUNMIn0=