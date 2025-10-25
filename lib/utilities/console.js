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
    get consoleLogSubDirectoryPathsCycle () {
        return consoleLogSubDirectoryPathsCycle;
    },
    get consoleLogUnpublishedDiff () {
        return consoleLogUnpublishedDiff;
    },
    get consoleLogUnpublishedDiffs () {
        return consoleLogUnpublishedDiffs;
    }
});
var _necessary = require("necessary");
var _diffs = require("../utilities/diffs");
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
var first = _necessary.arrayUtilities.first;
function consoleLogUnpublishedDiff(diff, diffs) {
    var previousDiffs = (0, _diffs.previousDiffsFromDiff)(diff, diffs), unpublishedDiff = diff; ///
    consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs);
}
function consoleLogUnpublishedDiffs(diff, diffs) {
    var nextDiffs = (0, _diffs.nextDiffsFromDiff)(diff, diffs), previousDiffs = (0, _diffs.previousDiffsFromDiff)(diff, diffs), unpublishedDiffs = [
        diff
    ].concat(_to_consumable_array(nextDiffs));
    unpublishedDiffs.forEach(function(unpublishedDiff) {
        return consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs);
    });
}
function consoleLogSubDirectoryPathsCycle(subDirectoryPaths) {
    var firstSubDirectoryPath = first(subDirectoryPaths);
    subDirectoryPaths = _to_consumable_array(subDirectoryPaths).concat([
        firstSubDirectoryPath
    ]);
    subDirectoryPaths.forEach(function(subDirectoryPath) {
        console.log(' "'.concat(subDirectoryPath, '"'));
    });
}
function consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs) {
    var name = unpublishedDiff.getName();
    previousDiffs.forEach(function(previousDiff) {
        var diff = previousDiff, subDirectoryPath = diff.getSubDirectoryPath(), devDependencyNames = diff.getDevDependencyNames(), devDependencyNamesIncludesName = devDependencyNames.includes(name);
        if (devDependencyNamesIncludesName) {
            console.log("The '".concat(subDirectoryPath, "/package.json' file has already been saved but its updated '").concat(name, "' developer dependency will now not be published."));
        }
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvY29uc29sZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IG5leHREaWZmc0Zyb21EaWZmLCBwcmV2aW91c0RpZmZzRnJvbURpZmYgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2RpZmZzXCI7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZihkaWZmLCBkaWZmcykge1xuICBjb25zdCBwcmV2aW91c0RpZmZzID0gcHJldmlvdXNEaWZmc0Zyb21EaWZmKGRpZmYsIGRpZmZzKSxcbiAgICAgICAgdW5wdWJsaXNoZWREaWZmID0gZGlmZjsgLy8vXG5cbiAgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZkV4KHVucHVibGlzaGVkRGlmZiwgcHJldmlvdXNEaWZmcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyhkaWZmLCBkaWZmcykge1xuICBjb25zdCBuZXh0RGlmZnMgPSBuZXh0RGlmZnNGcm9tRGlmZihkaWZmLCBkaWZmcyksXG4gICAgICAgIHByZXZpb3VzRGlmZnMgPSBwcmV2aW91c0RpZmZzRnJvbURpZmYoZGlmZiwgZGlmZnMpLFxuICAgICAgICB1bnB1Ymxpc2hlZERpZmZzID0gW1xuICAgICAgICAgIGRpZmYsXG4gICAgICAgICAgLi4ubmV4dERpZmZzXG4gICAgICAgIF1cblxuICB1bnB1Ymxpc2hlZERpZmZzLmZvckVhY2goKHVucHVibGlzaGVkRGlmZikgPT4gY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZkV4KHVucHVibGlzaGVkRGlmZiwgcHJldmlvdXNEaWZmcykpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29uc29sZUxvZ1N1YkRpcmVjdG9yeVBhdGhzQ3ljbGUoc3ViRGlyZWN0b3J5UGF0aHMpIHtcbiAgY29uc3QgZmlyc3RTdWJEaXJlY3RvcnlQYXRoID0gZmlyc3Qoc3ViRGlyZWN0b3J5UGF0aHMpO1xuXG4gIHN1YkRpcmVjdG9yeVBhdGhzID0gW1xuICAgIC4uLnN1YkRpcmVjdG9yeVBhdGhzLFxuICAgIGZpcnN0U3ViRGlyZWN0b3J5UGF0aFxuICBdO1xuXG4gIHN1YkRpcmVjdG9yeVBhdGhzLmZvckVhY2goKHN1YkRpcmVjdG9yeVBhdGgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgIFwiJHtzdWJEaXJlY3RvcnlQYXRofVwiYCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmRXgodW5wdWJsaXNoZWREaWZmLCBwcmV2aW91c0RpZmZzKSB7XG4gIGNvbnN0IG5hbWUgPSB1bnB1Ymxpc2hlZERpZmYuZ2V0TmFtZSgpO1xuXG4gIHByZXZpb3VzRGlmZnMuZm9yRWFjaCgocHJldmlvdXNEaWZmKSA9PiB7XG4gICAgY29uc3QgZGlmZiA9IHByZXZpb3VzRGlmZiwgIC8vL1xuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGggPSBkaWZmLmdldFN1YkRpcmVjdG9yeVBhdGgoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TmFtZXMgPSBkaWZmLmdldERldkRlcGVuZGVuY3lOYW1lcygpLFxuICAgICAgICAgIGRldkRlcGVuZGVuY3lOYW1lc0luY2x1ZGVzTmFtZSA9IGRldkRlcGVuZGVuY3lOYW1lcy5pbmNsdWRlcyhuYW1lKTtcblxuICAgIGlmIChkZXZEZXBlbmRlbmN5TmFtZXNJbmNsdWRlc05hbWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBUaGUgJyR7c3ViRGlyZWN0b3J5UGF0aH0vcGFja2FnZS5qc29uJyBmaWxlIGhhcyBhbHJlYWR5IGJlZW4gc2F2ZWQgYnV0IGl0cyB1cGRhdGVkICcke25hbWV9JyBkZXZlbG9wZXIgZGVwZW5kZW5jeSB3aWxsIG5vdyBub3QgYmUgcHVibGlzaGVkLmApO1xuICAgIH1cbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiY29uc29sZUxvZ1N1YkRpcmVjdG9yeVBhdGhzQ3ljbGUiLCJjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmIiwiY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZnMiLCJmaXJzdCIsImFycmF5VXRpbGl0aWVzIiwiZGlmZiIsImRpZmZzIiwicHJldmlvdXNEaWZmcyIsInByZXZpb3VzRGlmZnNGcm9tRGlmZiIsInVucHVibGlzaGVkRGlmZiIsImNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZFeCIsIm5leHREaWZmcyIsIm5leHREaWZmc0Zyb21EaWZmIiwidW5wdWJsaXNoZWREaWZmcyIsImZvckVhY2giLCJzdWJEaXJlY3RvcnlQYXRocyIsImZpcnN0U3ViRGlyZWN0b3J5UGF0aCIsInN1YkRpcmVjdG9yeVBhdGgiLCJjb25zb2xlIiwibG9nIiwibmFtZSIsImdldE5hbWUiLCJwcmV2aW91c0RpZmYiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwiZGV2RGVwZW5kZW5jeU5hbWVzIiwiZ2V0RGV2RGVwZW5kZW5jeU5hbWVzIiwiZGV2RGVwZW5kZW5jeU5hbWVzSW5jbHVkZXNOYW1lIiwiaW5jbHVkZXMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQTBCZ0JBO2VBQUFBOztRQWxCQUM7ZUFBQUE7O1FBT0FDO2VBQUFBOzs7eUJBYmU7cUJBRTBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUV6RCxJQUFNLEFBQUVDLFFBQVVDLHlCQUFjLENBQXhCRDtBQUVELFNBQVNGLDBCQUEwQkksSUFBSSxFQUFFQyxLQUFLO0lBQ25ELElBQU1DLGdCQUFnQkMsSUFBQUEsNEJBQXFCLEVBQUNILE1BQU1DLFFBQzVDRyxrQkFBa0JKLE1BQU0sR0FBRztJQUVqQ0ssNEJBQTRCRCxpQkFBaUJGO0FBQy9DO0FBRU8sU0FBU0wsMkJBQTJCRyxJQUFJLEVBQUVDLEtBQUs7SUFDcEQsSUFBTUssWUFBWUMsSUFBQUEsd0JBQWlCLEVBQUNQLE1BQU1DLFFBQ3BDQyxnQkFBZ0JDLElBQUFBLDRCQUFxQixFQUFDSCxNQUFNQyxRQUM1Q08sbUJBQW1CO1FBQ2pCUjtLQUVELENBSGtCLE9BRWpCLHFCQUFHTTtJQUdYRSxpQkFBaUJDLE9BQU8sQ0FBQyxTQUFDTDtlQUFvQkMsNEJBQTRCRCxpQkFBaUJGOztBQUM3RjtBQUVPLFNBQVNQLGlDQUFpQ2UsaUJBQWlCO0lBQ2hFLElBQU1DLHdCQUF3QmIsTUFBTVk7SUFFcENBLG9CQUFvQixBQUNsQixxQkFBR0EsMEJBRGU7UUFFbEJDO0tBQ0Q7SUFFREQsa0JBQWtCRCxPQUFPLENBQUMsU0FBQ0c7UUFDekJDLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLEtBQXFCLE9BQWpCRixrQkFBaUI7SUFDcEM7QUFDRjtBQUVBLFNBQVNQLDRCQUE0QkQsZUFBZSxFQUFFRixhQUFhO0lBQ2pFLElBQU1hLE9BQU9YLGdCQUFnQlksT0FBTztJQUVwQ2QsY0FBY08sT0FBTyxDQUFDLFNBQUNRO1FBQ3JCLElBQU1qQixPQUFPaUIsY0FDUEwsbUJBQW1CWixLQUFLa0IsbUJBQW1CLElBQzNDQyxxQkFBcUJuQixLQUFLb0IscUJBQXFCLElBQy9DQyxpQ0FBaUNGLG1CQUFtQkcsUUFBUSxDQUFDUDtRQUVuRSxJQUFJTSxnQ0FBZ0M7WUFDbENSLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLFFBQXNGQyxPQUEvRUgsa0JBQWlCLGdFQUFtRSxPQUFMRyxNQUFLO1FBQzFHO0lBQ0Y7QUFDRiJ9