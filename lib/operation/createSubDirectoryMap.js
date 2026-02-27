"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return createSubDirectoryMapOperation;
    }
});
const _necessary = require("necessary");
const _configuration = require("../configuration");
const _path = require("../utilities/path");
const _defaults = require("../defaults");
const { concatenatePaths } = _necessary.pathUtilities, { readDirectory, isEntryDirectory } = _necessary.fileSystemUtilities;
function createSubDirectoryMapOperation(proceed, abort, context) {
    const subDirectoryMap = {}, directories = (0, _configuration.retrieveDirectories)(), directoryNames = [
        _defaults.DEFAULT_DIRECTORY_NAME,
        ...directories
    ];
    directoryNames.forEach((directoryName)=>{
        try {
            const absoluteDirectoryPath = (0, _path.absolutePathFromName)(directoryName), entryNames = readDirectory(absoluteDirectoryPath);
            entryNames.forEach((entryName)=>{
                const entryPath = concatenatePaths(directoryName, entryName), entryDirectory = isEntryDirectory(entryPath);
                if (entryDirectory) {
                    const subDirectoryName = entryName, subDirectoryPath = entryPath; ///
                    subDirectoryMap[subDirectoryName] = subDirectoryPath;
                }
            });
        } catch (error) {
            console.log(`The '${directoryName}' directory cannot be read.`);
        }
    });
    Object.assign(context, {
        subDirectoryMap
    });
    proceed();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vY3JlYXRlU3ViRGlyZWN0b3J5TWFwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBwYXRoVXRpbGl0aWVzLCBmaWxlU3lzdGVtVXRpbGl0aWVzIH0gZnJvbSBcIm5lY2Vzc2FyeVwiO1xuXG5pbXBvcnQgeyByZXRyaWV2ZURpcmVjdG9yaWVzIH0gZnJvbSBcIi4uL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IGFic29sdXRlUGF0aEZyb21OYW1lIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9wYXRoXCI7XG5pbXBvcnQgeyBERUZBVUxUX0RJUkVDVE9SWV9OQU1FIH0gZnJvbSBcIi4uL2RlZmF1bHRzXCI7XG5cbmNvbnN0IHsgY29uY2F0ZW5hdGVQYXRocyB9ID0gcGF0aFV0aWxpdGllcyxcbiAgICAgIHsgcmVhZERpcmVjdG9yeSwgaXNFbnRyeURpcmVjdG9yeSB9ID0gZmlsZVN5c3RlbVV0aWxpdGllcztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3ViRGlyZWN0b3J5TWFwT3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGNvbnN0IHN1YkRpcmVjdG9yeU1hcCA9IHt9LFxuICAgICAgICBkaXJlY3RvcmllcyA9IHJldHJpZXZlRGlyZWN0b3JpZXMoKSxcbiAgICAgICAgZGlyZWN0b3J5TmFtZXMgPSBbXG4gICAgICAgICAgREVGQVVMVF9ESVJFQ1RPUllfTkFNRSxcbiAgICAgICAgICAuLi5kaXJlY3Rvcmllc1xuICAgICAgICBdO1xuXG4gIGRpcmVjdG9yeU5hbWVzLmZvckVhY2goKGRpcmVjdG9yeU5hbWUpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWJzb2x1dGVEaXJlY3RvcnlQYXRoID0gYWJzb2x1dGVQYXRoRnJvbU5hbWUoZGlyZWN0b3J5TmFtZSksXG4gICAgICAgICAgICBlbnRyeU5hbWVzID0gcmVhZERpcmVjdG9yeShhYnNvbHV0ZURpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBlbnRyeU5hbWVzLmZvckVhY2goKGVudHJ5TmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBlbnRyeVBhdGggPSBjb25jYXRlbmF0ZVBhdGhzKGRpcmVjdG9yeU5hbWUsIGVudHJ5TmFtZSksXG4gICAgICAgICAgICAgIGVudHJ5RGlyZWN0b3J5ID0gaXNFbnRyeURpcmVjdG9yeShlbnRyeVBhdGgpO1xuXG4gICAgICAgIGlmIChlbnRyeURpcmVjdG9yeSkge1xuICAgICAgICAgIGNvbnN0IHN1YkRpcmVjdG9yeU5hbWUgPSBlbnRyeU5hbWUsIC8vL1xuICAgICAgICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGggPSBlbnRyeVBhdGg7IC8vL1xuXG4gICAgICAgICAgc3ViRGlyZWN0b3J5TWFwW3N1YkRpcmVjdG9yeU5hbWVdID0gc3ViRGlyZWN0b3J5UGF0aDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBUaGUgJyR7ZGlyZWN0b3J5TmFtZX0nIGRpcmVjdG9yeSBjYW5ub3QgYmUgcmVhZC5gKTtcbiAgICB9XG4gIH0pO1xuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIHN1YkRpcmVjdG9yeU1hcFxuICB9KTtcblxuICBwcm9jZWVkKCk7XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlU3ViRGlyZWN0b3J5TWFwT3BlcmF0aW9uIiwiY29uY2F0ZW5hdGVQYXRocyIsInBhdGhVdGlsaXRpZXMiLCJyZWFkRGlyZWN0b3J5IiwiaXNFbnRyeURpcmVjdG9yeSIsImZpbGVTeXN0ZW1VdGlsaXRpZXMiLCJwcm9jZWVkIiwiYWJvcnQiLCJjb250ZXh0Iiwic3ViRGlyZWN0b3J5TWFwIiwiZGlyZWN0b3JpZXMiLCJyZXRyaWV2ZURpcmVjdG9yaWVzIiwiZGlyZWN0b3J5TmFtZXMiLCJERUZBVUxUX0RJUkVDVE9SWV9OQU1FIiwiZm9yRWFjaCIsImRpcmVjdG9yeU5hbWUiLCJhYnNvbHV0ZURpcmVjdG9yeVBhdGgiLCJhYnNvbHV0ZVBhdGhGcm9tTmFtZSIsImVudHJ5TmFtZXMiLCJlbnRyeU5hbWUiLCJlbnRyeVBhdGgiLCJlbnRyeURpcmVjdG9yeSIsInN1YkRpcmVjdG9yeU5hbWUiLCJzdWJEaXJlY3RvcnlQYXRoIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTs7OzsrQkFXQTs7O2VBQXdCQTs7OzJCQVQyQjsrQkFFZjtzQkFDQzswQkFDRTtBQUV2QyxNQUFNLEVBQUVDLGdCQUFnQixFQUFFLEdBQUdDLHdCQUFhLEVBQ3BDLEVBQUVDLGFBQWEsRUFBRUMsZ0JBQWdCLEVBQUUsR0FBR0MsOEJBQW1CO0FBRWhELFNBQVNMLCtCQUErQk0sT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE9BQU87SUFDNUUsTUFBTUMsa0JBQWtCLENBQUMsR0FDbkJDLGNBQWNDLElBQUFBLGtDQUFtQixLQUNqQ0MsaUJBQWlCO1FBQ2ZDLGdDQUFzQjtXQUNuQkg7S0FDSjtJQUVQRSxlQUFlRSxPQUFPLENBQUMsQ0FBQ0M7UUFDdEIsSUFBSTtZQUNGLE1BQU1DLHdCQUF3QkMsSUFBQUEsMEJBQW9CLEVBQUNGLGdCQUM3Q0csYUFBYWYsY0FBY2E7WUFFakNFLFdBQVdKLE9BQU8sQ0FBQyxDQUFDSztnQkFDbEIsTUFBTUMsWUFBWW5CLGlCQUFpQmMsZUFBZUksWUFDNUNFLGlCQUFpQmpCLGlCQUFpQmdCO2dCQUV4QyxJQUFJQyxnQkFBZ0I7b0JBQ2xCLE1BQU1DLG1CQUFtQkgsV0FDbkJJLG1CQUFtQkgsV0FBVyxHQUFHO29CQUV2Q1gsZUFBZSxDQUFDYSxpQkFBaUIsR0FBR0M7Z0JBQ3RDO1lBQ0Y7UUFDRixFQUFFLE9BQU9DLE9BQU87WUFDZEMsUUFBUUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFWCxjQUFjLDJCQUEyQixDQUFDO1FBQ2hFO0lBQ0Y7SUFFQVksT0FBT0MsTUFBTSxDQUFDcEIsU0FBUztRQUNyQkM7SUFDRjtJQUVBSDtBQUNGIn0=