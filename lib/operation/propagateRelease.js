"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return propagateReleaseOperation;
    }
});
var _dependency = require("../utilities/dependency");
var _configuration = require("../configuration");
function propagateReleaseOperation(proceed, abort, context) {
    var release = context.release, releaseMap = context.releaseMap, releaseGraph = context.releaseGraph, subDirectoryMap = context.subDirectoryMap, forcedDependencyRelations = (0, _configuration.retrieveForcedDependencyRelations)(), releases = [];
    propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations);
    var releasesLength = releases.length, dependentReleasesLength = releasesLength - 1;
    propagateDevDependencies(releases, releaseMap, releaseGraph);
    Object.assign(context, {
        releases: releases,
        dependentReleasesLength: dependentReleasesLength
    });
    proceed();
}
function propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations) {
    var releasesIncludesRelease = releases.includes(release);
    if (!releasesIncludesRelease) {
        var version = release.getVersion();
        if (version !== null) {
            release.bumpPatchNumber();
        }
        releases.push(release);
    } else {
        return;
    }
    var dependentReleases = releaseGraph.retrieveDependentReleases(release, releaseMap), dependentReleasesLength = dependentReleases.length;
    if (dependentReleasesLength > 0) {
        var name = release.getName(), versionString = release.getVersionString(), dependencyRelease = release; ///
        dependentReleases.forEach(function(dependentRelease) {
            var dependencyRelationForced = (0, _dependency.isDependencyRelationForced)(dependencyRelease, dependentRelease, subDirectoryMap, forcedDependencyRelations);
            if (!dependencyRelationForced) {
                var success = dependentRelease.updateDependencyVersion(name, versionString);
                if (success) {
                    var _$release = dependentRelease; ///
                    propagateDependencies(_$release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations);
                }
            }
        });
    }
}
function propagateDevDependencies(releases, releaseMap, releaseGraph) {
    releases.forEach(function(release) {
        var devDependentReleases = releaseGraph.retrieveDevDependentReleases(release, releaseMap), devDependentReleasesLength = devDependentReleases.length;
        if (devDependentReleasesLength > 0) {
            var name = release.getName(), versionString = release.getVersionString();
            devDependentReleases.every(function(devDependentRelease) {
                var _$release = devDependentRelease, releasesIncludesRelease = releases.includes(_$release);
                if (!releasesIncludesRelease) {
                    var version = _$release.getVersion();
                    if (version !== null) {
                        _$release.bumpPatchNumber();
                    }
                    releases.push(_$release);
                }
                var success = _$release.updateDevDependencyVersion(name, versionString);
                if (success) {
                    return true;
                }
            });
        }
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vcHJvcGFnYXRlUmVsZWFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgaXNEZXBlbmRlbmN5UmVsYXRpb25Gb3JjZWQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2RlcGVuZGVuY3lcIjtcbmltcG9ydCB7IHJldHJpZXZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3BhZ2F0ZVJlbGVhc2VPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyByZWxlYXNlLCByZWxlYXNlTWFwLCByZWxlYXNlR3JhcGgsIHN1YkRpcmVjdG9yeU1hcCB9ID0gY29udGV4dCxcbiAgICAgICAgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyA9IHJldHJpZXZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucygpLFxuICAgICAgICByZWxlYXNlcyA9IFtdO1xuXG4gIHByb3BhZ2F0ZURlcGVuZGVuY2llcyhyZWxlYXNlLCByZWxlYXNlcywgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoLCBzdWJEaXJlY3RvcnlNYXAsIGZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMpO1xuXG4gIGNvbnN0IHJlbGVhc2VzTGVuZ3RoID0gcmVsZWFzZXMubGVuZ3RoLFxuICAgICAgICBkZXBlbmRlbnRSZWxlYXNlc0xlbmd0aCA9IHJlbGVhc2VzTGVuZ3RoIC0gMTtcblxuICBwcm9wYWdhdGVEZXZEZXBlbmRlbmNpZXMocmVsZWFzZXMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCk7XG5cbiAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgcmVsZWFzZXMsXG4gICAgZGVwZW5kZW50UmVsZWFzZXNMZW5ndGhcbiAgfSk7XG5cbiAgcHJvY2VlZCgpO1xufVxuXG5mdW5jdGlvbiBwcm9wYWdhdGVEZXBlbmRlbmNpZXMocmVsZWFzZSwgcmVsZWFzZXMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCwgc3ViRGlyZWN0b3J5TWFwLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKSB7XG4gIGNvbnN0IHJlbGVhc2VzSW5jbHVkZXNSZWxlYXNlID0gcmVsZWFzZXMuaW5jbHVkZXMocmVsZWFzZSk7XG5cbiAgaWYgKCFyZWxlYXNlc0luY2x1ZGVzUmVsZWFzZSkge1xuICAgIGNvbnN0IHZlcnNpb24gPSByZWxlYXNlLmdldFZlcnNpb24oKTtcblxuICAgIGlmICh2ZXJzaW9uICE9PSBudWxsKSB7XG4gICAgICByZWxlYXNlLmJ1bXBQYXRjaE51bWJlcigpO1xuICAgIH1cblxuICAgIHJlbGVhc2VzLnB1c2gocmVsZWFzZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZGVwZW5kZW50UmVsZWFzZXMgPSByZWxlYXNlR3JhcGgucmV0cmlldmVEZXBlbmRlbnRSZWxlYXNlcyhyZWxlYXNlLCByZWxlYXNlTWFwKSxcbiAgICAgICAgZGVwZW5kZW50UmVsZWFzZXNMZW5ndGggPSBkZXBlbmRlbnRSZWxlYXNlcy5sZW5ndGg7XG5cbiAgaWYgKGRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG5hbWUgPSByZWxlYXNlLmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJzaW9uU3RyaW5nID0gcmVsZWFzZS5nZXRWZXJzaW9uU3RyaW5nKCksXG4gICAgICAgICAgZGVwZW5kZW5jeVJlbGVhc2UgPSByZWxlYXNlOyAgLy8vXG5cbiAgICBkZXBlbmRlbnRSZWxlYXNlcy5mb3JFYWNoKChkZXBlbmRlbnRSZWxlYXNlKSA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmN5UmVsYXRpb25Gb3JjZWQgPSBpc0RlcGVuZGVuY3lSZWxhdGlvbkZvcmNlZChkZXBlbmRlbmN5UmVsZWFzZSwgZGVwZW5kZW50UmVsZWFzZSwgc3ViRGlyZWN0b3J5TWFwLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKTtcblxuICAgICAgaWYgKCFkZXBlbmRlbmN5UmVsYXRpb25Gb3JjZWQpIHtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGRlcGVuZGVudFJlbGVhc2UudXBkYXRlRGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZyk7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCByZWxlYXNlID0gZGVwZW5kZW50UmVsZWFzZTsgLy8vXG5cbiAgICAgICAgICBwcm9wYWdhdGVEZXBlbmRlbmNpZXMocmVsZWFzZSwgcmVsZWFzZXMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCwgc3ViRGlyZWN0b3J5TWFwLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb3BhZ2F0ZURldkRlcGVuZGVuY2llcyhyZWxlYXNlcywgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoKSB7XG4gIHJlbGVhc2VzLmZvckVhY2goKHJlbGVhc2UpID0+IHtcbiAgICBjb25zdCBkZXZEZXBlbmRlbnRSZWxlYXNlcyA9IHJlbGVhc2VHcmFwaC5yZXRyaWV2ZURldkRlcGVuZGVudFJlbGVhc2VzKHJlbGVhc2UsIHJlbGVhc2VNYXApLFxuICAgICAgICAgIGRldkRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID0gZGV2RGVwZW5kZW50UmVsZWFzZXMubGVuZ3RoO1xuXG4gICAgaWYgKGRldkRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmFtZSA9IHJlbGVhc2UuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgdmVyc2lvblN0cmluZyA9IHJlbGVhc2UuZ2V0VmVyc2lvblN0cmluZygpO1xuXG4gICAgICBkZXZEZXBlbmRlbnRSZWxlYXNlcy5ldmVyeSgoZGV2RGVwZW5kZW50UmVsZWFzZSkgPT4ge1xuICAgICAgICBjb25zdCByZWxlYXNlID0gZGV2RGVwZW5kZW50UmVsZWFzZSwgIC8vL1xuICAgICAgICAgICAgICByZWxlYXNlc0luY2x1ZGVzUmVsZWFzZSA9IHJlbGVhc2VzLmluY2x1ZGVzKHJlbGVhc2UpO1xuXG4gICAgICAgIGlmICghcmVsZWFzZXNJbmNsdWRlc1JlbGVhc2UpIHtcbiAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gcmVsZWFzZS5nZXRWZXJzaW9uKCk7XG5cbiAgICAgICAgICBpZiAodmVyc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVsZWFzZS5idW1wUGF0Y2hOdW1iZXIoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWxlYXNlcy5wdXNoKHJlbGVhc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHJlbGVhc2UudXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZyk7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJwcm9wYWdhdGVSZWxlYXNlT3BlcmF0aW9uIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInJlbGVhc2UiLCJyZWxlYXNlTWFwIiwicmVsZWFzZUdyYXBoIiwic3ViRGlyZWN0b3J5TWFwIiwiZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyIsInJldHJpZXZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyIsInJlbGVhc2VzIiwicHJvcGFnYXRlRGVwZW5kZW5jaWVzIiwicmVsZWFzZXNMZW5ndGgiLCJsZW5ndGgiLCJkZXBlbmRlbnRSZWxlYXNlc0xlbmd0aCIsInByb3BhZ2F0ZURldkRlcGVuZGVuY2llcyIsIk9iamVjdCIsImFzc2lnbiIsInJlbGVhc2VzSW5jbHVkZXNSZWxlYXNlIiwiaW5jbHVkZXMiLCJ2ZXJzaW9uIiwiZ2V0VmVyc2lvbiIsImJ1bXBQYXRjaE51bWJlciIsInB1c2giLCJkZXBlbmRlbnRSZWxlYXNlcyIsInJldHJpZXZlRGVwZW5kZW50UmVsZWFzZXMiLCJuYW1lIiwiZ2V0TmFtZSIsInZlcnNpb25TdHJpbmciLCJnZXRWZXJzaW9uU3RyaW5nIiwiZGVwZW5kZW5jeVJlbGVhc2UiLCJmb3JFYWNoIiwiZGVwZW5kZW50UmVsZWFzZSIsImRlcGVuZGVuY3lSZWxhdGlvbkZvcmNlZCIsImlzRGVwZW5kZW5jeVJlbGF0aW9uRm9yY2VkIiwic3VjY2VzcyIsInVwZGF0ZURlcGVuZGVuY3lWZXJzaW9uIiwiZGV2RGVwZW5kZW50UmVsZWFzZXMiLCJyZXRyaWV2ZURldkRlcGVuZGVudFJlbGVhc2VzIiwiZGV2RGVwZW5kZW50UmVsZWFzZXNMZW5ndGgiLCJldmVyeSIsImRldkRlcGVuZGVudFJlbGVhc2UiLCJ1cGRhdGVEZXZEZXBlbmRlbmN5VmVyc2lvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBS0E7OztlQUF3QkE7OzswQkFIbUI7NkJBQ087QUFFbkMsU0FBU0EsMEJBQTBCQyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUN2RSxJQUFRQyxVQUF1REQsUUFBdkRDLFNBQVNDLGFBQThDRixRQUE5Q0UsWUFBWUMsZUFBa0NILFFBQWxDRyxjQUFjQyxrQkFBb0JKLFFBQXBCSSxpQkFDckNDLDRCQUE0QkMsSUFBQUEsZ0RBQWlDLEtBQzdEQyxXQUFXLEVBQUU7SUFFbkJDLHNCQUFzQlAsU0FBU00sVUFBVUwsWUFBWUMsY0FBY0MsaUJBQWlCQztJQUVwRixJQUFNSSxpQkFBaUJGLFNBQVNHLE1BQU0sRUFDaENDLDBCQUEwQkYsaUJBQWlCO0lBRWpERyx5QkFBeUJMLFVBQVVMLFlBQVlDO0lBRS9DVSxPQUFPQyxNQUFNLENBQUNkLFNBQVM7UUFDckJPLFVBQUFBO1FBQ0FJLHlCQUFBQTtJQUNGO0lBRUFiO0FBQ0Y7QUFFQSxTQUFTVSxzQkFBc0JQLE9BQU8sRUFBRU0sUUFBUSxFQUFFTCxVQUFVLEVBQUVDLFlBQVksRUFBRUMsZUFBZSxFQUFFQyx5QkFBeUI7SUFDcEgsSUFBTVUsMEJBQTBCUixTQUFTUyxRQUFRLENBQUNmO0lBRWxELElBQUksQ0FBQ2MseUJBQXlCO1FBQzVCLElBQU1FLFVBQVVoQixRQUFRaUIsVUFBVTtRQUVsQyxJQUFJRCxZQUFZLE1BQU07WUFDcEJoQixRQUFRa0IsZUFBZTtRQUN6QjtRQUVBWixTQUFTYSxJQUFJLENBQUNuQjtJQUNoQixPQUFPO1FBQ0w7SUFDRjtJQUVBLElBQU1vQixvQkFBb0JsQixhQUFhbUIseUJBQXlCLENBQUNyQixTQUFTQyxhQUNwRVMsMEJBQTBCVSxrQkFBa0JYLE1BQU07SUFFeEQsSUFBSUMsMEJBQTBCLEdBQUc7UUFDL0IsSUFBTVksT0FBT3RCLFFBQVF1QixPQUFPLElBQ3RCQyxnQkFBZ0J4QixRQUFReUIsZ0JBQWdCLElBQ3hDQyxvQkFBb0IxQixTQUFVLEdBQUc7UUFFdkNvQixrQkFBa0JPLE9BQU8sQ0FBQyxTQUFDQztZQUN6QixJQUFNQywyQkFBMkJDLElBQUFBLHNDQUEwQixFQUFDSixtQkFBbUJFLGtCQUFrQnpCLGlCQUFpQkM7WUFFbEgsSUFBSSxDQUFDeUIsMEJBQTBCO2dCQUM3QixJQUFNRSxVQUFVSCxpQkFBaUJJLHVCQUF1QixDQUFDVixNQUFNRTtnQkFFL0QsSUFBSU8sU0FBUztvQkFDWCxJQUFNL0IsWUFBVTRCLGtCQUFrQixHQUFHO29CQUVyQ3JCLHNCQUFzQlAsV0FBU00sVUFBVUwsWUFBWUMsY0FBY0MsaUJBQWlCQztnQkFDdEY7WUFDRjtRQUNGO0lBQ0Y7QUFDRjtBQUVBLFNBQVNPLHlCQUF5QkwsUUFBUSxFQUFFTCxVQUFVLEVBQUVDLFlBQVk7SUFDbEVJLFNBQVNxQixPQUFPLENBQUMsU0FBQzNCO1FBQ2hCLElBQU1pQyx1QkFBdUIvQixhQUFhZ0MsNEJBQTRCLENBQUNsQyxTQUFTQyxhQUMxRWtDLDZCQUE2QkYscUJBQXFCeEIsTUFBTTtRQUU5RCxJQUFJMEIsNkJBQTZCLEdBQUc7WUFDbEMsSUFBTWIsT0FBT3RCLFFBQVF1QixPQUFPLElBQ3RCQyxnQkFBZ0J4QixRQUFReUIsZ0JBQWdCO1lBRTlDUSxxQkFBcUJHLEtBQUssQ0FBQyxTQUFDQztnQkFDMUIsSUFBTXJDLFlBQVVxQyxxQkFDVnZCLDBCQUEwQlIsU0FBU1MsUUFBUSxDQUFDZjtnQkFFbEQsSUFBSSxDQUFDYyx5QkFBeUI7b0JBQzVCLElBQU1FLFVBQVVoQixVQUFRaUIsVUFBVTtvQkFFbEMsSUFBSUQsWUFBWSxNQUFNO3dCQUNwQmhCLFVBQVFrQixlQUFlO29CQUN6QjtvQkFFQVosU0FBU2EsSUFBSSxDQUFDbkI7Z0JBQ2hCO2dCQUVBLElBQU0rQixVQUFVL0IsVUFBUXNDLDBCQUEwQixDQUFDaEIsTUFBTUU7Z0JBRXpELElBQUlPLFNBQVM7b0JBQ1gsT0FBTztnQkFDVDtZQUNGO1FBQ0Y7SUFDRjtBQUNGIn0=