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
const _necessary = require("necessary");
const _constants = require("../constants");
const { concatenatePaths } = _necessary.pathUtilities, { readFile, writeFile, checkFileExists } = _necessary.fileSystemUtilities;
function readPackageJSONFile(subDirectoryPath) {
    let packageJSON = null;
    try {
        const packageJSONFilePath = concatenatePaths(subDirectoryPath, _constants.PACKAGE_JSON), packageJSONFIleExists = checkFileExists(packageJSONFilePath);
        if (packageJSONFIleExists) {
            const packageJSONFileContent = readFile(packageJSONFilePath);
            packageJSON = JSON.parse(packageJSONFileContent);
        }
    } catch (error) {
        console.log(`There was an error when reading from the package.json file in the '${subDirectoryPath}' sub-directory:`);
        console.log(error);
    }
    return packageJSON;
}
function writePackageJSONFile(subDirectoryPath, packageJSON) {
    let success;
    try {
        const packageJSONFilePath = concatenatePaths(subDirectoryPath, _constants.PACKAGE_JSON), packageJSONContent = JSON.stringify(packageJSON, null, 2) + "\n"; ///
        writeFile(packageJSONFilePath, packageJSONContent);
        success = true;
    } catch (error) {
        console.log(`There was an error when writing to the package.json file in the "${subDirectoryPath}" sub-directory:`);
        console.log(error);
        success = false;
    }
    return success;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvcGFja2FnZUpTT04uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMsIGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFBBQ0tBR0VfSlNPTiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBjb25jYXRlbmF0ZVBhdGhzIH0gPSBwYXRoVXRpbGl0aWVzLFxuICAgICAgeyByZWFkRmlsZSwgd3JpdGVGaWxlLCBjaGVja0ZpbGVFeGlzdHMgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgbGV0IHBhY2thZ2VKU09OID0gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhY2thZ2VKU09ORmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKHN1YkRpcmVjdG9yeVBhdGgsIFBBQ0tBR0VfSlNPTiksXG4gICAgICAgICAgcGFja2FnZUpTT05GSWxlRXhpc3RzID0gY2hlY2tGaWxlRXhpc3RzKHBhY2thZ2VKU09ORmlsZVBhdGgpO1xuXG4gICAgaWYgKHBhY2thZ2VKU09ORklsZUV4aXN0cykge1xuICAgICAgY29uc3QgcGFja2FnZUpTT05GaWxlQ29udGVudCA9IHJlYWRGaWxlKHBhY2thZ2VKU09ORmlsZVBhdGgpO1xuXG4gICAgICBwYWNrYWdlSlNPTiA9IEpTT04ucGFyc2UocGFja2FnZUpTT05GaWxlQ29udGVudCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGBUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiByZWFkaW5nIGZyb20gdGhlIHBhY2thZ2UuanNvbiBmaWxlIGluIHRoZSAnJHtzdWJEaXJlY3RvcnlQYXRofScgc3ViLWRpcmVjdG9yeTpgKTtcblxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIHJldHVybiBwYWNrYWdlSlNPTjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgsIHBhY2thZ2VKU09OKSB7XG4gIGxldCBzdWNjZXNzO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgcGFja2FnZUpTT05GaWxlUGF0aCA9IGNvbmNhdGVuYXRlUGF0aHMoc3ViRGlyZWN0b3J5UGF0aCwgUEFDS0FHRV9KU09OKSxcbiAgICAgICAgICBwYWNrYWdlSlNPTkNvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShwYWNrYWdlSlNPTiwgbnVsbCwgMikgKyBcIlxcblwiOyAgLy8vXG5cbiAgICB3cml0ZUZpbGUocGFja2FnZUpTT05GaWxlUGF0aCwgcGFja2FnZUpTT05Db250ZW50KTtcblxuICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGBUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiB3cml0aW5nIHRvIHRoZSBwYWNrYWdlLmpzb24gZmlsZSBpbiB0aGUgXCIke3N1YkRpcmVjdG9yeVBhdGh9XCIgc3ViLWRpcmVjdG9yeTpgKTtcblxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuIl0sIm5hbWVzIjpbInJlYWRQYWNrYWdlSlNPTkZpbGUiLCJ3cml0ZVBhY2thZ2VKU09ORmlsZSIsImNvbmNhdGVuYXRlUGF0aHMiLCJwYXRoVXRpbGl0aWVzIiwicmVhZEZpbGUiLCJ3cml0ZUZpbGUiLCJjaGVja0ZpbGVFeGlzdHMiLCJmaWxlU3lzdGVtVXRpbGl0aWVzIiwic3ViRGlyZWN0b3J5UGF0aCIsInBhY2thZ2VKU09OIiwicGFja2FnZUpTT05GaWxlUGF0aCIsIlBBQ0tBR0VfSlNPTiIsInBhY2thZ2VKU09ORklsZUV4aXN0cyIsInBhY2thZ2VKU09ORmlsZUNvbnRlbnQiLCJKU09OIiwicGFyc2UiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJzdWNjZXNzIiwicGFja2FnZUpTT05Db250ZW50Iiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUFTZ0JBO2VBQUFBOztRQXFCQUM7ZUFBQUE7OzsyQkE1Qm1DOzJCQUV0QjtBQUU3QixNQUFNLEVBQUVDLGdCQUFnQixFQUFFLEdBQUdDLHdCQUFhLEVBQ3BDLEVBQUVDLFFBQVEsRUFBRUMsU0FBUyxFQUFFQyxlQUFlLEVBQUUsR0FBR0MsOEJBQW1CO0FBRTdELFNBQVNQLG9CQUFvQlEsZ0JBQWdCO0lBQ2xELElBQUlDLGNBQWM7SUFFbEIsSUFBSTtRQUNGLE1BQU1DLHNCQUFzQlIsaUJBQWlCTSxrQkFBa0JHLHVCQUFZLEdBQ3JFQyx3QkFBd0JOLGdCQUFnQkk7UUFFOUMsSUFBSUUsdUJBQXVCO1lBQ3pCLE1BQU1DLHlCQUF5QlQsU0FBU007WUFFeENELGNBQWNLLEtBQUtDLEtBQUssQ0FBQ0Y7UUFDM0I7SUFDRixFQUFFLE9BQU9HLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLENBQUMsbUVBQW1FLEVBQUVWLGlCQUFpQixnQkFBZ0IsQ0FBQztRQUVwSFMsUUFBUUMsR0FBRyxDQUFDRjtJQUNkO0lBRUEsT0FBT1A7QUFDVDtBQUVPLFNBQVNSLHFCQUFxQk8sZ0JBQWdCLEVBQUVDLFdBQVc7SUFDaEUsSUFBSVU7SUFFSixJQUFJO1FBQ0YsTUFBTVQsc0JBQXNCUixpQkFBaUJNLGtCQUFrQkcsdUJBQVksR0FDckVTLHFCQUFxQk4sS0FBS08sU0FBUyxDQUFDWixhQUFhLE1BQU0sS0FBSyxNQUFPLEdBQUc7UUFFNUVKLFVBQVVLLHFCQUFxQlU7UUFFL0JELFVBQVU7SUFDWixFQUFFLE9BQU9ILE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLENBQUMsaUVBQWlFLEVBQUVWLGlCQUFpQixnQkFBZ0IsQ0FBQztRQUVsSFMsUUFBUUMsR0FBRyxDQUFDRjtRQUVaRyxVQUFVO0lBQ1o7SUFFQSxPQUFPQTtBQUNUIn0=