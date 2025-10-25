"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get validateAnswer () {
        return validateAnswer;
    },
    get validateDirectoryNumber () {
        return validateDirectoryNumber;
    },
    get validateDirectoryPath () {
        return validateDirectoryPath;
    },
    get validateForcedDependencyName () {
        return validateForcedDependencyName;
    },
    get validateForcedDependencyRelationNumber () {
        return validateForcedDependencyRelationNumber;
    },
    get validateForcedDependentName () {
        return validateForcedDependentName;
    },
    get validateIgnoredDependencyName () {
        return validateIgnoredDependencyName;
    },
    get validateIgnoredDependencyNumber () {
        return validateIgnoredDependencyNumber;
    },
    get validateShellCommands () {
        return validateShellCommands;
    }
});
function validateAnswer(answer) {
    return /^(:?yes|no|y|n)$/i.test(answer);
}
function validateDirectoryPath(directoryPath) {
    return /^\.\.?(?:\/[a-zA-Z0-9\-_]+)+\/?$/.test(directoryPath);
}
function validateShellCommands(shellCommands) {
    return /^.*$/.test(shellCommands);
}
function validateDirectoryNumber(directoryNumber, directoryNumbers) {
    return directoryNumbers.includes(directoryNumber);
}
function validateForcedDependentName(forcedDependentName) {
    return /^.+$/.test(forcedDependentName);
}
function validateForcedDependencyName(forcedDependencyName) {
    return /^.+$/.test(forcedDependencyName);
}
function validateIgnoredDependencyName(ignoredDependencyName) {
    return /^.+$/.test(ignoredDependencyName);
}
function validateIgnoredDependencyNumber(ignoredDependencyNumber, ignoredDependencyNumbers) {
    return ignoredDependencyNumbers.includes(ignoredDependencyNumber);
}
function validateForcedDependencyRelationNumber(forcedDependencyRelationNumber, forcedDependencyRelationNumbers) {
    return forcedDependencyRelationNumbers.includes(forcedDependencyRelationNumber);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvdmFsaWRhdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUFuc3dlcihhbnN3ZXIpIHsgcmV0dXJuICAvXig6P3llc3xub3x5fG4pJC9pLnRlc3QoYW5zd2VyKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVEaXJlY3RvcnlQYXRoKGRpcmVjdG9yeVBhdGgpIHsgcmV0dXJuICAvXlxcLlxcLj8oPzpcXC9bYS16QS1aMC05XFwtX10rKStcXC8/JC8udGVzdChkaXJlY3RvcnlQYXRoKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVTaGVsbENvbW1hbmRzKHNoZWxsQ29tbWFuZHMpIHsgcmV0dXJuICAvXi4qJC8udGVzdChzaGVsbENvbW1hbmRzKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVEaXJlY3RvcnlOdW1iZXIoZGlyZWN0b3J5TnVtYmVyLCBkaXJlY3RvcnlOdW1iZXJzKSB7IHJldHVybiBkaXJlY3RvcnlOdW1iZXJzLmluY2x1ZGVzKGRpcmVjdG9yeU51bWJlcik7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRm9yY2VkRGVwZW5kZW50TmFtZShmb3JjZWREZXBlbmRlbnROYW1lKSB7IHJldHVybiAgL14uKyQvLnRlc3QoZm9yY2VkRGVwZW5kZW50TmFtZSk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlRm9yY2VkRGVwZW5kZW5jeU5hbWUoZm9yY2VkRGVwZW5kZW5jeU5hbWUpIHsgcmV0dXJuICAvXi4rJC8udGVzdChmb3JjZWREZXBlbmRlbmN5TmFtZSk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSWdub3JlZERlcGVuZGVuY3lOYW1lKGlnbm9yZWREZXBlbmRlbmN5TmFtZSkgeyByZXR1cm4gIC9eLiskLy50ZXN0KGlnbm9yZWREZXBlbmRlbmN5TmFtZSk7IH1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlSWdub3JlZERlcGVuZGVuY3lOdW1iZXIoaWdub3JlZERlcGVuZGVuY3lOdW1iZXIsIGlnbm9yZWREZXBlbmRlbmN5TnVtYmVycykgeyByZXR1cm4gaWdub3JlZERlcGVuZGVuY3lOdW1iZXJzLmluY2x1ZGVzKGlnbm9yZWREZXBlbmRlbmN5TnVtYmVyKTsgfVxuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVGb3JjZWREZXBlbmRlbmN5UmVsYXRpb25OdW1iZXIoZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uTnVtYmVyLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25OdW1iZXJzKSB7IHJldHVybiBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25OdW1iZXJzLmluY2x1ZGVzKGZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbk51bWJlcik7IH1cbiJdLCJuYW1lcyI6WyJ2YWxpZGF0ZUFuc3dlciIsInZhbGlkYXRlRGlyZWN0b3J5TnVtYmVyIiwidmFsaWRhdGVEaXJlY3RvcnlQYXRoIiwidmFsaWRhdGVGb3JjZWREZXBlbmRlbmN5TmFtZSIsInZhbGlkYXRlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uTnVtYmVyIiwidmFsaWRhdGVGb3JjZWREZXBlbmRlbnROYW1lIiwidmFsaWRhdGVJZ25vcmVkRGVwZW5kZW5jeU5hbWUiLCJ2YWxpZGF0ZUlnbm9yZWREZXBlbmRlbmN5TnVtYmVyIiwidmFsaWRhdGVTaGVsbENvbW1hbmRzIiwiYW5zd2VyIiwidGVzdCIsImRpcmVjdG9yeVBhdGgiLCJzaGVsbENvbW1hbmRzIiwiZGlyZWN0b3J5TnVtYmVyIiwiZGlyZWN0b3J5TnVtYmVycyIsImluY2x1ZGVzIiwiZm9yY2VkRGVwZW5kZW50TmFtZSIsImZvcmNlZERlcGVuZGVuY3lOYW1lIiwiaWdub3JlZERlcGVuZGVuY3lOYW1lIiwiaWdub3JlZERlcGVuZGVuY3lOdW1iZXIiLCJpZ25vcmVkRGVwZW5kZW5jeU51bWJlcnMiLCJmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25OdW1iZXIiLCJmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25OdW1iZXJzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFFZ0JBO2VBQUFBOztRQU1BQztlQUFBQTs7UUFKQUM7ZUFBQUE7O1FBUUFDO2VBQUFBOztRQU1BQztlQUFBQTs7UUFSQUM7ZUFBQUE7O1FBSUFDO2VBQUFBOztRQUVBQztlQUFBQTs7UUFWQUM7ZUFBQUE7OztBQUpULFNBQVNSLGVBQWVTLE1BQU07SUFBSSxPQUFRLG9CQUFvQkMsSUFBSSxDQUFDRDtBQUFTO0FBRTVFLFNBQVNQLHNCQUFzQlMsYUFBYTtJQUFJLE9BQVEsbUNBQW1DRCxJQUFJLENBQUNDO0FBQWdCO0FBRWhILFNBQVNILHNCQUFzQkksYUFBYTtJQUFJLE9BQVEsT0FBT0YsSUFBSSxDQUFDRTtBQUFnQjtBQUVwRixTQUFTWCx3QkFBd0JZLGVBQWUsRUFBRUMsZ0JBQWdCO0lBQUksT0FBT0EsaUJBQWlCQyxRQUFRLENBQUNGO0FBQWtCO0FBRXpILFNBQVNSLDRCQUE0QlcsbUJBQW1CO0lBQUksT0FBUSxPQUFPTixJQUFJLENBQUNNO0FBQXNCO0FBRXRHLFNBQVNiLDZCQUE2QmMsb0JBQW9CO0lBQUksT0FBUSxPQUFPUCxJQUFJLENBQUNPO0FBQXVCO0FBRXpHLFNBQVNYLDhCQUE4QlkscUJBQXFCO0lBQUksT0FBUSxPQUFPUixJQUFJLENBQUNRO0FBQXdCO0FBRTVHLFNBQVNYLGdDQUFnQ1ksdUJBQXVCLEVBQUVDLHdCQUF3QjtJQUFJLE9BQU9BLHlCQUF5QkwsUUFBUSxDQUFDSTtBQUEwQjtBQUVqSyxTQUFTZix1Q0FBdUNpQiw4QkFBOEIsRUFBRUMsK0JBQStCO0lBQUksT0FBT0EsZ0NBQWdDUCxRQUFRLENBQUNNO0FBQWlDIn0=