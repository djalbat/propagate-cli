"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return removeDirectoryAction;
    }
});
var _listDirectories = /*#__PURE__*/ _interop_require_default(require("../action/listDirectories"));
var _removeDirectory = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/removeDirectory"));
var _operation = require("../utilities/operation");
var _configuration = require("../configuration");
var _messages = require("../messages");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function removeDirectoryAction() {
    var operations = [
        _removeDirectory.default
    ], directoryNumbers = (0, _listDirectories.default)(), directoryNumbersLength = directoryNumbers.length;
    if (directoryNumbersLength === 0) {
        return;
    }
    var context = {
        directoryNumbers: directoryNumbers
    };
    (0, _operation.executeOperations)(operations, function(completed) {
        if (!completed) {
            console.log(_messages.FAILED_REMOVE_DIRECTORY_MESSAGE);
            return;
        }
        var directoryNumber = context.directoryNumber, start = directoryNumber - 1, deleteCount = 1, directories = (0, _configuration.retrieveDirectories)();
        directories.splice(start, deleteCount);
        (0, _configuration.updateDirectories)(directories);
        console.log(_messages.SUCCESSFUL_REMOVE_DIRECTORY_MESSAGE);
    }, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vcmVtb3ZlRGlyZWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgbGlzdERpcmVjdG9yaWVzIGZyb20gXCIuLi9hY3Rpb24vbGlzdERpcmVjdG9yaWVzXCI7XG5pbXBvcnQgcmVtb3ZlRGlyZWN0b3J5UHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L3JlbW92ZURpcmVjdG9yeVwiO1xuXG5pbXBvcnQgeyBleGVjdXRlT3BlcmF0aW9ucyB9IGZyb20gXCIuLi91dGlsaXRpZXMvb3BlcmF0aW9uXCI7XG5pbXBvcnQgeyB1cGRhdGVEaXJlY3RvcmllcywgcmV0cmlldmVEaXJlY3RvcmllcyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBGQUlMRURfUkVNT1ZFX0RJUkVDVE9SWV9NRVNTQUdFLCBTVUNDRVNTRlVMX1JFTU9WRV9ESVJFQ1RPUllfTUVTU0FHRSB9IGZyb20gXCIuLi9tZXNzYWdlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW1vdmVEaXJlY3RvcnlBY3Rpb24oKSB7XG4gIGNvbnN0IG9wZXJhdGlvbnMgPSBbXG4gICAgICAgICAgcmVtb3ZlRGlyZWN0b3J5UHJvbXB0T3BlcmF0aW9uXG4gICAgICAgIF0sXG4gICAgICAgIGRpcmVjdG9yeU51bWJlcnMgPSBsaXN0RGlyZWN0b3JpZXMoKSxcbiAgICAgICAgZGlyZWN0b3J5TnVtYmVyc0xlbmd0aCA9IGRpcmVjdG9yeU51bWJlcnMubGVuZ3RoO1xuXG4gIGlmIChkaXJlY3RvcnlOdW1iZXJzTGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29udGV4dCA9IHtcbiAgICAgICAgICBkaXJlY3RvcnlOdW1iZXJzXG4gICAgICAgIH07XG5cbiAgZXhlY3V0ZU9wZXJhdGlvbnMob3BlcmF0aW9ucywgKGNvbXBsZXRlZCkgPT4ge1xuICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhGQUlMRURfUkVNT1ZFX0RJUkVDVE9SWV9NRVNTQUdFKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZGlyZWN0b3J5TnVtYmVyIH0gPSBjb250ZXh0LFxuICAgICAgICAgIHN0YXJ0ID0gZGlyZWN0b3J5TnVtYmVyIC0gMSxcbiAgICAgICAgICBkZWxldGVDb3VudCA9IDEsXG4gICAgICAgICAgZGlyZWN0b3JpZXMgPSByZXRyaWV2ZURpcmVjdG9yaWVzKCk7XG5cbiAgICBkaXJlY3Rvcmllcy5zcGxpY2Uoc3RhcnQsIGRlbGV0ZUNvdW50KTtcblxuICAgIHVwZGF0ZURpcmVjdG9yaWVzKGRpcmVjdG9yaWVzKTtcblxuICAgIGNvbnNvbGUubG9nKFNVQ0NFU1NGVUxfUkVNT1ZFX0RJUkVDVE9SWV9NRVNTQUdFKTtcbiAgfSwgY29udGV4dCk7XG59XG4iXSwibmFtZXMiOlsicmVtb3ZlRGlyZWN0b3J5QWN0aW9uIiwib3BlcmF0aW9ucyIsInJlbW92ZURpcmVjdG9yeVByb21wdE9wZXJhdGlvbiIsImRpcmVjdG9yeU51bWJlcnMiLCJsaXN0RGlyZWN0b3JpZXMiLCJkaXJlY3RvcnlOdW1iZXJzTGVuZ3RoIiwibGVuZ3RoIiwiY29udGV4dCIsImV4ZWN1dGVPcGVyYXRpb25zIiwiY29tcGxldGVkIiwiY29uc29sZSIsImxvZyIsIkZBSUxFRF9SRU1PVkVfRElSRUNUT1JZX01FU1NBR0UiLCJkaXJlY3RvcnlOdW1iZXIiLCJzdGFydCIsImRlbGV0ZUNvdW50IiwiZGlyZWN0b3JpZXMiLCJyZXRyaWV2ZURpcmVjdG9yaWVzIiwic3BsaWNlIiwidXBkYXRlRGlyZWN0b3JpZXMiLCJTVUNDRVNTRlVMX1JFTU9WRV9ESVJFQ1RPUllfTUVTU0FHRSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBU0E7OztlQUF3QkE7OztzRUFQSTtzRUFDZTt5QkFFVDs2QkFDcUI7d0JBQzhCOzs7Ozs7QUFFdEUsU0FBU0E7SUFDdEIsSUFBTUMsYUFBYTtRQUNYQyx3QkFBOEI7S0FDL0IsRUFDREMsbUJBQW1CQyxJQUFBQSx3QkFBZSxLQUNsQ0MseUJBQXlCRixpQkFBaUJHLE1BQU07SUFFdEQsSUFBSUQsMkJBQTJCLEdBQUc7UUFDaEM7SUFDRjtJQUVBLElBQU1FLFVBQVU7UUFDUkosa0JBQUFBO0lBQ0Y7SUFFTkssSUFBQUEsNEJBQWlCLEVBQUNQLFlBQVksU0FBQ1E7UUFDN0IsSUFBSSxDQUFDQSxXQUFXO1lBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0MseUNBQStCO1lBRTNDO1FBQ0Y7UUFFQSxJQUFNLEFBQUVDLGtCQUFvQk4sUUFBcEJNLGlCQUNGQyxRQUFRRCxrQkFBa0IsR0FDMUJFLGNBQWMsR0FDZEMsY0FBY0MsSUFBQUEsa0NBQW1CO1FBRXZDRCxZQUFZRSxNQUFNLENBQUNKLE9BQU9DO1FBRTFCSSxJQUFBQSxnQ0FBaUIsRUFBQ0g7UUFFbEJOLFFBQVFDLEdBQUcsQ0FBQ1MsNkNBQW1DO0lBQ2pELEdBQUdiO0FBQ0wifQ==