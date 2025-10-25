"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return listForcedDependencyRelationsAction;
    }
});
var _constants = require("../constants");
var _configuration = require("../configuration");
var _messages = require("../messages");
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
function listForcedDependencyRelationsAction() {
    var ignoredDependencyNumbers = [], ignoredDependencies = (0, _configuration.retrieveIgnoredDependencies)(), ignoredDependenciesLength = ignoredDependencies.length;
    if (ignoredDependenciesLength === 0) {
        console.log(_messages.NO_IGNORED_DEPENDENCIES_MESSAGE);
    } else {
        var ignoredDependencyNames = _to_consumable_array(ignoredDependencies);
        console.log(_constants.EMPTY_STRING);
        ignoredDependencyNames.forEach(function(ignoredDependencyName, index) {
            var ignoredDependencyNumber = index + 1; ///
            console.log(" ".concat(ignoredDependencyNumber, ': "').concat(ignoredDependencyName, '"'));
            ignoredDependencyNumbers.push(ignoredDependencyNumber);
        });
        console.log(_constants.EMPTY_STRING);
    }
    return ignoredDependencyNumbers;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb24vbGlzdElnbm9yZWREZXBlbmRlbmNpZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IEVNUFRZX1NUUklORyB9IGZyb20gXCIuLi9jb25zdGFudHNcIjtcbmltcG9ydCB7IHJldHJpZXZlSWdub3JlZERlcGVuZGVuY2llcyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5cbmltcG9ydCB7IE5PX0lHTk9SRURfREVQRU5ERU5DSUVTX01FU1NBR0UgfSBmcm9tIFwiLi4vbWVzc2FnZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNBY3Rpb24oKSB7XG4gIGNvbnN0IGlnbm9yZWREZXBlbmRlbmN5TnVtYmVycyA9IFtdLFxuICAgICAgICBpZ25vcmVkRGVwZW5kZW5jaWVzID0gcmV0cmlldmVJZ25vcmVkRGVwZW5kZW5jaWVzKCksXG4gICAgICAgIGlnbm9yZWREZXBlbmRlbmNpZXNMZW5ndGggPSBpZ25vcmVkRGVwZW5kZW5jaWVzLmxlbmd0aDtcblxuICBpZiAoaWdub3JlZERlcGVuZGVuY2llc0xlbmd0aCA9PT0gMCkge1xuICAgIGNvbnNvbGUubG9nKE5PX0lHTk9SRURfREVQRU5ERU5DSUVTX01FU1NBR0UpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IGlnbm9yZWREZXBlbmRlbmN5TmFtZXMgPSBbXG4gICAgICAuLi5pZ25vcmVkRGVwZW5kZW5jaWVzXG4gICAgXTtcblxuICAgIGNvbnNvbGUubG9nKEVNUFRZX1NUUklORyk7XG5cbiAgICBpZ25vcmVkRGVwZW5kZW5jeU5hbWVzLmZvckVhY2goKGlnbm9yZWREZXBlbmRlbmN5TmFtZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGlnbm9yZWREZXBlbmRlbmN5TnVtYmVyID0gaW5kZXggKyAxOyAgLy8vXG5cbiAgICAgIGNvbnNvbGUubG9nKGAgJHtpZ25vcmVkRGVwZW5kZW5jeU51bWJlcn06IFwiJHtpZ25vcmVkRGVwZW5kZW5jeU5hbWV9XCJgKTtcblxuICAgICAgaWdub3JlZERlcGVuZGVuY3lOdW1iZXJzLnB1c2goaWdub3JlZERlcGVuZGVuY3lOdW1iZXIpO1xuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2coRU1QVFlfU1RSSU5HKTtcbiAgfVxuXG4gIHJldHVybiBpZ25vcmVkRGVwZW5kZW5jeU51bWJlcnM7XG59XG4iXSwibmFtZXMiOlsibGlzdEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnNBY3Rpb24iLCJpZ25vcmVkRGVwZW5kZW5jeU51bWJlcnMiLCJpZ25vcmVkRGVwZW5kZW5jaWVzIiwicmV0cmlldmVJZ25vcmVkRGVwZW5kZW5jaWVzIiwiaWdub3JlZERlcGVuZGVuY2llc0xlbmd0aCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJOT19JR05PUkVEX0RFUEVOREVOQ0lFU19NRVNTQUdFIiwiaWdub3JlZERlcGVuZGVuY3lOYW1lcyIsIkVNUFRZX1NUUklORyIsImZvckVhY2giLCJpZ25vcmVkRGVwZW5kZW5jeU5hbWUiLCJpbmRleCIsImlnbm9yZWREZXBlbmRlbmN5TnVtYmVyIiwicHVzaCJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBT0E7OztlQUF3QkE7Ozt5QkFMSzs2QkFDZTt3QkFFSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFakMsU0FBU0E7SUFDdEIsSUFBTUMsMkJBQTJCLEVBQUUsRUFDN0JDLHNCQUFzQkMsSUFBQUEsMENBQTJCLEtBQ2pEQyw0QkFBNEJGLG9CQUFvQkcsTUFBTTtJQUU1RCxJQUFJRCw4QkFBOEIsR0FBRztRQUNuQ0UsUUFBUUMsR0FBRyxDQUFDQyx5Q0FBK0I7SUFDN0MsT0FBTztRQUNMLElBQU1DLHlCQUNKLHFCQUFHUDtRQUdMSSxRQUFRQyxHQUFHLENBQUNHLHVCQUFZO1FBRXhCRCx1QkFBdUJFLE9BQU8sQ0FBQyxTQUFDQyx1QkFBdUJDO1lBQ3JELElBQU1DLDBCQUEwQkQsUUFBUSxHQUFJLEdBQUc7WUFFL0NQLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLElBQWdDSyxPQUE3QkUseUJBQXdCLE9BQTJCLE9BQXRCRix1QkFBc0I7WUFFbkVYLHlCQUF5QmMsSUFBSSxDQUFDRDtRQUNoQztRQUVBUixRQUFRQyxHQUFHLENBQUNHLHVCQUFZO0lBQzFCO0lBRUEsT0FBT1Q7QUFDVCJ9