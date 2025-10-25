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
    get removeDependencies () {
        return removeDependencies;
    },
    get removeDevDependencies () {
        return removeDevDependencies;
    }
});
var _console = require("../utilities/console");
function removeDependencies(diff, diffs, releaseMap, releaseGraph) {
    var release = diff.getRelease(), dependentReleases = releaseGraph.retrieveDependentReleases(release, releaseMap), dependentReleasesLength = dependentReleases.length;
    (0, _console.consoleLogUnpublishedDiff)(diff, diffs);
    if (dependentReleasesLength > 0) {
        var name = release.getName();
        dependentReleases.forEach(function(dependentRelease) {
            var release = dependentRelease, _$diff = findDiff(release, diffs);
            if (_$diff !== null) {
                _$diff.removeDependency(name);
                var dependencyMapEmpty = _$diff.isDependencyMapDiffEmpty();
                if (dependencyMapEmpty) {
                    removeDevDependencies(_$diff, diffs, releaseMap, releaseGraph);
                    removeDependencies(_$diff, diffs, releaseMap, releaseGraph);
                }
            }
        });
    }
}
function removeDevDependencies(diff, diffs, releaseMap, releaseGraph) {
    var release = diff.getRelease(), devDependentReleases = releaseGraph.retrieveDevDependentReleases(release, releaseMap), devDependentReleasesLength = devDependentReleases.length;
    if (devDependentReleasesLength > 0) {
        var name = release.getName();
        devDependentReleases.forEach(function(devDependentRelease) {
            var release = devDependentRelease, _$diff = findDiff(release, diffs);
            if (_$diff !== null) {
                _$diff.removeDevDependency(name);
            }
        });
    }
}
function findDiff(release, diffs) {
    var diff = diffs.find(function(diff) {
        var diffRelease = diff.getRelease();
        if (diffRelease === release) {
            return true;
        }
    }) || null; ///
    return diff;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvcHJvcGFnYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5pbXBvcnQgeyBjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmIH0gZnJvbSBcIi4uL3V0aWxpdGllcy9jb25zb2xlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVEZXBlbmRlbmNpZXMoZGlmZiwgZGlmZnMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCkge1xuICBjb25zdCByZWxlYXNlID0gZGlmZi5nZXRSZWxlYXNlKCksXG4gICAgICAgIGRlcGVuZGVudFJlbGVhc2VzID0gcmVsZWFzZUdyYXBoLnJldHJpZXZlRGVwZW5kZW50UmVsZWFzZXMocmVsZWFzZSwgcmVsZWFzZU1hcCksXG4gICAgICAgIGRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID0gZGVwZW5kZW50UmVsZWFzZXMubGVuZ3RoO1xuXG4gIGNvbnNvbGVMb2dVbnB1Ymxpc2hlZERpZmYoZGlmZiwgZGlmZnMpO1xuXG4gIGlmIChkZXBlbmRlbnRSZWxlYXNlc0xlbmd0aCA+IDApIHtcbiAgICBjb25zdCBuYW1lID0gcmVsZWFzZS5nZXROYW1lKCk7XG5cbiAgICBkZXBlbmRlbnRSZWxlYXNlcy5mb3JFYWNoKChkZXBlbmRlbnRSZWxlYXNlKSA9PiB7XG4gICAgICBjb25zdCByZWxlYXNlID0gZGVwZW5kZW50UmVsZWFzZSwgLy8vXG4gICAgICAgICAgICBkaWZmID0gZmluZERpZmYocmVsZWFzZSwgZGlmZnMpO1xuXG4gICAgICBpZiAoZGlmZiAhPT0gbnVsbCkge1xuICAgICAgICBkaWZmLnJlbW92ZURlcGVuZGVuY3kobmFtZSk7XG5cbiAgICAgICAgY29uc3QgZGVwZW5kZW5jeU1hcEVtcHR5ID0gZGlmZi5pc0RlcGVuZGVuY3lNYXBEaWZmRW1wdHkoKTtcblxuICAgICAgICBpZiAoZGVwZW5kZW5jeU1hcEVtcHR5KSB7XG4gICAgICAgICAgcmVtb3ZlRGV2RGVwZW5kZW5jaWVzKGRpZmYsIGRpZmZzLCByZWxlYXNlTWFwLCByZWxlYXNlR3JhcGgpO1xuXG4gICAgICAgICAgcmVtb3ZlRGVwZW5kZW5jaWVzKGRpZmYsIGRpZmZzLCByZWxlYXNlTWFwLCByZWxlYXNlR3JhcGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZURldkRlcGVuZGVuY2llcyhkaWZmLCBkaWZmcywgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoKSB7XG4gIGNvbnN0IHJlbGVhc2UgPSBkaWZmLmdldFJlbGVhc2UoKSxcbiAgICAgICAgZGV2RGVwZW5kZW50UmVsZWFzZXMgPSByZWxlYXNlR3JhcGgucmV0cmlldmVEZXZEZXBlbmRlbnRSZWxlYXNlcyhyZWxlYXNlLCByZWxlYXNlTWFwKSxcbiAgICAgICAgZGV2RGVwZW5kZW50UmVsZWFzZXNMZW5ndGggPSBkZXZEZXBlbmRlbnRSZWxlYXNlcy5sZW5ndGg7XG5cbiAgaWYgKGRldkRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG5hbWUgPSByZWxlYXNlLmdldE5hbWUoKTtcblxuICAgIGRldkRlcGVuZGVudFJlbGVhc2VzLmZvckVhY2goKGRldkRlcGVuZGVudFJlbGVhc2UpID0+IHtcbiAgICAgIGNvbnN0IHJlbGVhc2UgPSBkZXZEZXBlbmRlbnRSZWxlYXNlLCAvLy9cbiAgICAgICAgICAgIGRpZmYgPSBmaW5kRGlmZihyZWxlYXNlLCBkaWZmcyk7XG5cbiAgICAgIGlmIChkaWZmICE9PSBudWxsKSB7XG4gICAgICAgIGRpZmYucmVtb3ZlRGV2RGVwZW5kZW5jeShuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kRGlmZihyZWxlYXNlLCBkaWZmcykge1xuICBjb25zdCBkaWZmID0gZGlmZnMuZmluZCgoZGlmZikgPT4ge1xuICAgIGNvbnN0IGRpZmZSZWxlYXNlID0gZGlmZi5nZXRSZWxlYXNlKCk7XG5cbiAgICBpZiAoZGlmZlJlbGVhc2UgPT09IHJlbGVhc2UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSkgfHwgbnVsbDsgLy8vXG5cbiAgcmV0dXJuIGRpZmY7XG59XG4iXSwibmFtZXMiOlsicmVtb3ZlRGVwZW5kZW5jaWVzIiwicmVtb3ZlRGV2RGVwZW5kZW5jaWVzIiwiZGlmZiIsImRpZmZzIiwicmVsZWFzZU1hcCIsInJlbGVhc2VHcmFwaCIsInJlbGVhc2UiLCJnZXRSZWxlYXNlIiwiZGVwZW5kZW50UmVsZWFzZXMiLCJyZXRyaWV2ZURlcGVuZGVudFJlbGVhc2VzIiwiZGVwZW5kZW50UmVsZWFzZXNMZW5ndGgiLCJsZW5ndGgiLCJjb25zb2xlTG9nVW5wdWJsaXNoZWREaWZmIiwibmFtZSIsImdldE5hbWUiLCJmb3JFYWNoIiwiZGVwZW5kZW50UmVsZWFzZSIsImZpbmREaWZmIiwicmVtb3ZlRGVwZW5kZW5jeSIsImRlcGVuZGVuY3lNYXBFbXB0eSIsImlzRGVwZW5kZW5jeU1hcERpZmZFbXB0eSIsImRldkRlcGVuZGVudFJlbGVhc2VzIiwicmV0cmlldmVEZXZEZXBlbmRlbnRSZWxlYXNlcyIsImRldkRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoIiwiZGV2RGVwZW5kZW50UmVsZWFzZSIsInJlbW92ZURldkRlcGVuZGVuY3kiLCJmaW5kIiwiZGlmZlJlbGVhc2UiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztRQUlnQkE7ZUFBQUE7O1FBNkJBQztlQUFBQTs7O3VCQS9CMEI7QUFFbkMsU0FBU0QsbUJBQW1CRSxJQUFJLEVBQUVDLEtBQUssRUFBRUMsVUFBVSxFQUFFQyxZQUFZO0lBQ3RFLElBQU1DLFVBQVVKLEtBQUtLLFVBQVUsSUFDekJDLG9CQUFvQkgsYUFBYUkseUJBQXlCLENBQUNILFNBQVNGLGFBQ3BFTSwwQkFBMEJGLGtCQUFrQkcsTUFBTTtJQUV4REMsSUFBQUEsa0NBQXlCLEVBQUNWLE1BQU1DO0lBRWhDLElBQUlPLDBCQUEwQixHQUFHO1FBQy9CLElBQU1HLE9BQU9QLFFBQVFRLE9BQU87UUFFNUJOLGtCQUFrQk8sT0FBTyxDQUFDLFNBQUNDO1lBQ3pCLElBQU1WLFVBQVVVLGtCQUNWZCxTQUFPZSxTQUFTWCxTQUFTSDtZQUUvQixJQUFJRCxXQUFTLE1BQU07Z0JBQ2pCQSxPQUFLZ0IsZ0JBQWdCLENBQUNMO2dCQUV0QixJQUFNTSxxQkFBcUJqQixPQUFLa0Isd0JBQXdCO2dCQUV4RCxJQUFJRCxvQkFBb0I7b0JBQ3RCbEIsc0JBQXNCQyxRQUFNQyxPQUFPQyxZQUFZQztvQkFFL0NMLG1CQUFtQkUsUUFBTUMsT0FBT0MsWUFBWUM7Z0JBQzlDO1lBQ0Y7UUFDRjtJQUNGO0FBQ0Y7QUFFTyxTQUFTSixzQkFBc0JDLElBQUksRUFBRUMsS0FBSyxFQUFFQyxVQUFVLEVBQUVDLFlBQVk7SUFDekUsSUFBTUMsVUFBVUosS0FBS0ssVUFBVSxJQUN6QmMsdUJBQXVCaEIsYUFBYWlCLDRCQUE0QixDQUFDaEIsU0FBU0YsYUFDMUVtQiw2QkFBNkJGLHFCQUFxQlYsTUFBTTtJQUU5RCxJQUFJWSw2QkFBNkIsR0FBRztRQUNsQyxJQUFNVixPQUFPUCxRQUFRUSxPQUFPO1FBRTVCTyxxQkFBcUJOLE9BQU8sQ0FBQyxTQUFDUztZQUM1QixJQUFNbEIsVUFBVWtCLHFCQUNWdEIsU0FBT2UsU0FBU1gsU0FBU0g7WUFFL0IsSUFBSUQsV0FBUyxNQUFNO2dCQUNqQkEsT0FBS3VCLG1CQUFtQixDQUFDWjtZQUMzQjtRQUNGO0lBQ0Y7QUFDRjtBQUVBLFNBQVNJLFNBQVNYLE9BQU8sRUFBRUgsS0FBSztJQUM5QixJQUFNRCxPQUFPQyxNQUFNdUIsSUFBSSxDQUFDLFNBQUN4QjtRQUN2QixJQUFNeUIsY0FBY3pCLEtBQUtLLFVBQVU7UUFFbkMsSUFBSW9CLGdCQUFnQnJCLFNBQVM7WUFDM0IsT0FBTztRQUNUO0lBQ0YsTUFBTSxNQUFNLEdBQUc7SUFFZixPQUFPSjtBQUNUIn0=