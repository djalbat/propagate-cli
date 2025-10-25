"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return createDiffsOperation;
    }
});
var _diff = /*#__PURE__*/ _interop_require_default(require("../diff"));
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
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
function createDiffsOperation(proceed, abort, context) {
    var releases = context.releases;
    var release = context.release, releaseGraph = context.releaseGraph, dependentReleasesLength = context.dependentReleasesLength, start = 1, deleteCount = dependentReleasesLength, dependentReleases = releases.splice(start, deleteCount), devDependentReleases = releases.splice(start), orderedDependencySubDirectoryPaths = releaseGraph.getOrderedDependencySubDirectoryPaths(), orderedDevDependencySubDirectoryPaths = releaseGraph.getOrderedDevDependencySubDirectoryPaths();
    sortReleases(dependentReleases, orderedDependencySubDirectoryPaths);
    sortReleases(devDependentReleases, orderedDevDependencySubDirectoryPaths);
    releases = [
        release
    ].concat(_to_consumable_array(dependentReleases), _to_consumable_array(devDependentReleases));
    var diffs = [];
    releases.every(function(release) {
        var diff = _diff.default.fromRelease(release);
        if (diff === null) {
            abort();
            return;
        }
        diffs.push(diff);
        return true;
    });
    Object.assign(context, {
        diffs: diffs
    });
    proceed();
}
function sortReleases(releases, orderedSubDirectoryPaths) {
    releases.sort(function(releaseA, releaseB) {
        var releaseASubDirectoryPath = releaseA.getSubDirectoryPath(), releaseBSubDirectoryPath = releaseB.getSubDirectoryPath(), releaseASubDirectoryPathIndex = orderedSubDirectoryPaths.indexOf(releaseASubDirectoryPath), releaseBSubDirectoryPathIndex = orderedSubDirectoryPaths.indexOf(releaseBSubDirectoryPath);
        if (false) {
        ///
        } else if (releaseASubDirectoryPathIndex > releaseBSubDirectoryPathIndex) {
            return +1;
        } else if (releaseASubDirectoryPathIndex < releaseBSubDirectoryPathIndex) {
            return -1;
        }
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vY3JlYXRlRGlmZnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBEaWZmIGZyb20gXCIuLi9kaWZmXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZURpZmZzT3BlcmF0aW9uKHByb2NlZWQsIGFib3J0LCBjb250ZXh0KSB7XG4gIGxldCB7IHJlbGVhc2VzIH0gPSBjb250ZXh0O1xuXG4gIGNvbnN0IHsgcmVsZWFzZSwgcmVsZWFzZUdyYXBoLCBkZXBlbmRlbnRSZWxlYXNlc0xlbmd0aCB9ID0gY29udGV4dCxcbiAgICAgICAgc3RhcnQgPSAxLFxuICAgICAgICBkZWxldGVDb3VudCA9IGRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoLCAgLy8vXG4gICAgICAgIGRlcGVuZGVudFJlbGVhc2VzID0gcmVsZWFzZXMuc3BsaWNlKHN0YXJ0LCBkZWxldGVDb3VudCksXG4gICAgICAgIGRldkRlcGVuZGVudFJlbGVhc2VzID0gcmVsZWFzZXMuc3BsaWNlKHN0YXJ0KSxcbiAgICAgICAgb3JkZXJlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyA9IHJlbGVhc2VHcmFwaC5nZXRPcmRlcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzKCksXG4gICAgICAgIG9yZGVyZWREZXZEZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aHMgPSByZWxlYXNlR3JhcGguZ2V0T3JkZXJlZERldkRlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocygpO1xuXG4gIHNvcnRSZWxlYXNlcyhkZXBlbmRlbnRSZWxlYXNlcywgb3JkZXJlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyk7XG5cbiAgc29ydFJlbGVhc2VzKGRldkRlcGVuZGVudFJlbGVhc2VzLCBvcmRlcmVkRGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzKTtcblxuICByZWxlYXNlcyA9IFtcbiAgICByZWxlYXNlLFxuICAgIC4uLmRlcGVuZGVudFJlbGVhc2VzLFxuICAgIC4uLmRldkRlcGVuZGVudFJlbGVhc2VzXG4gIF07XG5cbiAgY29uc3QgZGlmZnMgPSBbXTtcblxuICByZWxlYXNlcy5ldmVyeSgocmVsZWFzZSkgPT4ge1xuICAgIGNvbnN0IGRpZmYgPSBEaWZmLmZyb21SZWxlYXNlKHJlbGVhc2UpO1xuXG4gICAgaWYgKGRpZmYgPT09IG51bGwpIHtcbiAgICAgIGFib3J0KCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkaWZmcy5wdXNoKGRpZmYpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIE9iamVjdC5hc3NpZ24oY29udGV4dCwge1xuICAgIGRpZmZzXG4gIH0pO1xuXG4gIHByb2NlZWQoKTtcbn1cblxuZnVuY3Rpb24gc29ydFJlbGVhc2VzKHJlbGVhc2VzLCBvcmRlcmVkU3ViRGlyZWN0b3J5UGF0aHMpIHtcbiAgcmVsZWFzZXMuc29ydCgocmVsZWFzZUEsIHJlbGVhc2VCKSA9PiB7XG4gICAgY29uc3QgcmVsZWFzZUFTdWJEaXJlY3RvcnlQYXRoID0gcmVsZWFzZUEuZ2V0U3ViRGlyZWN0b3J5UGF0aCgpLFxuICAgICAgICAgIHJlbGVhc2VCU3ViRGlyZWN0b3J5UGF0aCA9IHJlbGVhc2VCLmdldFN1YkRpcmVjdG9yeVBhdGgoKSxcbiAgICAgICAgICByZWxlYXNlQVN1YkRpcmVjdG9yeVBhdGhJbmRleCA9IG9yZGVyZWRTdWJEaXJlY3RvcnlQYXRocy5pbmRleE9mKHJlbGVhc2VBU3ViRGlyZWN0b3J5UGF0aCksXG4gICAgICAgICAgcmVsZWFzZUJTdWJEaXJlY3RvcnlQYXRoSW5kZXggPSBvcmRlcmVkU3ViRGlyZWN0b3J5UGF0aHMuaW5kZXhPZihyZWxlYXNlQlN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgaWYgKGZhbHNlKSB7XG4gICAgICAvLy9cbiAgICB9IGVsc2UgaWYgKHJlbGVhc2VBU3ViRGlyZWN0b3J5UGF0aEluZGV4ID4gcmVsZWFzZUJTdWJEaXJlY3RvcnlQYXRoSW5kZXgpIHtcbiAgICAgIHJldHVybiArMTtcbiAgICB9IGVsc2UgaWYgKHJlbGVhc2VBU3ViRGlyZWN0b3J5UGF0aEluZGV4IDwgcmVsZWFzZUJTdWJEaXJlY3RvcnlQYXRoSW5kZXgpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIH0pO1xufVxuIl0sIm5hbWVzIjpbImNyZWF0ZURpZmZzT3BlcmF0aW9uIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInJlbGVhc2VzIiwicmVsZWFzZSIsInJlbGVhc2VHcmFwaCIsImRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoIiwic3RhcnQiLCJkZWxldGVDb3VudCIsImRlcGVuZGVudFJlbGVhc2VzIiwic3BsaWNlIiwiZGV2RGVwZW5kZW50UmVsZWFzZXMiLCJvcmRlcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzIiwiZ2V0T3JkZXJlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyIsIm9yZGVyZWREZXZEZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aHMiLCJnZXRPcmRlcmVkRGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzIiwic29ydFJlbGVhc2VzIiwiZGlmZnMiLCJldmVyeSIsImRpZmYiLCJEaWZmIiwiZnJvbVJlbGVhc2UiLCJwdXNoIiwiT2JqZWN0IiwiYXNzaWduIiwib3JkZXJlZFN1YkRpcmVjdG9yeVBhdGhzIiwic29ydCIsInJlbGVhc2VBIiwicmVsZWFzZUIiLCJyZWxlYXNlQVN1YkRpcmVjdG9yeVBhdGgiLCJnZXRTdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZUJTdWJEaXJlY3RvcnlQYXRoIiwicmVsZWFzZUFTdWJEaXJlY3RvcnlQYXRoSW5kZXgiLCJpbmRleE9mIiwicmVsZWFzZUJTdWJEaXJlY3RvcnlQYXRoSW5kZXgiXSwibWFwcGluZ3MiOiJBQUFBOzs7OytCQUlBOzs7ZUFBd0JBOzs7MkRBRlA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRixTQUFTQSxxQkFBcUJDLE9BQU8sRUFBRUMsS0FBSyxFQUFFQyxPQUFPO0lBQ2xFLElBQUksQUFBRUMsV0FBYUQsUUFBYkM7SUFFTixJQUFRQyxVQUFtREYsUUFBbkRFLFNBQVNDLGVBQTBDSCxRQUExQ0csY0FBY0MsMEJBQTRCSixRQUE1QkkseUJBQ3pCQyxRQUFRLEdBQ1JDLGNBQWNGLHlCQUNkRyxvQkFBb0JOLFNBQVNPLE1BQU0sQ0FBQ0gsT0FBT0MsY0FDM0NHLHVCQUF1QlIsU0FBU08sTUFBTSxDQUFDSCxRQUN2Q0sscUNBQXFDUCxhQUFhUSxxQ0FBcUMsSUFDdkZDLHdDQUF3Q1QsYUFBYVUsd0NBQXdDO0lBRW5HQyxhQUFhUCxtQkFBbUJHO0lBRWhDSSxhQUFhTCxzQkFBc0JHO0lBRW5DWCxXQUFXO1FBQ1RDO0tBR0QsQ0FKVSxPQUVULHFCQUFHSyxvQkFDSCxxQkFBR0U7SUFHTCxJQUFNTSxRQUFRLEVBQUU7SUFFaEJkLFNBQVNlLEtBQUssQ0FBQyxTQUFDZDtRQUNkLElBQU1lLE9BQU9DLGFBQUksQ0FBQ0MsV0FBVyxDQUFDakI7UUFFOUIsSUFBSWUsU0FBUyxNQUFNO1lBQ2pCbEI7WUFFQTtRQUNGO1FBRUFnQixNQUFNSyxJQUFJLENBQUNIO1FBRVgsT0FBTztJQUNUO0lBRUFJLE9BQU9DLE1BQU0sQ0FBQ3RCLFNBQVM7UUFDckJlLE9BQUFBO0lBQ0Y7SUFFQWpCO0FBQ0Y7QUFFQSxTQUFTZ0IsYUFBYWIsUUFBUSxFQUFFc0Isd0JBQXdCO0lBQ3REdEIsU0FBU3VCLElBQUksQ0FBQyxTQUFDQyxVQUFVQztRQUN2QixJQUFNQywyQkFBMkJGLFNBQVNHLG1CQUFtQixJQUN2REMsMkJBQTJCSCxTQUFTRSxtQkFBbUIsSUFDdkRFLGdDQUFnQ1AseUJBQXlCUSxPQUFPLENBQUNKLDJCQUNqRUssZ0NBQWdDVCx5QkFBeUJRLE9BQU8sQ0FBQ0Y7UUFFdkUsSUFBSSxPQUFPO1FBQ1QsR0FBRztRQUNMLE9BQU8sSUFBSUMsZ0NBQWdDRSwrQkFBK0I7WUFDeEUsT0FBTyxDQUFDO1FBQ1YsT0FBTyxJQUFJRixnQ0FBZ0NFLCtCQUErQjtZQUN4RSxPQUFPLENBQUM7UUFDVjtJQUNGO0FBQ0YifQ==