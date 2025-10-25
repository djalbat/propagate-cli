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
    get readPackageJSONFile () {
        return readPackageJSONFile;
    },
    get writePackageJSONFile () {
        return writePackageJSONFile;
    }
});
var _necessary = require("necessary");
var _constants = require("../constants");
var concatenatePaths = _necessary.pathUtilities.concatenatePaths, readFile = _necessary.fileSystemUtilities.readFile, writeFile = _necessary.fileSystemUtilities.writeFile, checkFileExists = _necessary.fileSystemUtilities.checkFileExists;
function readPackageJSONFile(subDirectoryPath) {
    var packageJSON = null;
    try {
        var packageJSONFilePath = concatenatePaths(subDirectoryPath, _constants.PACKAGE_JSON), packageJSONFIleExists = checkFileExists(packageJSONFilePath);
        if (packageJSONFIleExists) {
            var packageJSONFileContent = readFile(packageJSONFilePath);
            packageJSON = JSON.parse(packageJSONFileContent);
        }
    } catch (error) {
        console.log("There was an error when reading from the package.json file in the '".concat(subDirectoryPath, "' sub-directory:"));
        console.log(error);
    }
    return packageJSON;
}
function writePackageJSONFile(subDirectoryPath, packageJSON) {
    var success;
    try {
        var packageJSONFilePath = concatenatePaths(subDirectoryPath, _constants.PACKAGE_JSON), packageJSONContent = JSON.stringify(packageJSON, null, "  ") + "\n"; ///
        writeFile(packageJSONFilePath, packageJSONContent);
        success = true;
    } catch (error) {
        console.log('There was an error when writing to the package.json file in the "'.concat(subDirectoryPath, '" sub-directory:'));
        console.log(error);
        success = false;
    }
    return success;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvcGFja2FnZUpTT04uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMsIGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFBBQ0tBR0VfSlNPTiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBjb25jYXRlbmF0ZVBhdGhzIH0gPSBwYXRoVXRpbGl0aWVzLFxuICAgICAgeyByZWFkRmlsZSwgd3JpdGVGaWxlLCBjaGVja0ZpbGVFeGlzdHMgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgbGV0IHBhY2thZ2VKU09OID0gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhY2thZ2VKU09ORmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKHN1YkRpcmVjdG9yeVBhdGgsIFBBQ0tBR0VfSlNPTiksXG4gICAgICAgICAgcGFja2FnZUpTT05GSWxlRXhpc3RzID0gY2hlY2tGaWxlRXhpc3RzKHBhY2thZ2VKU09ORmlsZVBhdGgpO1xuXG4gICAgaWYgKHBhY2thZ2VKU09ORklsZUV4aXN0cykge1xuICAgICAgY29uc3QgcGFja2FnZUpTT05GaWxlQ29udGVudCA9IHJlYWRGaWxlKHBhY2thZ2VKU09ORmlsZVBhdGgpO1xuXG4gICAgICBwYWNrYWdlSlNPTiA9IEpTT04ucGFyc2UocGFja2FnZUpTT05GaWxlQ29udGVudCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGBUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiByZWFkaW5nIGZyb20gdGhlIHBhY2thZ2UuanNvbiBmaWxlIGluIHRoZSAnJHtzdWJEaXJlY3RvcnlQYXRofScgc3ViLWRpcmVjdG9yeTpgKTtcblxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIHJldHVybiBwYWNrYWdlSlNPTjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgsIHBhY2thZ2VKU09OKSB7XG4gIGxldCBzdWNjZXNzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcGFja2FnZUpTT05GaWxlUGF0aCA9IGNvbmNhdGVuYXRlUGF0aHMoc3ViRGlyZWN0b3J5UGF0aCwgUEFDS0FHRV9KU09OKSxcbiAgICAgICAgICBwYWNrYWdlSlNPTkNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShwYWNrYWdlSlNPTiwgbnVsbCwgXCIgIFwiKSArIFwiXFxuXCI7ICAvLy9cblxuICAgIHdyaXRlRmlsZShwYWNrYWdlSlNPTkZpbGVQYXRoLCBwYWNrYWdlSlNPTkNvbnRlbnQpO1xuXG4gICAgc3VjY2VzcyA9IHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5sb2coYFRoZXJlIHdhcyBhbiBlcnJvciB3aGVuIHdyaXRpbmcgdG8gdGhlIHBhY2thZ2UuanNvbiBmaWxlIGluIHRoZSBcIiR7c3ViRGlyZWN0b3J5UGF0aH1cIiBzdWItZGlyZWN0b3J5OmApO1xuXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuXG4gICAgc3VjY2VzcyA9IGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHN1Y2Nlc3M7XG59XG4iXSwibmFtZXMiOlsicmVhZFBhY2thZ2VKU09ORmlsZSIsIndyaXRlUGFja2FnZUpTT05GaWxlIiwiY29uY2F0ZW5hdGVQYXRocyIsInBhdGhVdGlsaXRpZXMiLCJyZWFkRmlsZSIsImZpbGVTeXN0ZW1VdGlsaXRpZXMiLCJ3cml0ZUZpbGUiLCJjaGVja0ZpbGVFeGlzdHMiLCJzdWJEaXJlY3RvcnlQYXRoIiwicGFja2FnZUpTT04iLCJwYWNrYWdlSlNPTkZpbGVQYXRoIiwiUEFDS0FHRV9KU09OIiwicGFja2FnZUpTT05GSWxlRXhpc3RzIiwicGFja2FnZUpTT05GaWxlQ29udGVudCIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInN1Y2Nlc3MiLCJwYWNrYWdlSlNPTkNvbnRlbnQiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQVNnQkE7ZUFBQUE7O1FBcUJBQztlQUFBQTs7O3lCQTVCbUM7eUJBRXRCO0FBRTdCLElBQU0sQUFBRUMsbUJBQXFCQyx3QkFBYSxDQUFsQ0Qsa0JBQ0FFLFdBQXlDQyw4QkFBbUIsQ0FBNURELFVBQVVFLFlBQStCRCw4QkFBbUIsQ0FBbERDLFdBQVdDLGtCQUFvQkYsOEJBQW1CLENBQXZDRTtBQUV0QixTQUFTUCxvQkFBb0JRLGdCQUFnQjtJQUNsRCxJQUFJQyxjQUFjO0lBRWxCLElBQUk7UUFDRixJQUFNQyxzQkFBc0JSLGlCQUFpQk0sa0JBQWtCRyx1QkFBWSxHQUNyRUMsd0JBQXdCTCxnQkFBZ0JHO1FBRTlDLElBQUlFLHVCQUF1QjtZQUN6QixJQUFNQyx5QkFBeUJULFNBQVNNO1lBRXhDRCxjQUFjSyxLQUFLQyxLQUFLLENBQUNGO1FBQzNCO0lBQ0YsRUFBRSxPQUFPRyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLHNFQUFzRixPQUFqQlYsa0JBQWlCO1FBRW5HUyxRQUFRQyxHQUFHLENBQUNGO0lBQ2Q7SUFFQSxPQUFPUDtBQUNUO0FBRU8sU0FBU1IscUJBQXFCTyxnQkFBZ0IsRUFBRUMsV0FBVztJQUNoRSxJQUFJVTtJQUVKLElBQUk7UUFDRixJQUFNVCxzQkFBc0JSLGlCQUFpQk0sa0JBQWtCRyx1QkFBWSxHQUNyRVMscUJBQXFCTixLQUFLTyxTQUFTLENBQUNaLGFBQWEsTUFBTSxRQUFRLE1BQU8sR0FBRztRQUUvRUgsVUFBVUkscUJBQXFCVTtRQUUvQkQsVUFBVTtJQUNaLEVBQUUsT0FBT0gsT0FBTztRQUNkQyxRQUFRQyxHQUFHLENBQUMsQUFBQyxvRUFBb0YsT0FBakJWLGtCQUFpQjtRQUVqR1MsUUFBUUMsR0FBRyxDQUFDRjtRQUVaRyxVQUFVO0lBQ1o7SUFFQSxPQUFPQTtBQUNUIn0=