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
        consoleLogUnpublishedDiffEx(unpublishedDiff, previousDiffs);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvY29uc29sZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgYXJyYXlVdGlsaXRpZXMgfSBmcm9tIFwibmVjZXNzYXJ5XCI7XG5cbmltcG9ydCB7IG5leHREaWZmc0Zyb21EaWZmLCBwcmV2aW91c0RpZmZzRnJvbURpZmYgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2RpZmZzXCI7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZihkaWZmLCBkaWZmcykge1xuICBjb25zdCBwcmV2aW91c0RpZmZzID0gcHJldmlvdXNEaWZmc0Zyb21EaWZmKGRpZmYsIGRpZmZzKSxcbiAgICAgICAgdW5wdWJsaXNoZWREaWZmID0gZGlmZjsgLy8vXG5cbiAgY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZkV4KHVucHVibGlzaGVkRGlmZiwgcHJldmlvdXNEaWZmcyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmcyhkaWZmLCBkaWZmcykge1xuICBjb25zdCBuZXh0RGlmZnMgPSBuZXh0RGlmZnNGcm9tRGlmZihkaWZmLCBkaWZmcyksXG4gICAgICAgIHByZXZpb3VzRGlmZnMgPSBwcmV2aW91c0RpZmZzRnJvbURpZmYoZGlmZiwgZGlmZnMpLFxuICAgICAgICB1bnB1Ymxpc2hlZERpZmZzID0gW1xuICAgICAgICAgIGRpZmYsXG4gICAgICAgICAgLi4ubmV4dERpZmZzXG4gICAgICAgIF1cblxuICB1bnB1Ymxpc2hlZERpZmZzLmZvckVhY2goKHVucHVibGlzaGVkRGlmZikgPT4ge1xuICAgIGNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZFeCh1bnB1Ymxpc2hlZERpZmYsIHByZXZpb3VzRGlmZnMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbnNvbGVMb2dTdWJEaXJlY3RvcnlQYXRoc0N5Y2xlKHN1YkRpcmVjdG9yeVBhdGhzKSB7XG4gIGNvbnN0IGZpcnN0U3ViRGlyZWN0b3J5UGF0aCA9IGZpcnN0KHN1YkRpcmVjdG9yeVBhdGhzKTtcblxuICBzdWJEaXJlY3RvcnlQYXRocyA9IFtcbiAgICAuLi5zdWJEaXJlY3RvcnlQYXRocyxcbiAgICBmaXJzdFN1YkRpcmVjdG9yeVBhdGhcbiAgXTtcblxuICBzdWJEaXJlY3RvcnlQYXRocy5mb3JFYWNoKChzdWJEaXJlY3RvcnlQYXRoKSA9PiB7XG4gICAgY29uc29sZS5sb2coYCBcIiR7c3ViRGlyZWN0b3J5UGF0aH1cImApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZkV4KHVucHVibGlzaGVkRGlmZiwgcHJldmlvdXNEaWZmcykge1xuICBjb25zdCBuYW1lID0gdW5wdWJsaXNoZWREaWZmLmdldE5hbWUoKTtcblxuICBwcmV2aW91c0RpZmZzLmZvckVhY2goKHByZXZpb3VzRGlmZikgPT4ge1xuICAgIGNvbnN0IGRpZmYgPSBwcmV2aW91c0RpZmYsICAvLy9cbiAgICAgICAgICBzdWJEaXJlY3RvcnlQYXRoID0gZGlmZi5nZXRTdWJEaXJlY3RvcnlQYXRoKCksXG4gICAgICAgICAgZGV2RGVwZW5kZW5jeU5hbWVzID0gZGlmZi5nZXREZXZEZXBlbmRlbmN5TmFtZXMoKSxcbiAgICAgICAgICBkZXZEZXBlbmRlbmN5TmFtZXNJbmNsdWRlc05hbWUgPSBkZXZEZXBlbmRlbmN5TmFtZXMuaW5jbHVkZXMobmFtZSk7XG5cbiAgICBpZiAoZGV2RGVwZW5kZW5jeU5hbWVzSW5jbHVkZXNOYW1lKSB7XG4gICAgICBjb25zb2xlLmxvZyhgVGhlICcke3N1YkRpcmVjdG9yeVBhdGh9L3BhY2thZ2UuanNvbicgZmlsZSBoYXMgYWxyZWFkeSBiZWVuIHNhdmVkIGJ1dCBpdHMgdXBkYXRlZCAnJHtuYW1lfScgZGV2ZWxvcGVyIGRlcGVuZGVuY3kgd2lsbCBub3cgbm90IGJlIHB1Ymxpc2hlZC5gKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImNvbnNvbGVMb2dTdWJEaXJlY3RvcnlQYXRoc0N5Y2xlIiwiY29uc29sZUxvZ1VucHVibGlzaGVkRGlmZiIsImNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmZzIiwiZmlyc3QiLCJhcnJheVV0aWxpdGllcyIsImRpZmYiLCJkaWZmcyIsInByZXZpb3VzRGlmZnMiLCJwcmV2aW91c0RpZmZzRnJvbURpZmYiLCJ1bnB1Ymxpc2hlZERpZmYiLCJjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmRXgiLCJuZXh0RGlmZnMiLCJuZXh0RGlmZnNGcm9tRGlmZiIsInVucHVibGlzaGVkRGlmZnMiLCJmb3JFYWNoIiwic3ViRGlyZWN0b3J5UGF0aHMiLCJmaXJzdFN1YkRpcmVjdG9yeVBhdGgiLCJzdWJEaXJlY3RvcnlQYXRoIiwiY29uc29sZSIsImxvZyIsIm5hbWUiLCJnZXROYW1lIiwicHJldmlvdXNEaWZmIiwiZ2V0U3ViRGlyZWN0b3J5UGF0aCIsImRldkRlcGVuZGVuY3lOYW1lcyIsImdldERldkRlcGVuZGVuY3lOYW1lcyIsImRldkRlcGVuZGVuY3lOYW1lc0luY2x1ZGVzTmFtZSIsImluY2x1ZGVzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7UUE0QmdCQTtlQUFBQTs7UUFwQkFDO2VBQUFBOztRQU9BQztlQUFBQTs7O3lCQWJlO3FCQUUwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFekQsSUFBTSxBQUFFQyxRQUFVQyx5QkFBYyxDQUF4QkQ7QUFFRCxTQUFTRiwwQkFBMEJJLElBQUksRUFBRUMsS0FBSztJQUNuRCxJQUFNQyxnQkFBZ0JDLElBQUFBLDRCQUFxQixFQUFDSCxNQUFNQyxRQUM1Q0csa0JBQWtCSixNQUFNLEdBQUc7SUFFakNLLDRCQUE0QkQsaUJBQWlCRjtBQUMvQztBQUVPLFNBQVNMLDJCQUEyQkcsSUFBSSxFQUFFQyxLQUFLO0lBQ3BELElBQU1LLFlBQVlDLElBQUFBLHdCQUFpQixFQUFDUCxNQUFNQyxRQUNwQ0MsZ0JBQWdCQyxJQUFBQSw0QkFBcUIsRUFBQ0gsTUFBTUMsUUFDNUNPLG1CQUFtQjtRQUNqQlI7S0FFRCxDQUhrQixPQUVqQixxQkFBR007SUFHWEUsaUJBQWlCQyxPQUFPLENBQUMsU0FBQ0w7UUFDeEJDLDRCQUE0QkQsaUJBQWlCRjtJQUMvQztBQUNGO0FBRU8sU0FBU1AsaUNBQWlDZSxpQkFBaUI7SUFDaEUsSUFBTUMsd0JBQXdCYixNQUFNWTtJQUVwQ0Esb0JBQW9CLEFBQ2xCLHFCQUFHQSwwQkFEZTtRQUVsQkM7S0FDRDtJQUVERCxrQkFBa0JELE9BQU8sQ0FBQyxTQUFDRztRQUN6QkMsUUFBUUMsR0FBRyxDQUFDLEFBQUMsS0FBcUIsT0FBakJGLGtCQUFpQjtJQUNwQztBQUNGO0FBRUEsU0FBU1AsNEJBQTRCRCxlQUFlLEVBQUVGLGFBQWE7SUFDakUsSUFBTWEsT0FBT1gsZ0JBQWdCWSxPQUFPO0lBRXBDZCxjQUFjTyxPQUFPLENBQUMsU0FBQ1E7UUFDckIsSUFBTWpCLE9BQU9pQixjQUNQTCxtQkFBbUJaLEtBQUtrQixtQkFBbUIsSUFDM0NDLHFCQUFxQm5CLEtBQUtvQixxQkFBcUIsSUFDL0NDLGlDQUFpQ0YsbUJBQW1CRyxRQUFRLENBQUNQO1FBRW5FLElBQUlNLGdDQUFnQztZQUNsQ1IsUUFBUUMsR0FBRyxDQUFDLEFBQUMsUUFBc0ZDLE9BQS9FSCxrQkFBaUIsZ0VBQW1FLE9BQUxHLE1BQUs7UUFDMUc7SUFDRjtBQUNGIn0=