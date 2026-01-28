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
    }
});
var _necessary = require("necessary");
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
    var previousDiffs = previousDiffsFromDiff(diff, diffs), unpublishedDiff = diff, name = unpublishedDiff.getName();
    previousDiffs.forEach(function(previousDiff) {
        var _$diff = previousDiff, subDirectoryPath = _$diff.getSubDirectoryPath(), devDependencyNames = _$diff.getDevDependencyNames(), devDependencyNamesIncludesName = devDependencyNames.includes(name);
        if (devDependencyNamesIncludesName) {
            console.log("The '".concat(subDirectoryPath, "/package.json' file has already been saved but its updated '").concat(name, "' developer dependency will now not be published."));
        }
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
function previousDiffsFromDiff(diff, diffs) {
    var index = diffs.indexOf(diff), endIndex = index, beginIndex = 0, previousDiffs = diffs.slice(beginIndex, endIndex);
    return previousDiffs;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvY29uc29sZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZihkaWZmLCBkaWZmcykge1xuICBjb25zdCBwcmV2aW91c0RpZmZzID0gcHJldmlvdXNEaWZmc0Zyb21EaWZmKGRpZmYsIGRpZmZzKSxcbiAgICAgICAgdW5wdWJsaXNoZWREaWZmID0gZGlmZiwgLy8vXG4gICAgICAgIG5hbWUgPSB1bnB1Ymxpc2hlZERpZmYuZ2V0TmFtZSgpO1xuXG4gIHByZXZpb3VzRGlmZnMuZm9yRWFjaCgocHJldmlvdXNEaWZmKSA9PiB7XG4gICAgY29uc3QgZGlmZiA9IHByZXZpb3VzRGlmZiwgIC8vL1xuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGggPSBkaWZmLmdldFN1YkRpcmVjdG9yeVBhdGgoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TmFtZXMgPSBkaWZmLmdldERldkRlcGVuZGVuY3lOYW1lcygpLFxuICAgICAgICAgIGRldkRlcGVuZGVuY3lOYW1lc0luY2x1ZGVzTmFtZSA9IGRldkRlcGVuZGVuY3lOYW1lcy5pbmNsdWRlcyhuYW1lKTtcblxuICAgIGlmIChkZXZEZXBlbmRlbmN5TmFtZXNJbmNsdWRlc05hbWUpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBUaGUgJyR7c3ViRGlyZWN0b3J5UGF0aH0vcGFja2FnZS5qc29uJyBmaWxlIGhhcyBhbHJlYWR5IGJlZW4gc2F2ZWQgYnV0IGl0cyB1cGRhdGVkICcke25hbWV9JyBkZXZlbG9wZXIgZGVwZW5kZW5jeSB3aWxsIG5vdyBub3QgYmUgcHVibGlzaGVkLmApO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlTG9nU3ViRGlyZWN0b3J5UGF0aHNDeWNsZShzdWJEaXJlY3RvcnlQYXRocykge1xuICBjb25zdCBmaXJzdFN1YkRpcmVjdG9yeVBhdGggPSBmaXJzdChzdWJEaXJlY3RvcnlQYXRocyk7XG5cbiAgc3ViRGlyZWN0b3J5UGF0aHMgPSBbXG4gICAgLi4uc3ViRGlyZWN0b3J5UGF0aHMsXG4gICAgZmlyc3RTdWJEaXJlY3RvcnlQYXRoXG4gIF07XG5cbiAgc3ViRGlyZWN0b3J5UGF0aHMuZm9yRWFjaCgoc3ViRGlyZWN0b3J5UGF0aCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGAgXCIke3N1YkRpcmVjdG9yeVBhdGh9XCJgKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHByZXZpb3VzRGlmZnNGcm9tRGlmZihkaWZmLCBkaWZmcykge1xuICBjb25zdCBpbmRleCA9IGRpZmZzLmluZGV4T2YoZGlmZiksXG4gICAgICAgIGVuZEluZGV4ID0gaW5kZXgsIC8vL1xuICAgICAgICBiZWdpbkluZGV4ID0gMCxcbiAgICAgICAgcHJldmlvdXNEaWZmcyA9IGRpZmZzLnNsaWNlKGJlZ2luSW5kZXgsIGVuZEluZGV4KTtcblxuICByZXR1cm4gcHJldmlvdXNEaWZmcztcbn1cbiJdLCJuYW1lcyI6WyJjb25zb2xlTG9nU3ViRGlyZWN0b3J5UGF0aHNDeWNsZSIsImNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmYiLCJmaXJzdCIsImFycmF5VXRpbGl0aWVzIiwiZGlmZiIsImRpZmZzIiwicHJldmlvdXNEaWZmcyIsInByZXZpb3VzRGlmZnNGcm9tRGlmZiIsInVucHVibGlzaGVkRGlmZiIsIm5hbWUiLCJnZXROYW1lIiwiZm9yRWFjaCIsInByZXZpb3VzRGlmZiIsInN1YkRpcmVjdG9yeVBhdGgiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwiZGV2RGVwZW5kZW5jeU5hbWVzIiwiZ2V0RGV2RGVwZW5kZW5jeU5hbWVzIiwiZGV2RGVwZW5kZW5jeU5hbWVzSW5jbHVkZXNOYW1lIiwiaW5jbHVkZXMiLCJjb25zb2xlIiwibG9nIiwic3ViRGlyZWN0b3J5UGF0aHMiLCJmaXJzdFN1YkRpcmVjdG9yeVBhdGgiLCJpbmRleCIsImluZGV4T2YiLCJlbmRJbmRleCIsImJlZ2luSW5kZXgiLCJzbGljZSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O1FBdUJnQkE7ZUFBQUE7O1FBakJBQztlQUFBQTs7O3lCQUplOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUUvQixJQUFNLEFBQUVDLFFBQVVDLHlCQUFjLENBQXhCRDtBQUVELFNBQVNELDBCQUEwQkcsSUFBSSxFQUFFQyxLQUFLO0lBQ25ELElBQU1DLGdCQUFnQkMsc0JBQXNCSCxNQUFNQyxRQUM1Q0csa0JBQWtCSixNQUNsQkssT0FBT0QsZ0JBQWdCRSxPQUFPO0lBRXBDSixjQUFjSyxPQUFPLENBQUMsU0FBQ0M7UUFDckIsSUFBTVIsU0FBT1EsY0FDUEMsbUJBQW1CVCxPQUFLVSxtQkFBbUIsSUFDM0NDLHFCQUFxQlgsT0FBS1kscUJBQXFCLElBQy9DQyxpQ0FBaUNGLG1CQUFtQkcsUUFBUSxDQUFDVDtRQUVuRSxJQUFJUSxnQ0FBZ0M7WUFDbENFLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLFFBQXNGWCxPQUEvRUksa0JBQWlCLGdFQUFtRSxPQUFMSixNQUFLO1FBQzFHO0lBQ0Y7QUFDRjtBQUVPLFNBQVNULGlDQUFpQ3FCLGlCQUFpQjtJQUNoRSxJQUFNQyx3QkFBd0JwQixNQUFNbUI7SUFFcENBLG9CQUFvQixBQUNsQixxQkFBR0EsMEJBRGU7UUFFbEJDO0tBQ0Q7SUFFREQsa0JBQWtCVixPQUFPLENBQUMsU0FBQ0U7UUFDekJNLFFBQVFDLEdBQUcsQ0FBQyxBQUFDLEtBQXFCLE9BQWpCUCxrQkFBaUI7SUFDcEM7QUFDRjtBQUVBLFNBQVNOLHNCQUFzQkgsSUFBSSxFQUFFQyxLQUFLO0lBQ3hDLElBQU1rQixRQUFRbEIsTUFBTW1CLE9BQU8sQ0FBQ3BCLE9BQ3RCcUIsV0FBV0YsT0FDWEcsYUFBYSxHQUNicEIsZ0JBQWdCRCxNQUFNc0IsS0FBSyxDQUFDRCxZQUFZRDtJQUU5QyxPQUFPbkI7QUFDVCJ9