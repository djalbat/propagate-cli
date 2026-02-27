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
const _dependency = require("../utilities/dependency");
const _configuration = require("../configuration");
function propagateReleaseOperation(proceed, abort, context) {
    const { release, releaseMap, releaseGraph, subDirectoryMap } = context, forcedDependencyRelations = (0, _configuration.retrieveForcedDependencyRelations)(), releases = [];
    propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations);
    const releasesLength = releases.length, dependentReleasesLength = releasesLength - 1;
    propagateDevDependencies(releases, releaseMap, releaseGraph);
    Object.assign(context, {
        releases,
        dependentReleasesLength
    });
    proceed();
}
function propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations) {
    const releasesIncludesRelease = releases.includes(release);
    if (!releasesIncludesRelease) {
        const version = release.getVersion();
        if (version !== null) {
            release.bumpPatchNumber();
        }
        releases.push(release);
    } else {
        return;
    }
    const dependentReleases = releaseGraph.retrieveDependentReleases(release, releaseMap), dependentReleasesLength = dependentReleases.length;
    if (dependentReleasesLength > 0) {
        const name = release.getName(), versionString = release.getVersionString(), dependencyRelease = release; ///
        dependentReleases.forEach((dependentRelease)=>{
            const dependencyRelationForced = (0, _dependency.isDependencyRelationForced)(dependencyRelease, dependentRelease, subDirectoryMap, forcedDependencyRelations);
            if (!dependencyRelationForced) {
                const success = dependentRelease.updateDependencyVersion(name, versionString);
                if (success) {
                    const release = dependentRelease; ///
                    propagateDependencies(release, releases, releaseMap, releaseGraph, subDirectoryMap, forcedDependencyRelations);
                }
            }
        });
    }
}
function propagateDevDependencies(releases, releaseMap, releaseGraph) {
    releases.forEach((release)=>{
        const devDependentReleases = releaseGraph.retrieveDevDependentReleases(release, releaseMap), devDependentReleasesLength = devDependentReleases.length;
        if (devDependentReleasesLength > 0) {
            const name = release.getName(), versionString = release.getVersionString();
            devDependentReleases.every((devDependentRelease)=>{
                const release = devDependentRelease, releasesIncludesRelease = releases.includes(release);
                if (!releasesIncludesRelease) {
                    const version = release.getVersion();
                    if (version !== null) {
                        release.bumpPatchNumber();
                    }
                    releases.push(release);
                }
                const success = release.updateDevDependencyVersion(name, versionString);
                if (success) {
                    return true;
                }
            });
        }
    });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVyYXRpb24vcHJvcGFnYXRlUmVsZWFzZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuaW1wb3J0IHsgaXNEZXBlbmRlbmN5UmVsYXRpb25Gb3JjZWQgfSBmcm9tIFwiLi4vdXRpbGl0aWVzL2RlcGVuZGVuY3lcIjtcbmltcG9ydCB7IHJldHJpZXZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyB9IGZyb20gXCIuLi9jb25maWd1cmF0aW9uXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHByb3BhZ2F0ZVJlbGVhc2VPcGVyYXRpb24ocHJvY2VlZCwgYWJvcnQsIGNvbnRleHQpIHtcbiAgY29uc3QgeyByZWxlYXNlLCByZWxlYXNlTWFwLCByZWxlYXNlR3JhcGgsIHN1YkRpcmVjdG9yeU1hcCB9ID0gY29udGV4dCxcbiAgICAgICAgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyA9IHJldHJpZXZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucygpLFxuICAgICAgICByZWxlYXNlcyA9IFtdO1xuXG4gIHByb3BhZ2F0ZURlcGVuZGVuY2llcyhyZWxlYXNlLCByZWxlYXNlcywgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoLCBzdWJEaXJlY3RvcnlNYXAsIGZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMpO1xuXG4gIGNvbnN0IHJlbGVhc2VzTGVuZ3RoID0gcmVsZWFzZXMubGVuZ3RoLFxuICAgICAgICBkZXBlbmRlbnRSZWxlYXNlc0xlbmd0aCA9IHJlbGVhc2VzTGVuZ3RoIC0gMTtcblxuICBwcm9wYWdhdGVEZXZEZXBlbmRlbmNpZXMocmVsZWFzZXMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCk7XG5cbiAgT2JqZWN0LmFzc2lnbihjb250ZXh0LCB7XG4gICAgcmVsZWFzZXMsXG4gICAgZGVwZW5kZW50UmVsZWFzZXNMZW5ndGhcbiAgfSk7XG5cbiAgcHJvY2VlZCgpO1xufVxuXG5mdW5jdGlvbiBwcm9wYWdhdGVEZXBlbmRlbmNpZXMocmVsZWFzZSwgcmVsZWFzZXMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCwgc3ViRGlyZWN0b3J5TWFwLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKSB7XG4gIGNvbnN0IHJlbGVhc2VzSW5jbHVkZXNSZWxlYXNlID0gcmVsZWFzZXMuaW5jbHVkZXMocmVsZWFzZSk7XG5cbiAgaWYgKCFyZWxlYXNlc0luY2x1ZGVzUmVsZWFzZSkge1xuICAgIGNvbnN0IHZlcnNpb24gPSByZWxlYXNlLmdldFZlcnNpb24oKTtcblxuICAgIGlmICh2ZXJzaW9uICE9PSBudWxsKSB7XG4gICAgICByZWxlYXNlLmJ1bXBQYXRjaE51bWJlcigpO1xuICAgIH1cblxuICAgIHJlbGVhc2VzLnB1c2gocmVsZWFzZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgZGVwZW5kZW50UmVsZWFzZXMgPSByZWxlYXNlR3JhcGgucmV0cmlldmVEZXBlbmRlbnRSZWxlYXNlcyhyZWxlYXNlLCByZWxlYXNlTWFwKSxcbiAgICAgICAgZGVwZW5kZW50UmVsZWFzZXNMZW5ndGggPSBkZXBlbmRlbnRSZWxlYXNlcy5sZW5ndGg7XG5cbiAgaWYgKGRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG5hbWUgPSByZWxlYXNlLmdldE5hbWUoKSxcbiAgICAgICAgICB2ZXJzaW9uU3RyaW5nID0gcmVsZWFzZS5nZXRWZXJzaW9uU3RyaW5nKCksXG4gICAgICAgICAgZGVwZW5kZW5jeVJlbGVhc2UgPSByZWxlYXNlOyAgLy8vXG5cbiAgICBkZXBlbmRlbnRSZWxlYXNlcy5mb3JFYWNoKChkZXBlbmRlbnRSZWxlYXNlKSA9PiB7XG4gICAgICBjb25zdCBkZXBlbmRlbmN5UmVsYXRpb25Gb3JjZWQgPSBpc0RlcGVuZGVuY3lSZWxhdGlvbkZvcmNlZChkZXBlbmRlbmN5UmVsZWFzZSwgZGVwZW5kZW50UmVsZWFzZSwgc3ViRGlyZWN0b3J5TWFwLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKTtcblxuICAgICAgaWYgKCFkZXBlbmRlbmN5UmVsYXRpb25Gb3JjZWQpIHtcbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IGRlcGVuZGVudFJlbGVhc2UudXBkYXRlRGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZyk7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zdCByZWxlYXNlID0gZGVwZW5kZW50UmVsZWFzZTsgLy8vXG5cbiAgICAgICAgICBwcm9wYWdhdGVEZXBlbmRlbmNpZXMocmVsZWFzZSwgcmVsZWFzZXMsIHJlbGVhc2VNYXAsIHJlbGVhc2VHcmFwaCwgc3ViRGlyZWN0b3J5TWFwLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHByb3BhZ2F0ZURldkRlcGVuZGVuY2llcyhyZWxlYXNlcywgcmVsZWFzZU1hcCwgcmVsZWFzZUdyYXBoKSB7XG4gIHJlbGVhc2VzLmZvckVhY2goKHJlbGVhc2UpID0+IHtcbiAgICBjb25zdCBkZXZEZXBlbmRlbnRSZWxlYXNlcyA9IHJlbGVhc2VHcmFwaC5yZXRyaWV2ZURldkRlcGVuZGVudFJlbGVhc2VzKHJlbGVhc2UsIHJlbGVhc2VNYXApLFxuICAgICAgICAgIGRldkRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID0gZGV2RGVwZW5kZW50UmVsZWFzZXMubGVuZ3RoO1xuXG4gICAgaWYgKGRldkRlcGVuZGVudFJlbGVhc2VzTGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgbmFtZSA9IHJlbGVhc2UuZ2V0TmFtZSgpLFxuICAgICAgICAgICAgdmVyc2lvblN0cmluZyA9IHJlbGVhc2UuZ2V0VmVyc2lvblN0cmluZygpO1xuXG4gICAgICBkZXZEZXBlbmRlbnRSZWxlYXNlcy5ldmVyeSgoZGV2RGVwZW5kZW50UmVsZWFzZSkgPT4ge1xuICAgICAgICBjb25zdCByZWxlYXNlID0gZGV2RGVwZW5kZW50UmVsZWFzZSwgIC8vL1xuICAgICAgICAgICAgICByZWxlYXNlc0luY2x1ZGVzUmVsZWFzZSA9IHJlbGVhc2VzLmluY2x1ZGVzKHJlbGVhc2UpO1xuXG4gICAgICAgIGlmICghcmVsZWFzZXNJbmNsdWRlc1JlbGVhc2UpIHtcbiAgICAgICAgICBjb25zdCB2ZXJzaW9uID0gcmVsZWFzZS5nZXRWZXJzaW9uKCk7XG5cbiAgICAgICAgICBpZiAodmVyc2lvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmVsZWFzZS5idW1wUGF0Y2hOdW1iZXIoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZWxlYXNlcy5wdXNoKHJlbGVhc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc3VjY2VzcyA9IHJlbGVhc2UudXBkYXRlRGV2RGVwZW5kZW5jeVZlcnNpb24obmFtZSwgdmVyc2lvblN0cmluZyk7XG5cbiAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJwcm9wYWdhdGVSZWxlYXNlT3BlcmF0aW9uIiwicHJvY2VlZCIsImFib3J0IiwiY29udGV4dCIsInJlbGVhc2UiLCJyZWxlYXNlTWFwIiwicmVsZWFzZUdyYXBoIiwic3ViRGlyZWN0b3J5TWFwIiwiZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyIsInJldHJpZXZlRm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucyIsInJlbGVhc2VzIiwicHJvcGFnYXRlRGVwZW5kZW5jaWVzIiwicmVsZWFzZXNMZW5ndGgiLCJsZW5ndGgiLCJkZXBlbmRlbnRSZWxlYXNlc0xlbmd0aCIsInByb3BhZ2F0ZURldkRlcGVuZGVuY2llcyIsIk9iamVjdCIsImFzc2lnbiIsInJlbGVhc2VzSW5jbHVkZXNSZWxlYXNlIiwiaW5jbHVkZXMiLCJ2ZXJzaW9uIiwiZ2V0VmVyc2lvbiIsImJ1bXBQYXRjaE51bWJlciIsInB1c2giLCJkZXBlbmRlbnRSZWxlYXNlcyIsInJldHJpZXZlRGVwZW5kZW50UmVsZWFzZXMiLCJuYW1lIiwiZ2V0TmFtZSIsInZlcnNpb25TdHJpbmciLCJnZXRWZXJzaW9uU3RyaW5nIiwiZGVwZW5kZW5jeVJlbGVhc2UiLCJmb3JFYWNoIiwiZGVwZW5kZW50UmVsZWFzZSIsImRlcGVuZGVuY3lSZWxhdGlvbkZvcmNlZCIsImlzRGVwZW5kZW5jeVJlbGF0aW9uRm9yY2VkIiwic3VjY2VzcyIsInVwZGF0ZURlcGVuZGVuY3lWZXJzaW9uIiwiZGV2RGVwZW5kZW50UmVsZWFzZXMiLCJyZXRyaWV2ZURldkRlcGVuZGVudFJlbGVhc2VzIiwiZGV2RGVwZW5kZW50UmVsZWFzZXNMZW5ndGgiLCJldmVyeSIsImRldkRlcGVuZGVudFJlbGVhc2UiLCJ1cGRhdGVEZXZEZXBlbmRlbmN5VmVyc2lvbiJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7K0JBS0E7OztlQUF3QkE7Ozs0QkFIbUI7K0JBQ087QUFFbkMsU0FBU0EsMEJBQTBCQyxPQUFPLEVBQUVDLEtBQUssRUFBRUMsT0FBTztJQUN2RSxNQUFNLEVBQUVDLE9BQU8sRUFBRUMsVUFBVSxFQUFFQyxZQUFZLEVBQUVDLGVBQWUsRUFBRSxHQUFHSixTQUN6REssNEJBQTRCQyxJQUFBQSxnREFBaUMsS0FDN0RDLFdBQVcsRUFBRTtJQUVuQkMsc0JBQXNCUCxTQUFTTSxVQUFVTCxZQUFZQyxjQUFjQyxpQkFBaUJDO0lBRXBGLE1BQU1JLGlCQUFpQkYsU0FBU0csTUFBTSxFQUNoQ0MsMEJBQTBCRixpQkFBaUI7SUFFakRHLHlCQUF5QkwsVUFBVUwsWUFBWUM7SUFFL0NVLE9BQU9DLE1BQU0sQ0FBQ2QsU0FBUztRQUNyQk87UUFDQUk7SUFDRjtJQUVBYjtBQUNGO0FBRUEsU0FBU1Usc0JBQXNCUCxPQUFPLEVBQUVNLFFBQVEsRUFBRUwsVUFBVSxFQUFFQyxZQUFZLEVBQUVDLGVBQWUsRUFBRUMseUJBQXlCO0lBQ3BILE1BQU1VLDBCQUEwQlIsU0FBU1MsUUFBUSxDQUFDZjtJQUVsRCxJQUFJLENBQUNjLHlCQUF5QjtRQUM1QixNQUFNRSxVQUFVaEIsUUFBUWlCLFVBQVU7UUFFbEMsSUFBSUQsWUFBWSxNQUFNO1lBQ3BCaEIsUUFBUWtCLGVBQWU7UUFDekI7UUFFQVosU0FBU2EsSUFBSSxDQUFDbkI7SUFDaEIsT0FBTztRQUNMO0lBQ0Y7SUFFQSxNQUFNb0Isb0JBQW9CbEIsYUFBYW1CLHlCQUF5QixDQUFDckIsU0FBU0MsYUFDcEVTLDBCQUEwQlUsa0JBQWtCWCxNQUFNO0lBRXhELElBQUlDLDBCQUEwQixHQUFHO1FBQy9CLE1BQU1ZLE9BQU90QixRQUFRdUIsT0FBTyxJQUN0QkMsZ0JBQWdCeEIsUUFBUXlCLGdCQUFnQixJQUN4Q0Msb0JBQW9CMUIsU0FBVSxHQUFHO1FBRXZDb0Isa0JBQWtCTyxPQUFPLENBQUMsQ0FBQ0M7WUFDekIsTUFBTUMsMkJBQTJCQyxJQUFBQSxzQ0FBMEIsRUFBQ0osbUJBQW1CRSxrQkFBa0J6QixpQkFBaUJDO1lBRWxILElBQUksQ0FBQ3lCLDBCQUEwQjtnQkFDN0IsTUFBTUUsVUFBVUgsaUJBQWlCSSx1QkFBdUIsQ0FBQ1YsTUFBTUU7Z0JBRS9ELElBQUlPLFNBQVM7b0JBQ1gsTUFBTS9CLFVBQVU0QixrQkFBa0IsR0FBRztvQkFFckNyQixzQkFBc0JQLFNBQVNNLFVBQVVMLFlBQVlDLGNBQWNDLGlCQUFpQkM7Z0JBQ3RGO1lBQ0Y7UUFDRjtJQUNGO0FBQ0Y7QUFFQSxTQUFTTyx5QkFBeUJMLFFBQVEsRUFBRUwsVUFBVSxFQUFFQyxZQUFZO0lBQ2xFSSxTQUFTcUIsT0FBTyxDQUFDLENBQUMzQjtRQUNoQixNQUFNaUMsdUJBQXVCL0IsYUFBYWdDLDRCQUE0QixDQUFDbEMsU0FBU0MsYUFDMUVrQyw2QkFBNkJGLHFCQUFxQnhCLE1BQU07UUFFOUQsSUFBSTBCLDZCQUE2QixHQUFHO1lBQ2xDLE1BQU1iLE9BQU90QixRQUFRdUIsT0FBTyxJQUN0QkMsZ0JBQWdCeEIsUUFBUXlCLGdCQUFnQjtZQUU5Q1EscUJBQXFCRyxLQUFLLENBQUMsQ0FBQ0M7Z0JBQzFCLE1BQU1yQyxVQUFVcUMscUJBQ1Z2QiwwQkFBMEJSLFNBQVNTLFFBQVEsQ0FBQ2Y7Z0JBRWxELElBQUksQ0FBQ2MseUJBQXlCO29CQUM1QixNQUFNRSxVQUFVaEIsUUFBUWlCLFVBQVU7b0JBRWxDLElBQUlELFlBQVksTUFBTTt3QkFDcEJoQixRQUFRa0IsZUFBZTtvQkFDekI7b0JBRUFaLFNBQVNhLElBQUksQ0FBQ25CO2dCQUNoQjtnQkFFQSxNQUFNK0IsVUFBVS9CLFFBQVFzQywwQkFBMEIsQ0FBQ2hCLE1BQU1FO2dCQUV6RCxJQUFJTyxTQUFTO29CQUNYLE9BQU87Z0JBQ1Q7WUFDRjtRQUNGO0lBQ0Y7QUFDRiJ9