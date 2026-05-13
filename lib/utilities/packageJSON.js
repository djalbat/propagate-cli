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
            const packageJSONFileContent = readFile(packageJSONFilePath), jsonString = packageJSONFileContent, json = JSON.parse(jsonString);
            packageJSON = json; ///
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
        const packageJSONFilePath = concatenatePaths(subDirectoryPath, _constants.PACKAGE_JSON), json = packageJSON, jsonString = JSON.stringify(json, null, 2), packageJSONContent = `${jsonString}
`;
        writeFile(packageJSONFilePath, packageJSONContent);
        success = true;
    } catch (error) {
        console.log(`There was an error when writing to the package.json file in the "${subDirectoryPath}" sub-directory:`);
        console.log(error);
        success = false;
    }
    return success;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvcGFja2FnZUpTT04uanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IHBhdGhVdGlsaXRpZXMsIGZpbGVTeXN0ZW1VdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IFBBQ0tBR0VfSlNPTiB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcblxuY29uc3QgeyBjb25jYXRlbmF0ZVBhdGhzIH0gPSBwYXRoVXRpbGl0aWVzLFxuICAgICAgeyByZWFkRmlsZSwgd3JpdGVGaWxlLCBjaGVja0ZpbGVFeGlzdHMgfSA9IGZpbGVTeXN0ZW1VdGlsaXRpZXM7XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkUGFja2FnZUpTT05GaWxlKHN1YkRpcmVjdG9yeVBhdGgpIHtcbiAgbGV0IHBhY2thZ2VKU09OID0gbnVsbDtcblxuICB0cnkge1xuICAgIGNvbnN0IHBhY2thZ2VKU09ORmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKHN1YkRpcmVjdG9yeVBhdGgsIFBBQ0tBR0VfSlNPTiksXG4gICAgICAgICAgcGFja2FnZUpTT05GSWxlRXhpc3RzID0gY2hlY2tGaWxlRXhpc3RzKHBhY2thZ2VKU09ORmlsZVBhdGgpO1xuXG4gICAgaWYgKHBhY2thZ2VKU09ORklsZUV4aXN0cykge1xuICAgICAgY29uc3QgcGFja2FnZUpTT05GaWxlQ29udGVudCA9IHJlYWRGaWxlKHBhY2thZ2VKU09ORmlsZVBhdGgpLFxuICAgICAgICAgICAganNvblN0cmluZyA9IHBhY2thZ2VKU09ORmlsZUNvbnRlbnQsICAvLy9cbiAgICAgICAgICAgIGpzb24gPSBKU09OLnBhcnNlKGpzb25TdHJpbmcpO1xuXG4gICAgICBwYWNrYWdlSlNPTiA9IGpzb247IC8vL1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhgVGhlcmUgd2FzIGFuIGVycm9yIHdoZW4gcmVhZGluZyBmcm9tIHRoZSBwYWNrYWdlLmpzb24gZmlsZSBpbiB0aGUgJyR7c3ViRGlyZWN0b3J5UGF0aH0nIHN1Yi1kaXJlY3Rvcnk6YCk7XG5cbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICByZXR1cm4gcGFja2FnZUpTT047XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZVBhY2thZ2VKU09ORmlsZShzdWJEaXJlY3RvcnlQYXRoLCBwYWNrYWdlSlNPTikge1xuICBsZXQgc3VjY2VzcztcblxuICB0cnkge1xuICAgIGNvbnN0IHBhY2thZ2VKU09ORmlsZVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKHN1YkRpcmVjdG9yeVBhdGgsIFBBQ0tBR0VfSlNPTiksXG4gICAgICAgICAganNvbiA9IHBhY2thZ2VKU09OLCAvLy9cbiAgICAgICAgICBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoanNvbiwgbnVsbCwgMiksXG4gICAgICAgICAgcGFja2FnZUpTT05Db250ZW50ID0gYCR7anNvblN0cmluZ31cbmA7XG5cbiAgICB3cml0ZUZpbGUocGFja2FnZUpTT05GaWxlUGF0aCwgcGFja2FnZUpTT05Db250ZW50KTtcblxuICAgIHN1Y2Nlc3MgPSB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGBUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiB3cml0aW5nIHRvIHRoZSBwYWNrYWdlLmpzb24gZmlsZSBpbiB0aGUgXCIke3N1YkRpcmVjdG9yeVBhdGh9XCIgc3ViLWRpcmVjdG9yeTpgKTtcblxuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcblxuICAgIHN1Y2Nlc3MgPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBzdWNjZXNzO1xufVxuIl0sIm5hbWVzIjpbInJlYWRQYWNrYWdlSlNPTkZpbGUiLCJ3cml0ZVBhY2thZ2VKU09ORmlsZSIsImNvbmNhdGVuYXRlUGF0aHMiLCJwYXRoVXRpbGl0aWVzIiwicmVhZEZpbGUiLCJ3cml0ZUZpbGUiLCJjaGVja0ZpbGVFeGlzdHMiLCJmaWxlU3lzdGVtVXRpbGl0aWVzIiwic3ViRGlyZWN0b3J5UGF0aCIsInBhY2thZ2VKU09OIiwicGFja2FnZUpTT05GaWxlUGF0aCIsIlBBQ0tBR0VfSlNPTiIsInBhY2thZ2VKU09ORklsZUV4aXN0cyIsInBhY2thZ2VKU09ORmlsZUNvbnRlbnQiLCJqc29uU3RyaW5nIiwianNvbiIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwiY29uc29sZSIsImxvZyIsInN1Y2Nlc3MiLCJzdHJpbmdpZnkiLCJwYWNrYWdlSlNPTkNvbnRlbnQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQVNnQkE7ZUFBQUE7O1FBdUJBQztlQUFBQTs7OzJCQTlCbUM7MkJBRXRCO0FBRTdCLE1BQU0sRUFBRUMsZ0JBQWdCLEVBQUUsR0FBR0Msd0JBQWEsRUFDcEMsRUFBRUMsUUFBUSxFQUFFQyxTQUFTLEVBQUVDLGVBQWUsRUFBRSxHQUFHQyw4QkFBbUI7QUFFN0QsU0FBU1Asb0JBQW9CUSxnQkFBZ0I7SUFDbEQsSUFBSUMsY0FBYztJQUVsQixJQUFJO1FBQ0YsTUFBTUMsc0JBQXNCUixpQkFBaUJNLGtCQUFrQkcsdUJBQVksR0FDckVDLHdCQUF3Qk4sZ0JBQWdCSTtRQUU5QyxJQUFJRSx1QkFBdUI7WUFDekIsTUFBTUMseUJBQXlCVCxTQUFTTSxzQkFDbENJLGFBQWFELHdCQUNiRSxPQUFPQyxLQUFLQyxLQUFLLENBQUNIO1lBRXhCTCxjQUFjTSxNQUFNLEdBQUc7UUFDekI7SUFDRixFQUFFLE9BQU9HLE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLENBQUMsbUVBQW1FLEVBQUVaLGlCQUFpQixnQkFBZ0IsQ0FBQztRQUVwSFcsUUFBUUMsR0FBRyxDQUFDRjtJQUNkO0lBRUEsT0FBT1Q7QUFDVDtBQUVPLFNBQVNSLHFCQUFxQk8sZ0JBQWdCLEVBQUVDLFdBQVc7SUFDaEUsSUFBSVk7SUFFSixJQUFJO1FBQ0YsTUFBTVgsc0JBQXNCUixpQkFBaUJNLGtCQUFrQkcsdUJBQVksR0FDckVJLE9BQU9OLGFBQ1BLLGFBQWFFLEtBQUtNLFNBQVMsQ0FBQ1AsTUFBTSxNQUFNLElBQ3hDUSxxQkFBcUIsR0FBR1QsV0FBVztBQUM3QyxDQUFDO1FBRUdULFVBQVVLLHFCQUFxQmE7UUFFL0JGLFVBQVU7SUFDWixFQUFFLE9BQU9ILE9BQU87UUFDZEMsUUFBUUMsR0FBRyxDQUFDLENBQUMsaUVBQWlFLEVBQUVaLGlCQUFpQixnQkFBZ0IsQ0FBQztRQUVsSFcsUUFBUUMsR0FBRyxDQUFDRjtRQUVaRyxVQUFVO0lBQ1o7SUFFQSxPQUFPQTtBQUNUIn0=