"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return listDirectoriesAction;
    }
});
const _constants = require("../constants");
const _configuration = require("../configuration");
const _defaults = require("../defaults");
function listDirectoriesAction() {
    const directoryNumbers = [], directories = (0, _configuration.retrieveDirectories)(), defaultDirectoryName = _defaults.DEFAULT_DIRECTORY_NAME, directoryNames = [
        defaultDirectoryName,
        ...directories
    ];
    console.log(_constants.EMPTY_STRING);
    directoryNames.forEach((directoryName, index)=>{
        if (index === 0) {
            console.log(`    "${directoryName}"`);
        } else {
            const directoryNumber = index; ///
            console.log(` ${directoryNumber}: "${directoryName}"`);
            directoryNumbers.push(directoryNumber);
        }
    });
    console.log(_constants.EMPTY_STRING);
    return directoryNumbers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vbGlzdERpcmVjdG9yaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyByZXRyaWV2ZURpcmVjdG9yaWVzIH0gZnJvbSBcIi4uL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IERFRkFVTFRfRElSRUNUT1JZX05BTUUgfSBmcm9tIFwiLi4vZGVmYXVsdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdERpcmVjdG9yaWVzQWN0aW9uKCkge1xuICBjb25zdCBkaXJlY3RvcnlOdW1iZXJzID0gW10sXG4gICAgICAgIGRpcmVjdG9yaWVzID0gcmV0cmlldmVEaXJlY3RvcmllcygpLFxuICAgICAgICBkZWZhdWx0RGlyZWN0b3J5TmFtZSA9IERFRkFVTFRfRElSRUNUT1JZX05BTUUsXG4gICAgICAgIGRpcmVjdG9yeU5hbWVzID0gW1xuICAgICAgICAgIGRlZmF1bHREaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIC4uLmRpcmVjdG9yaWVzXG4gICAgICAgIF07XG5cbiAgY29uc29sZS5sb2coRU1QVFlfU1RSSU5HKTtcblxuICBkaXJlY3RvcnlOYW1lcy5mb3JFYWNoKChkaXJlY3RvcnlOYW1lLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coYCAgICBcIiR7ZGlyZWN0b3J5TmFtZX1cImApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOdW1iZXIgPSBpbmRleDsgIC8vL1xuXG4gICAgICBjb25zb2xlLmxvZyhgICR7ZGlyZWN0b3J5TnVtYmVyfTogXCIke2RpcmVjdG9yeU5hbWV9XCJgKTtcblxuICAgICAgZGlyZWN0b3J5TnVtYmVycy5wdXNoKGRpcmVjdG9yeU51bWJlcik7XG4gICAgfVxuICB9KTtcblxuICBjb25zb2xlLmxvZyhFTVBUWV9TVFJJTkcpO1xuXG4gIHJldHVybiBkaXJlY3RvcnlOdW1iZXJzO1xufVxuIl0sIm5hbWVzIjpbImxpc3REaXJlY3Rvcmllc0FjdGlvbiIsImRpcmVjdG9yeU51bWJlcnMiLCJkaXJlY3RvcmllcyIsInJldHJpZXZlRGlyZWN0b3JpZXMiLCJkZWZhdWx0RGlyZWN0b3J5TmFtZSIsIkRFRkFVTFRfRElSRUNUT1JZX05BTUUiLCJkaXJlY3RvcnlOYW1lcyIsImNvbnNvbGUiLCJsb2ciLCJFTVBUWV9TVFJJTkciLCJmb3JFYWNoIiwiZGlyZWN0b3J5TmFtZSIsImluZGV4IiwiZGlyZWN0b3J5TnVtYmVyIiwicHVzaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBTUE7OztlQUF3QkE7OzsyQkFKSzsrQkFDTzswQkFDRztBQUV4QixTQUFTQTtJQUN0QixNQUFNQyxtQkFBbUIsRUFBRSxFQUNyQkMsY0FBY0MsSUFBQUEsa0NBQW1CLEtBQ2pDQyx1QkFBdUJDLGdDQUFzQixFQUM3Q0MsaUJBQWlCO1FBQ2ZGO1dBQ0dGO0tBQ0o7SUFFUEssUUFBUUMsR0FBRyxDQUFDQyx1QkFBWTtJQUV4QkgsZUFBZUksT0FBTyxDQUFDLENBQUNDLGVBQWVDO1FBQ3JDLElBQUlBLFVBQVUsR0FBRztZQUNmTCxRQUFRQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUVHLGNBQWMsQ0FBQyxDQUFDO1FBQ3RDLE9BQU87WUFDTCxNQUFNRSxrQkFBa0JELE9BQVEsR0FBRztZQUVuQ0wsUUFBUUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFSyxnQkFBZ0IsR0FBRyxFQUFFRixjQUFjLENBQUMsQ0FBQztZQUVyRFYsaUJBQWlCYSxJQUFJLENBQUNEO1FBQ3hCO0lBQ0Y7SUFFQU4sUUFBUUMsR0FBRyxDQUFDQyx1QkFBWTtJQUV4QixPQUFPUjtBQUNUIn0=