"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return ReleaseGraph;
    }
});
var _occamdirectedgraphs = require("occam-directed-graphs");
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
var ReleaseGraph = /*#__PURE__*/ function() {
    function ReleaseGraph(dependencyDirectedGraph, devDependencyDirectedGraph) {
        _class_call_check(this, ReleaseGraph);
        this.dependencyDirectedGraph = dependencyDirectedGraph;
        this.devDependencyDirectedGraph = devDependencyDirectedGraph;
    }
    _create_class(ReleaseGraph, [
        {
            key: "getDependencyDirectedGraph",
            value: function getDependencyDirectedGraph() {
                return this.dependencyDirectedGraph;
            }
        },
        {
            key: "getDevDependencyDirectedGraph",
            value: function getDevDependencyDirectedGraph() {
                return this.devDependencyDirectedGraph;
            }
        },
        {
            key: "isCyclicDependencyPresent",
            value: function isCyclicDependencyPresent() {
                var cyclesPresent = this.dependencyDirectedGraph.areCyclesPresent(), cyclicDependencyPresent = cyclesPresent; ///
                return cyclicDependencyPresent;
            }
        },
        {
            key: "isCyclicDevDependencyPresent",
            value: function isCyclicDevDependencyPresent() {
                var cyclesPresent = this.devDependencyDirectedGraph.areCyclesPresent(), cyclicDevDependencyPresent = cyclesPresent; ///
                return cyclicDevDependencyPresent;
            }
        },
        {
            key: "getCyclicDependencySubDirectoryPaths",
            value: function getCyclicDependencySubDirectoryPaths() {
                var firstCycle = this.dependencyDirectedGraph.getFirstCycle(), vertexNames = firstCycle.getVertexNames(), cyclicDependencySubDirectoryPaths = vertexNames; ///
                return cyclicDependencySubDirectoryPaths;
            }
        },
        {
            key: "getCyclicDevDependencySubDirectoryPaths",
            value: function getCyclicDevDependencySubDirectoryPaths() {
                var firstCycle = this.devDependencyDirectedGraph.getFirstCycle(), vertexNames = firstCycle.getVertexNames(), cyclicDevDependencySubDirectoryPaths = vertexNames; ///
                return cyclicDevDependencySubDirectoryPaths;
            }
        },
        {
            key: "getOrderedDependencySubDirectoryPaths",
            value: function getOrderedDependencySubDirectoryPaths() {
                var dependencyDirectedGraphOrderedVertexNames = this.dependencyDirectedGraph.getOrderedVertexNames(), orderedDependencySubDirectoryPaths = dependencyDirectedGraphOrderedVertexNames; ///
                return orderedDependencySubDirectoryPaths;
            }
        },
        {
            key: "getOrderedDevDependencySubDirectoryPaths",
            value: function getOrderedDevDependencySubDirectoryPaths() {
                var dependencyDirectedGraphOrderedVertexNames = this.devDependencyDirectedGraph.getOrderedVertexNames(), orderedDevDependencySubDirectoryPaths = dependencyDirectedGraphOrderedVertexNames; ///
                return orderedDevDependencySubDirectoryPaths;
            }
        },
        {
            key: "retrieveDependentReleases",
            value: function retrieveDependentReleases(release, releaseMap) {
                var subDirectoryPath = release.getSubDirectoryPath(), vertexName = subDirectoryPath, immediateSuccessorVertexNames = this.dependencyDirectedGraph.getImmediateSuccessorVertexNamesByVertexName(vertexName), dependentSubDirectoryPaths = immediateSuccessorVertexNames, dependentReleases = dependentSubDirectoryPaths.map(function(dependentSubDirectoryPath) {
                    var dependentRelease = releaseMap.retrieveRelease(dependentSubDirectoryPath);
                    return dependentRelease;
                });
                return dependentReleases;
            }
        },
        {
            key: "retrieveDevDependentReleases",
            value: function retrieveDevDependentReleases(release, releaseMap) {
                var subDirectoryPath = release.getSubDirectoryPath(), vertexName = subDirectoryPath, immediateSuccessorVertexNames = this.devDependencyDirectedGraph.getImmediateSuccessorVertexNamesByVertexName(vertexName), devDependentSubDirectoryPaths = immediateSuccessorVertexNames, devDependentReleases = devDependentSubDirectoryPaths.map(function(devDependentSubDirectoryPath) {
                    var devDependentRelease = releaseMap.retrieveRelease(devDependentSubDirectoryPath);
                    return devDependentRelease;
                });
                return devDependentReleases;
            }
        }
    ], [
        {
            key: "fromReleaseMapSubDirectoryMapAndForcedDependencyRelations",
            value: function fromReleaseMapSubDirectoryMapAndForcedDependencyRelations(releaseMap, subDirectoryMap, forcedDependencyRelations) {
                var dependencyDirectedGraph = _occamdirectedgraphs.DirectedGraph.fromNothing(), devDependencyDirectedGraph = _occamdirectedgraphs.DirectedGraph.fromNothing(), releaseNames = releaseMap.getNames(), subDirectoryPaths = releaseMap.getSubDirectoryPaths(), nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(), vertexNames = subDirectoryPaths; ///
                dependencyDirectedGraph.addVertexesByVertexNames(vertexNames);
                devDependencyDirectedGraph.addVertexesByVertexNames(vertexNames);
                subDirectoryPaths.forEach(function(subDirectoryPath) {
                    var release = releaseMap.retrieveRelease(subDirectoryPath), releaseDependencyNames = release.getDependencyNames(), releaseDevDependencyNames = release.getDevDependencyNames();
                    releaseDependencyNames.forEach(function(releaseDependencyName) {
                        var releaseNamesIncludesReleaseDependencyName = releaseNames.includes(releaseDependencyName);
                        if (releaseNamesIncludesReleaseDependencyName) {
                            var dependencySubDirectoryPath = nameToSubDirectoryPathMap[releaseDependencyName], sourceVertexName = dependencySubDirectoryPath, targetVertexName = subDirectoryPath; ///
                            dependencyDirectedGraph.addEdgeBySourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);
                        }
                    });
                    releaseDevDependencyNames.forEach(function(releaseDevDependencyName) {
                        var releaseNamesIncludesReleaseDevDependencyName = releaseNames.includes(releaseDevDependencyName);
                        if (releaseNamesIncludesReleaseDevDependencyName) {
                            var devDependencySubDirectoryPath = nameToSubDirectoryPathMap[releaseDevDependencyName], sourceVertexName = devDependencySubDirectoryPath, targetVertexName = subDirectoryPath; ///
                            devDependencyDirectedGraph.addEdgeBySourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);
                        }
                    });
                });
                forcedDependencyRelations.forEach(function(forcedDependencyRelation) {
                    var dependent = forcedDependencyRelation.dependent, dependentSubDirectoryName = dependent, dependentSubDirectoryPath = subDirectoryMap[dependentSubDirectoryName], dependentRelease = releaseMap.retrieveRelease(dependentSubDirectoryPath);
                    if (dependentRelease === null) {
                        console.log("The '".concat(dependent, "' forced dependent does not exist."));
                        return;
                    }
                    var dependency = forcedDependencyRelation.dependency, dependencySubDirectoryName = dependency, dependencySubDirectoryPath = subDirectoryMap[dependencySubDirectoryName], dependencyRelease = releaseMap.retrieveRelease(dependencySubDirectoryPath);
                    if (dependencyRelease === null) {
                        console.log("The '".concat(dependency, "' forced dependency does not exist."));
                        return;
                    }
                    var sourceVertexName = dependencySubDirectoryPath, targetVertexName = dependentSubDirectoryPath, devDependencyDirectedGraphEdgePresent = devDependencyDirectedGraph.isEdgePresentBySourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName), dependencyDirectedGraphEdgePresent = dependencyDirectedGraph.isEdgePresentBySourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName), devDependencyRelationPresent = devDependencyDirectedGraphEdgePresent, dependencyRelationPresent = dependencyDirectedGraphEdgePresent; ///
                    if (dependencyRelationPresent) {
                        console.log("The '".concat(dependency, "' -> '").concat(dependent, "' dependency relation is present and therefore cannot be forced."));
                        return;
                    }
                    if (!devDependencyRelationPresent) {
                        console.log("The '".concat(dependency, "' -> '").concat(dependent, "' developer dependency relation is not present and therefore cannot be forced."));
                        return;
                    }
                    dependencyDirectedGraph.addEdgeBySourceVertexNameAndTargetVertexName(sourceVertexName, targetVertexName);
                });
                var releaseGraph = new ReleaseGraph(dependencyDirectedGraph, devDependencyDirectedGraph);
                return releaseGraph;
            }
        }
    ]);
    return ReleaseGraph;
}();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yZWxlYXNlR3JhcGguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCB7IERpcmVjdGVkR3JhcGggfSBmcm9tIFwib2NjYW0tZGlyZWN0ZWQtZ3JhcGhzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbGVhc2VHcmFwaCB7XG4gIGNvbnN0cnVjdG9yKGRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoLCBkZXZEZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaCkge1xuICAgIHRoaXMuZGVwZW5kZW5jeURpcmVjdGVkR3JhcGggPSBkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaDtcbiAgICB0aGlzLmRldkRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoID0gZGV2RGVwZW5kZW5jeURpcmVjdGVkR3JhcGg7XG4gIH1cblxuICBnZXREZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaCgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaDtcbiAgfVxuXG4gIGdldERldkRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoKCkge1xuICAgIHJldHVybiB0aGlzLmRldkRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoO1xuICB9XG5cbiAgaXNDeWNsaWNEZXBlbmRlbmN5UHJlc2VudCgpIHtcbiAgICBjb25zdCBjeWNsZXNQcmVzZW50ID0gdGhpcy5kZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaC5hcmVDeWNsZXNQcmVzZW50KCksXG4gICAgICAgICAgY3ljbGljRGVwZW5kZW5jeVByZXNlbnQgPSBjeWNsZXNQcmVzZW50OyAgLy8vXG5cbiAgICByZXR1cm4gY3ljbGljRGVwZW5kZW5jeVByZXNlbnQ7XG4gIH1cblxuICBpc0N5Y2xpY0RldkRlcGVuZGVuY3lQcmVzZW50KCkge1xuICAgIGNvbnN0IGN5Y2xlc1ByZXNlbnQgPSB0aGlzLmRldkRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoLmFyZUN5Y2xlc1ByZXNlbnQoKSxcbiAgICAgICAgICBjeWNsaWNEZXZEZXBlbmRlbmN5UHJlc2VudCA9IGN5Y2xlc1ByZXNlbnQ7ICAvLy9cblxuICAgIHJldHVybiBjeWNsaWNEZXZEZXBlbmRlbmN5UHJlc2VudDtcbiAgfVxuXG4gIGdldEN5Y2xpY0RlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBmaXJzdEN5Y2xlID0gdGhpcy5kZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaC5nZXRGaXJzdEN5Y2xlKCksXG4gICAgICAgICAgdmVydGV4TmFtZXMgPSBmaXJzdEN5Y2xlLmdldFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgY3ljbGljRGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzID0gdmVydGV4TmFtZXM7ICAvLy9cblxuICAgIHJldHVybiBjeWNsaWNEZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aHM7XG4gIH1cblxuICBnZXRDeWNsaWNEZXZEZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aHMoKSB7XG4gICAgY29uc3QgZmlyc3RDeWNsZSA9IHRoaXMuZGV2RGVwZW5kZW5jeURpcmVjdGVkR3JhcGguZ2V0Rmlyc3RDeWNsZSgpLFxuICAgICAgICAgIHZlcnRleE5hbWVzID0gZmlyc3RDeWNsZS5nZXRWZXJ0ZXhOYW1lcygpLFxuICAgICAgICAgIGN5Y2xpY0RldkRlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyA9IHZlcnRleE5hbWVzOyAgLy8vXG5cbiAgICByZXR1cm4gY3ljbGljRGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgZ2V0T3JkZXJlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaE9yZGVyZWRWZXJ0ZXhOYW1lcyA9IHRoaXMuZGVwZW5kZW5jeURpcmVjdGVkR3JhcGguZ2V0T3JkZXJlZFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgb3JkZXJlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyA9IGRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoT3JkZXJlZFZlcnRleE5hbWVzOyAvLy9cblxuICAgIHJldHVybiBvcmRlcmVkRGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgZ2V0T3JkZXJlZERldkRlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocygpIHtcbiAgICBjb25zdCBkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaE9yZGVyZWRWZXJ0ZXhOYW1lcyA9IHRoaXMuZGV2RGVwZW5kZW5jeURpcmVjdGVkR3JhcGguZ2V0T3JkZXJlZFZlcnRleE5hbWVzKCksXG4gICAgICAgICAgb3JkZXJlZERldkRlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyA9IGRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoT3JkZXJlZFZlcnRleE5hbWVzOyAvLy9cblxuICAgIHJldHVybiBvcmRlcmVkRGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzO1xuICB9XG5cbiAgcmV0cmlldmVEZXBlbmRlbnRSZWxlYXNlcyhyZWxlYXNlLCByZWxlYXNlTWFwKSB7XG4gICAgY29uc3Qgc3ViRGlyZWN0b3J5UGF0aCA9IHJlbGVhc2UuZ2V0U3ViRGlyZWN0b3J5UGF0aCgpLFxuICAgICAgICAgIHZlcnRleE5hbWUgPSBzdWJEaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMgPSB0aGlzLmRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoLmdldEltbWVkaWF0ZVN1Y2Nlc3NvclZlcnRleE5hbWVzQnlWZXJ0ZXhOYW1lKHZlcnRleE5hbWUpLFxuICAgICAgICAgIGRlcGVuZGVudFN1YkRpcmVjdG9yeVBhdGhzID0gaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMsXG4gICAgICAgICAgZGVwZW5kZW50UmVsZWFzZXMgPSBkZXBlbmRlbnRTdWJEaXJlY3RvcnlQYXRocy5tYXAoKGRlcGVuZGVudFN1YkRpcmVjdG9yeVBhdGgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlcGVuZGVudFJlbGVhc2UgPSByZWxlYXNlTWFwLnJldHJpZXZlUmVsZWFzZShkZXBlbmRlbnRTdWJEaXJlY3RvcnlQYXRoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGRlcGVuZGVudFJlbGVhc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICByZXR1cm4gZGVwZW5kZW50UmVsZWFzZXM7XG4gIH1cblxuICByZXRyaWV2ZURldkRlcGVuZGVudFJlbGVhc2VzKHJlbGVhc2UsIHJlbGVhc2VNYXApIHtcbiAgICBjb25zdCBzdWJEaXJlY3RvcnlQYXRoID0gcmVsZWFzZS5nZXRTdWJEaXJlY3RvcnlQYXRoKCksXG4gICAgICAgICAgdmVydGV4TmFtZSA9IHN1YkRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyA9IHRoaXMuZGV2RGVwZW5kZW5jeURpcmVjdGVkR3JhcGguZ2V0SW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXNCeVZlcnRleE5hbWUodmVydGV4TmFtZSksXG4gICAgICAgICAgZGV2RGVwZW5kZW50U3ViRGlyZWN0b3J5UGF0aHMgPSBpbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lcyxcbiAgICAgICAgICBkZXZEZXBlbmRlbnRSZWxlYXNlcyA9IGRldkRlcGVuZGVudFN1YkRpcmVjdG9yeVBhdGhzLm1hcCgoZGV2RGVwZW5kZW50U3ViRGlyZWN0b3J5UGF0aCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGV2RGVwZW5kZW50UmVsZWFzZSA9IHJlbGVhc2VNYXAucmV0cmlldmVSZWxlYXNlKGRldkRlcGVuZGVudFN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICAgICAgICByZXR1cm4gZGV2RGVwZW5kZW50UmVsZWFzZTtcbiAgICAgICAgICB9KTtcblxuICAgIHJldHVybiBkZXZEZXBlbmRlbnRSZWxlYXNlcztcbiAgfVxuXG4gIHN0YXRpYyBmcm9tUmVsZWFzZU1hcFN1YkRpcmVjdG9yeU1hcEFuZEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMocmVsZWFzZU1hcCwgc3ViRGlyZWN0b3J5TWFwLCBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zKSB7XG4gICAgY29uc3QgZGVwZW5kZW5jeURpcmVjdGVkR3JhcGggPSBEaXJlY3RlZEdyYXBoLmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgZGV2RGVwZW5kZW5jeURpcmVjdGVkR3JhcGggPSBEaXJlY3RlZEdyYXBoLmZyb21Ob3RoaW5nKCksXG4gICAgICAgICAgcmVsZWFzZU5hbWVzID0gcmVsZWFzZU1hcC5nZXROYW1lcygpLFxuICAgICAgICAgIHN1YkRpcmVjdG9yeVBhdGhzID0gcmVsZWFzZU1hcC5nZXRTdWJEaXJlY3RvcnlQYXRocygpLFxuICAgICAgICAgIG5hbWVUb1N1YkRpcmVjdG9yeVBhdGhNYXAgPSByZWxlYXNlTWFwLmdldE5hbWVUb1N1YkRpcmVjdG9yeVBhdGhNYXAoKSxcbiAgICAgICAgICB2ZXJ0ZXhOYW1lcyA9IHN1YkRpcmVjdG9yeVBhdGhzOyAgLy8vXG5cbiAgICBkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaC5hZGRWZXJ0ZXhlc0J5VmVydGV4TmFtZXModmVydGV4TmFtZXMpO1xuXG4gICAgZGV2RGVwZW5kZW5jeURpcmVjdGVkR3JhcGguYWRkVmVydGV4ZXNCeVZlcnRleE5hbWVzKHZlcnRleE5hbWVzKTtcblxuICAgIHN1YkRpcmVjdG9yeVBhdGhzLmZvckVhY2goKHN1YkRpcmVjdG9yeVBhdGgpID0+IHtcbiAgICAgIGNvbnN0IHJlbGVhc2UgPSByZWxlYXNlTWFwLnJldHJpZXZlUmVsZWFzZShzdWJEaXJlY3RvcnlQYXRoKSxcbiAgICAgICAgICAgIHJlbGVhc2VEZXBlbmRlbmN5TmFtZXMgPSByZWxlYXNlLmdldERlcGVuZGVuY3lOYW1lcygpLFxuICAgICAgICAgICAgcmVsZWFzZURldkRlcGVuZGVuY3lOYW1lcyA9IHJlbGVhc2UuZ2V0RGV2RGVwZW5kZW5jeU5hbWVzKCk7XG5cbiAgICAgIHJlbGVhc2VEZXBlbmRlbmN5TmFtZXMuZm9yRWFjaCgocmVsZWFzZURlcGVuZGVuY3lOYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbGVhc2VOYW1lc0luY2x1ZGVzUmVsZWFzZURlcGVuZGVuY3lOYW1lID0gcmVsZWFzZU5hbWVzLmluY2x1ZGVzKHJlbGVhc2VEZXBlbmRlbmN5TmFtZSk7XG5cbiAgICAgICAgaWYgKHJlbGVhc2VOYW1lc0luY2x1ZGVzUmVsZWFzZURlcGVuZGVuY3lOYW1lKSB7XG4gICAgICAgICAgY29uc3QgZGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGggPSBuYW1lVG9TdWJEaXJlY3RvcnlQYXRoTWFwW3JlbGVhc2VEZXBlbmRlbmN5TmFtZV0sXG4gICAgICAgICAgICAgICAgc291cmNlVmVydGV4TmFtZSA9IGRlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRoLCAgLy8vXG4gICAgICAgICAgICAgICAgdGFyZ2V0VmVydGV4TmFtZSA9IHN1YkRpcmVjdG9yeVBhdGg7ICAvLy9cblxuICAgICAgICAgIGRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoLmFkZEVkZ2VCeVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lKHNvdXJjZVZlcnRleE5hbWUsIHRhcmdldFZlcnRleE5hbWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmVsZWFzZURldkRlcGVuZGVuY3lOYW1lcy5mb3JFYWNoKChyZWxlYXNlRGV2RGVwZW5kZW5jeU5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcmVsZWFzZU5hbWVzSW5jbHVkZXNSZWxlYXNlRGV2RGVwZW5kZW5jeU5hbWUgPSByZWxlYXNlTmFtZXMuaW5jbHVkZXMocmVsZWFzZURldkRlcGVuZGVuY3lOYW1lKTtcblxuICAgICAgICBpZiAocmVsZWFzZU5hbWVzSW5jbHVkZXNSZWxlYXNlRGV2RGVwZW5kZW5jeU5hbWUpIHtcbiAgICAgICAgICBjb25zdCBkZXZEZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aCA9IG5hbWVUb1N1YkRpcmVjdG9yeVBhdGhNYXBbcmVsZWFzZURldkRlcGVuZGVuY3lOYW1lXSxcbiAgICAgICAgICAgICAgICBzb3VyY2VWZXJ0ZXhOYW1lID0gZGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgICAgICB0YXJnZXRWZXJ0ZXhOYW1lID0gc3ViRGlyZWN0b3J5UGF0aDsgIC8vL1xuXG4gICAgICAgICAgZGV2RGVwZW5kZW5jeURpcmVjdGVkR3JhcGguYWRkRWRnZUJ5U291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUoc291cmNlVmVydGV4TmFtZSwgdGFyZ2V0VmVydGV4TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9ucy5mb3JFYWNoKChmb3JjZWREZXBlbmRlbmN5UmVsYXRpb24pID0+IHtcbiAgICAgIGNvbnN0IHsgZGVwZW5kZW50IH0gPSBmb3JjZWREZXBlbmRlbmN5UmVsYXRpb24sXG4gICAgICAgICAgICBkZXBlbmRlbnRTdWJEaXJlY3RvcnlOYW1lID0gZGVwZW5kZW50LCAvL1xuICAgICAgICAgICAgZGVwZW5kZW50U3ViRGlyZWN0b3J5UGF0aCA9IHN1YkRpcmVjdG9yeU1hcFtkZXBlbmRlbnRTdWJEaXJlY3RvcnlOYW1lXSwgLy8vXG4gICAgICAgICAgICBkZXBlbmRlbnRSZWxlYXNlID0gcmVsZWFzZU1hcC5yZXRyaWV2ZVJlbGVhc2UoZGVwZW5kZW50U3ViRGlyZWN0b3J5UGF0aCk7XG5cbiAgICAgIGlmIChkZXBlbmRlbnRSZWxlYXNlID09PSBudWxsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGBUaGUgJyR7ZGVwZW5kZW50fScgZm9yY2VkIGRlcGVuZGVudCBkb2VzIG5vdCBleGlzdC5gKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgZGVwZW5kZW5jeSB9ID0gZm9yY2VkRGVwZW5kZW5jeVJlbGF0aW9uLFxuICAgICAgICAgICAgZGVwZW5kZW5jeVN1YkRpcmVjdG9yeU5hbWUgPSBkZXBlbmRlbmN5LCAgLy8vXG4gICAgICAgICAgICBkZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aCA9IHN1YkRpcmVjdG9yeU1hcFtkZXBlbmRlbmN5U3ViRGlyZWN0b3J5TmFtZV0sICAvLy9cbiAgICAgICAgICAgIGRlcGVuZGVuY3lSZWxlYXNlID0gcmVsZWFzZU1hcC5yZXRyaWV2ZVJlbGVhc2UoZGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGgpO1xuXG4gICAgICBpZiAoZGVwZW5kZW5jeVJlbGVhc2UgPT09IG51bGwpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFRoZSAnJHtkZXBlbmRlbmN5fScgZm9yY2VkIGRlcGVuZGVuY3kgZG9lcyBub3QgZXhpc3QuYCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3VyY2VWZXJ0ZXhOYW1lID0gZGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGgsICAvLy9cbiAgICAgICAgICAgIHRhcmdldFZlcnRleE5hbWUgPSBkZXBlbmRlbnRTdWJEaXJlY3RvcnlQYXRoLCAvLy9cbiAgICAgICAgICAgIGRldkRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoRWRnZVByZXNlbnQgPSBkZXZEZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaC5pc0VkZ2VQcmVzZW50QnlTb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoRWRnZVByZXNlbnQgPSBkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaC5pc0VkZ2VQcmVzZW50QnlTb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKSxcbiAgICAgICAgICAgIGRldkRlcGVuZGVuY3lSZWxhdGlvblByZXNlbnQgPSBkZXZEZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaEVkZ2VQcmVzZW50LCAvLy9cbiAgICAgICAgICAgIGRlcGVuZGVuY3lSZWxhdGlvblByZXNlbnQgPSBkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaEVkZ2VQcmVzZW50OyAvLy9cblxuICAgICAgaWYgKGRlcGVuZGVuY3lSZWxhdGlvblByZXNlbnQpIHtcbiAgICAgICAgY29uc29sZS5sb2coYFRoZSAnJHtkZXBlbmRlbmN5fScgLT4gJyR7ZGVwZW5kZW50fScgZGVwZW5kZW5jeSByZWxhdGlvbiBpcyBwcmVzZW50IGFuZCB0aGVyZWZvcmUgY2Fubm90IGJlIGZvcmNlZC5gKTtcblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghZGV2RGVwZW5kZW5jeVJlbGF0aW9uUHJlc2VudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgVGhlICcke2RlcGVuZGVuY3l9JyAtPiAnJHtkZXBlbmRlbnR9JyBkZXZlbG9wZXIgZGVwZW5kZW5jeSByZWxhdGlvbiBpcyBub3QgcHJlc2VudCBhbmQgdGhlcmVmb3JlIGNhbm5vdCBiZSBmb3JjZWQuYCk7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaC5hZGRFZGdlQnlTb3VyY2VWZXJ0ZXhOYW1lQW5kVGFyZ2V0VmVydGV4TmFtZShzb3VyY2VWZXJ0ZXhOYW1lLCB0YXJnZXRWZXJ0ZXhOYW1lKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlbGVhc2VHcmFwaCA9IG5ldyBSZWxlYXNlR3JhcGgoZGVwZW5kZW5jeURpcmVjdGVkR3JhcGgsIGRldkRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoKTtcblxuICAgIHJldHVybiByZWxlYXNlR3JhcGg7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJSZWxlYXNlR3JhcGgiLCJkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaCIsImRldkRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoIiwiZ2V0RGVwZW5kZW5jeURpcmVjdGVkR3JhcGgiLCJnZXREZXZEZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaCIsImlzQ3ljbGljRGVwZW5kZW5jeVByZXNlbnQiLCJjeWNsZXNQcmVzZW50IiwiYXJlQ3ljbGVzUHJlc2VudCIsImN5Y2xpY0RlcGVuZGVuY3lQcmVzZW50IiwiaXNDeWNsaWNEZXZEZXBlbmRlbmN5UHJlc2VudCIsImN5Y2xpY0RldkRlcGVuZGVuY3lQcmVzZW50IiwiZ2V0Q3ljbGljRGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzIiwiZmlyc3RDeWNsZSIsImdldEZpcnN0Q3ljbGUiLCJ2ZXJ0ZXhOYW1lcyIsImdldFZlcnRleE5hbWVzIiwiY3ljbGljRGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzIiwiZ2V0Q3ljbGljRGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzIiwiY3ljbGljRGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzIiwiZ2V0T3JkZXJlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyIsImRlcGVuZGVuY3lEaXJlY3RlZEdyYXBoT3JkZXJlZFZlcnRleE5hbWVzIiwiZ2V0T3JkZXJlZFZlcnRleE5hbWVzIiwib3JkZXJlZERlcGVuZGVuY3lTdWJEaXJlY3RvcnlQYXRocyIsImdldE9yZGVyZWREZXZEZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aHMiLCJvcmRlcmVkRGV2RGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGhzIiwicmV0cmlldmVEZXBlbmRlbnRSZWxlYXNlcyIsInJlbGVhc2UiLCJyZWxlYXNlTWFwIiwic3ViRGlyZWN0b3J5UGF0aCIsImdldFN1YkRpcmVjdG9yeVBhdGgiLCJ2ZXJ0ZXhOYW1lIiwiaW1tZWRpYXRlU3VjY2Vzc29yVmVydGV4TmFtZXMiLCJnZXRJbW1lZGlhdGVTdWNjZXNzb3JWZXJ0ZXhOYW1lc0J5VmVydGV4TmFtZSIsImRlcGVuZGVudFN1YkRpcmVjdG9yeVBhdGhzIiwiZGVwZW5kZW50UmVsZWFzZXMiLCJtYXAiLCJkZXBlbmRlbnRTdWJEaXJlY3RvcnlQYXRoIiwiZGVwZW5kZW50UmVsZWFzZSIsInJldHJpZXZlUmVsZWFzZSIsInJldHJpZXZlRGV2RGVwZW5kZW50UmVsZWFzZXMiLCJkZXZEZXBlbmRlbnRTdWJEaXJlY3RvcnlQYXRocyIsImRldkRlcGVuZGVudFJlbGVhc2VzIiwiZGV2RGVwZW5kZW50U3ViRGlyZWN0b3J5UGF0aCIsImRldkRlcGVuZGVudFJlbGVhc2UiLCJmcm9tUmVsZWFzZU1hcFN1YkRpcmVjdG9yeU1hcEFuZEZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbnMiLCJzdWJEaXJlY3RvcnlNYXAiLCJmb3JjZWREZXBlbmRlbmN5UmVsYXRpb25zIiwiRGlyZWN0ZWRHcmFwaCIsImZyb21Ob3RoaW5nIiwicmVsZWFzZU5hbWVzIiwiZ2V0TmFtZXMiLCJzdWJEaXJlY3RvcnlQYXRocyIsImdldFN1YkRpcmVjdG9yeVBhdGhzIiwibmFtZVRvU3ViRGlyZWN0b3J5UGF0aE1hcCIsImdldE5hbWVUb1N1YkRpcmVjdG9yeVBhdGhNYXAiLCJhZGRWZXJ0ZXhlc0J5VmVydGV4TmFtZXMiLCJmb3JFYWNoIiwicmVsZWFzZURlcGVuZGVuY3lOYW1lcyIsImdldERlcGVuZGVuY3lOYW1lcyIsInJlbGVhc2VEZXZEZXBlbmRlbmN5TmFtZXMiLCJnZXREZXZEZXBlbmRlbmN5TmFtZXMiLCJyZWxlYXNlRGVwZW5kZW5jeU5hbWUiLCJyZWxlYXNlTmFtZXNJbmNsdWRlc1JlbGVhc2VEZXBlbmRlbmN5TmFtZSIsImluY2x1ZGVzIiwiZGVwZW5kZW5jeVN1YkRpcmVjdG9yeVBhdGgiLCJzb3VyY2VWZXJ0ZXhOYW1lIiwidGFyZ2V0VmVydGV4TmFtZSIsImFkZEVkZ2VCeVNvdXJjZVZlcnRleE5hbWVBbmRUYXJnZXRWZXJ0ZXhOYW1lIiwicmVsZWFzZURldkRlcGVuZGVuY3lOYW1lIiwicmVsZWFzZU5hbWVzSW5jbHVkZXNSZWxlYXNlRGV2RGVwZW5kZW5jeU5hbWUiLCJkZXZEZXBlbmRlbmN5U3ViRGlyZWN0b3J5UGF0aCIsImZvcmNlZERlcGVuZGVuY3lSZWxhdGlvbiIsImRlcGVuZGVudCIsImRlcGVuZGVudFN1YkRpcmVjdG9yeU5hbWUiLCJjb25zb2xlIiwibG9nIiwiZGVwZW5kZW5jeSIsImRlcGVuZGVuY3lTdWJEaXJlY3RvcnlOYW1lIiwiZGVwZW5kZW5jeVJlbGVhc2UiLCJkZXZEZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaEVkZ2VQcmVzZW50IiwiaXNFZGdlUHJlc2VudEJ5U291cmNlVmVydGV4TmFtZUFuZFRhcmdldFZlcnRleE5hbWUiLCJkZXBlbmRlbmN5RGlyZWN0ZWRHcmFwaEVkZ2VQcmVzZW50IiwiZGV2RGVwZW5kZW5jeVJlbGF0aW9uUHJlc2VudCIsImRlcGVuZGVuY3lSZWxhdGlvblByZXNlbnQiLCJyZWxlYXNlR3JhcGgiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O2VBSXFCQTs7O21DQUZTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVmLElBQUEsQUFBTUEsNkJBQU47YUFBTUEsYUFDUEMsdUJBQXVCLEVBQUVDLDBCQUEwQjtnQ0FENUNGO1FBRWpCLElBQUksQ0FBQ0MsdUJBQXVCLEdBQUdBO1FBQy9CLElBQUksQ0FBQ0MsMEJBQTBCLEdBQUdBOztrQkFIakJGOztZQU1uQkcsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLE9BQU8sSUFBSSxDQUFDRix1QkFBdUI7WUFDckM7OztZQUVBRyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsT0FBTyxJQUFJLENBQUNGLDBCQUEwQjtZQUN4Qzs7O1lBRUFHLEtBQUFBO21CQUFBQSxTQUFBQTtnQkFDRSxJQUFNQyxnQkFBZ0IsSUFBSSxDQUFDTCx1QkFBdUIsQ0FBQ00sZ0JBQWdCLElBQzdEQywwQkFBMEJGLGVBQWdCLEdBQUc7Z0JBRW5ELE9BQU9FO1lBQ1Q7OztZQUVBQyxLQUFBQTttQkFBQUEsU0FBQUE7Z0JBQ0UsSUFBTUgsZ0JBQWdCLElBQUksQ0FBQ0osMEJBQTBCLENBQUNLLGdCQUFnQixJQUNoRUcsNkJBQTZCSixlQUFnQixHQUFHO2dCQUV0RCxPQUFPSTtZQUNUOzs7WUFFQUMsS0FBQUE7bUJBQUFBLFNBQUFBO2dCQUNFLElBQU1DLGFBQWEsSUFBSSxDQUFDWCx1QkFBdUIsQ0FBQ1ksYUFBYSxJQUN2REMsY0FBY0Ys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