"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return addDirectoryAction;
    }
});
var _addDirectory = /*#__PURE__*/ _interop_require_default(require("../operation/prompt/addDirectory"));
var _operation = require("../utilities/operation");
var _configuration = require("../configuration");
var _messages = require("../messages");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function addDirectoryAction() {
    var operations = [
        _addDirectory.default
    ], context = {};
    (0, _operation.executeOperations)(operations, function(completed) {
        if (!completed) {
            console.log(_messages.FAILED_ADD_DIRECTORY_MESSAGE);
            return;
        }
        var directories = (0, _configuration.retrieveDirectories)(), directory = context.directory;
        var directoriesIncludesDirectory = directories.includes(directory);
        if (directoriesIncludesDirectory) {
            console.log(_messages.DIRECTORIES_INCLUDES_DIRECTORY_MESSAGE);
        } else {
            directories.push(directory);
            (0, _configuration.updateDirectories)(directories);
            console.log(_messages.SUCCESSFUL_ADD_DIRECTORY_MESSAGE);
        }
    }, context);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vYWRkRGlyZWN0b3J5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgYWRkRGlyZWN0b3J5UHJvbXB0T3BlcmF0aW9uIGZyb20gXCIuLi9vcGVyYXRpb24vcHJvbXB0L2FkZERpcmVjdG9yeVwiO1xuXG5pbXBvcnQgeyBleGVjdXRlT3BlcmF0aW9ucyB9IGZyb20gXCIuLi91dGlsaXRpZXMvb3BlcmF0aW9uXCI7XG5pbXBvcnQgeyByZXRyaWV2ZURpcmVjdG9yaWVzLCB1cGRhdGVEaXJlY3RvcmllcyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBGQUlMRURfQUREX0RJUkVDVE9SWV9NRVNTQUdFLCBTVUNDRVNTRlVMX0FERF9ESVJFQ1RPUllfTUVTU0FHRSwgRElSRUNUT1JJRVNfSU5DTFVERVNfRElSRUNUT1JZX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkRGlyZWN0b3J5QWN0aW9uKCkge1xuICBjb25zdCBvcGVyYXRpb25zID0gW1xuICAgICAgICAgIGFkZERpcmVjdG9yeVByb21wdE9wZXJhdGlvblxuICAgICAgICBdLFxuICAgICAgICBjb250ZXh0ID0ge307XG5cbiAgZXhlY3V0ZU9wZXJhdGlvbnMob3BlcmF0aW9ucywgKGNvbXBsZXRlZCkgPT4ge1xuICAgIGlmICghY29tcGxldGVkKSB7XG4gICAgICBjb25zb2xlLmxvZyhGQUlMRURfQUREX0RJUkVDVE9SWV9NRVNTQUdFKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGRpcmVjdG9yaWVzID0gcmV0cmlldmVEaXJlY3RvcmllcygpLFxuICAgICAgICAgIHsgZGlyZWN0b3J5IH0gPSBjb250ZXh0O1xuXG4gICAgY29uc3QgZGlyZWN0b3JpZXNJbmNsdWRlc0RpcmVjdG9yeSA9IGRpcmVjdG9yaWVzLmluY2x1ZGVzKGRpcmVjdG9yeSk7XG5cbiAgICBpZiAoZGlyZWN0b3JpZXNJbmNsdWRlc0RpcmVjdG9yeSkge1xuICAgICAgY29uc29sZS5sb2coRElSRUNUT1JJRVNfSU5DTFVERVNfRElSRUNUT1JZX01FU1NBR0UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rvcmllcy5wdXNoKGRpcmVjdG9yeSk7XG5cbiAgICAgIHVwZGF0ZURpcmVjdG9yaWVzKGRpcmVjdG9yaWVzKTtcblxuICAgICAgY29uc29sZS5sb2coU1VDQ0VTU0ZVTF9BRERfRElSRUNUT1JZX01FU1NBR0UpO1xuICAgIH1cbiAgfSwgY29udGV4dCk7XG59XG4iXSwibmFtZXMiOlsiYWRkRGlyZWN0b3J5QWN0aW9uIiwib3BlcmF0aW9ucyIsImFkZERpcmVjdG9yeVByb21wdE9wZXJhdGlvbiIsImNvbnRleHQiLCJleGVjdXRlT3BlcmF0aW9ucyIsImNvbXBsZXRlZCIsImNvbnNvbGUiLCJsb2ciLCJGQUlMRURfQUREX0RJUkVDVE9SWV9NRVNTQUdFIiwiZGlyZWN0b3JpZXMiLCJyZXRyaWV2ZURpcmVjdG9yaWVzIiwiZGlyZWN0b3J5IiwiZGlyZWN0b3JpZXNJbmNsdWRlc0RpcmVjdG9yeSIsImluY2x1ZGVzIiwiRElSRUNUT1JJRVNfSU5DTFVERVNfRElSRUNUT1JZX01FU1NBR0UiLCJwdXNoIiwidXBkYXRlRGlyZWN0b3JpZXMiLCJTVUNDRVNTRlVMX0FERF9ESVJFQ1RPUllfTUVTU0FHRSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBUUE7OztlQUF3QkE7OzttRUFOZ0I7eUJBRU47NkJBQ3FCO3dCQUNnRTs7Ozs7O0FBRXhHLFNBQVNBO0lBQ3RCLElBQU1DLGFBQWE7UUFDWEMscUJBQTJCO0tBQzVCLEVBQ0RDLFVBQVUsQ0FBQztJQUVqQkMsSUFBQUEsNEJBQWlCLEVBQUNILFlBQVksU0FBQ0k7UUFDN0IsSUFBSSxDQUFDQSxXQUFXO1lBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Msc0NBQTRCO1lBRXhDO1FBQ0Y7UUFFQSxJQUFNQyxjQUFjQyxJQUFBQSxrQ0FBbUIsS0FDakMsQUFBRUMsWUFBY1IsUUFBZFE7UUFFUixJQUFNQywrQkFBK0JILFlBQVlJLFFBQVEsQ0FBQ0Y7UUFFMUQsSUFBSUMsOEJBQThCO1lBQ2hDTixRQUFRQyxHQUFHLENBQUNPLGdEQUFzQztRQUNwRCxPQUFPO1lBQ0xMLFlBQVlNLElBQUksQ0FBQ0o7WUFFakJLLElBQUFBLGdDQUFpQixFQUFDUDtZQUVsQkgsUUFBUUMsR0FBRyxDQUFDVSwwQ0FBZ0M7UUFDOUM7SUFDRixHQUFHZDtBQUNMIn0=