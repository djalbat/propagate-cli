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
var _constants = require("../constants");
var _configuration = require("../configuration");
var _defaults = require("../defaults");
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function listDirectoriesAction() {
    var directoryNumbers = [], directories = (0, _configuration.retrieveDirectories)(), defaultDirectoryName = _defaults.DEFAULT_DIRECTORY_NAME, directoryNames = [
        defaultDirectoryName
    ].concat(_to_consumable_array(directories));
    console.log(_constants.EMPTY_STRING);
    directoryNames.forEach(function(directoryName, index) {
        if (index === 0) {
            console.log('    "'.concat(directoryName, '"'));
        } else {
            var directoryNumber = index; ///
            console.log(" ".concat(directoryNumber, ': "').concat(directoryName, '"'));
            directoryNumbers.push(directoryNumber);
        }
    });
    console.log(_constants.EMPTY_STRING);
    return directoryNumbers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vbGlzdERpcmVjdG9yaWVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBFTVBUWV9TVFJJTkcgfSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XG5pbXBvcnQgeyByZXRyaWV2ZURpcmVjdG9yaWVzIH0gZnJvbSBcIi4uL2NvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IERFRkFVTFRfRElSRUNUT1JZX05BTUUgfSBmcm9tIFwiLi4vZGVmYXVsdHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdERpcmVjdG9yaWVzQWN0aW9uKCkge1xuICBjb25zdCBkaXJlY3RvcnlOdW1iZXJzID0gW10sXG4gICAgICAgIGRpcmVjdG9yaWVzID0gcmV0cmlldmVEaXJlY3RvcmllcygpLFxuICAgICAgICBkZWZhdWx0RGlyZWN0b3J5TmFtZSA9IERFRkFVTFRfRElSRUNUT1JZX05BTUUsXG4gICAgICAgIGRpcmVjdG9yeU5hbWVzID0gW1xuICAgICAgICAgIGRlZmF1bHREaXJlY3RvcnlOYW1lLFxuICAgICAgICAgIC4uLmRpcmVjdG9yaWVzXG4gICAgICAgIF07XG5cbiAgY29uc29sZS5sb2coRU1QVFlfU1RSSU5HKTtcblxuICBkaXJlY3RvcnlOYW1lcy5mb3JFYWNoKChkaXJlY3RvcnlOYW1lLCBpbmRleCkgPT4ge1xuICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgY29uc29sZS5sb2coYCAgICBcIiR7ZGlyZWN0b3J5TmFtZX1cImApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBkaXJlY3RvcnlOdW1iZXIgPSBpbmRleDsgIC8vL1xuXG4gICAgICBjb25zb2xlLmxvZyhgICR7ZGlyZWN0b3J5TnVtYmVyfTogXCIke2RpcmVjdG9yeU5hbWV9XCJgKTtcblxuICAgICAgZGlyZWN0b3J5TnVtYmVycy5wdXNoKGRpcmVjdG9yeU51bWJlcik7XG4gICAgfVxuICB9KTtcblxuICBjb25zb2xlLmxvZyhFTVBUWV9TVFJJTkcpO1xuXG4gIHJldHVybiBkaXJlY3RvcnlOdW1iZXJzO1xufVxuIl0sIm5hbWVzIjpbImxpc3REaXJlY3Rvcmllc0FjdGlvbiIsImRpcmVjdG9yeU51bWJlcnMiLCJkaXJlY3RvcmllcyIsInJldHJpZXZlRGlyZWN0b3JpZXMiLCJkZWZhdWx0RGlyZWN0b3J5TmFtZSIsIkRFRkFVTFRfRElSRUNUT1JZX05BTUUiLCJkaXJlY3RvcnlOYW1lcyIsImNvbnNvbGUiLCJsb2ciLCJFTVBUWV9TVFJJTkciLCJmb3JFYWNoIiwiZGlyZWN0b3J5TmFtZSIsImluZGV4IiwiZGlyZWN0b3J5TnVtYmVyIiwicHVzaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBTUE7OztlQUF3QkE7Ozt5QkFKSzs2QkFDTzt3QkFDRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFeEIsU0FBU0E7SUFDdEIsSUFBTUMsbUJBQW1CLEVBQUUsRUFDckJDLGNBQWNDLElBQUFBLGtDQUFtQixLQUNqQ0MsdUJBQXVCQyxnQ0FBc0IsRUFDN0NDLGlCQUFpQjtRQUNmRjtLQUVELENBSGdCLE9BRWYscUJBQUdGO0lBR1hLLFFBQVFDLEdBQUcsQ0FBQ0MsdUJBQVk7SUFFeEJILGVBQWVJLE9BQU8sQ0FBQyxTQUFDQyxlQUFlQztRQUNyQyxJQUFJQSxVQUFVLEdBQUc7WUFDZkwsUUFBUUMsR0FBRyxDQUFDLEFBQUMsUUFBcUIsT0FBZEcsZUFBYztRQUNwQyxPQUFPO1lBQ0wsSUFBTUUsa0JBQWtCRCxPQUFRLEdBQUc7WUFFbkNMLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLElBQXdCRyxPQUFyQkUsaUJBQWdCLE9BQW1CLE9BQWRGLGVBQWM7WUFFbkRWLGlCQUFpQmEsSUFBSSxDQUFDRDtRQUN4QjtJQUNGO0lBRUFOLFFBQVFDLEdBQUcsQ0FBQ0MsdUJBQVk7SUFFeEIsT0FBT1I7QUFDVCJ9