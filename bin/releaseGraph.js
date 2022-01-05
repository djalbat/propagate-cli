"use strict";

const { DirectedGraph } = require("occam-directed-graphs");

class ReleaseGraph {
  constructor(dependencyDirectedGraph, devDependencyDirectedGraph) {
    this.dependencyDirectedGraph = dependencyDirectedGraph;
    this.devDependencyDirectedGraph = devDependencyDirectedGraph;
  }

  getDependencyDirectedGraph() {
    return this.dependencyDirectedGraph;
  }

  getDevDependencyDirectedGraph() {
    return this.devDependencyDirectedGraph;
  }

  isCyclicDependencyPresent() {
    const cyclesPresent = this.dependencyDirectedGraph.areCyclesPresent(),
          cyclicDependencyPresent = cyclesPresent;  ///

    return cyclicDependencyPresent;
  }

  isCyclicDevDependencyPresent() {
    const cyclesPresent = this.devDependencyDirectedGraph.areCyclesPresent(),
          cyclicDevDependencyPresent = cyclesPresent;  ///

    return cyclicDevDependencyPresent;
  }

  getCyclicDependencySubDirectoryPaths() {
    const firstCycle = this.dependencyDirectedGraph.getFirstCycle(),
          vertexNames = firstCycle.getVertexNames(),
          cyclicDependencySubDirectoryPaths = vertexNames;  ///

    return cyclicDependencySubDirectoryPaths;
  }

  getCyclicDevDependencySubDirectoryPaths() {
    const firstCycle = this.devDependencyDirectedGraph.getFirstCycle(),
          vertexNames = firstCycle.getVertexNames(),
          cyclicDevDependencySubDirectoryPaths = vertexNames;  ///

    return cyclicDevDependencySubDirectoryPaths;
  }

  getOrderedDependencySubDirectoryPaths() {
    const dependencyDirectedGraphOrderedVertexNames = this.dependencyDirectedGraph.getOrderedVertexNames(),
          orderedDependencySubDirectoryPaths = dependencyDirectedGraphOrderedVertexNames; ///

    return orderedDependencySubDirectoryPaths;
  }

  getOrderedDevDependencySubDirectoryPaths() {
    const dependencyDirectedGraphOrderedVertexNames = this.devDependencyDirectedGraph.getOrderedVertexNames(),
          orderedDevDependencySubDirectoryPaths = dependencyDirectedGraphOrderedVertexNames; ///

    return orderedDevDependencySubDirectoryPaths;
  }

  retrieveDependentReleases(release, releaseMap) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          vertexName = subDirectoryPath,  ///
          immediateSuccessorVertexNames = this.dependencyDirectedGraph.getImmediateSuccessorVertexNamesByVertexName(vertexName),
          dependentSubDirectoryPaths = immediateSuccessorVertexNames,
          dependentReleases = dependentSubDirectoryPaths.map((dependentSubDirectoryPath) => {
            const dependentRelease = releaseMap.retrieveRelease(dependentSubDirectoryPath);

            return dependentRelease;
          });

    return dependentReleases;
  }

  retrieveDevDependentReleases(release, releaseMap) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          vertexName = subDirectoryPath,  ///
          immediateSuccessorVertexNames = this.devDependencyDirectedGraph.getImmediateSuccessorVertexNamesByVertexName(vertexName),
          devDependentSubDirectoryPaths = immediateSuccessorVertexNames,
          devDependentReleases = devDependentSubDirectoryPaths.map((devDependentSubDirectoryPath) => {
            const devDependentRelease = releaseMap.retrieveRelease(devDependentSubDirectoryPath);

            return devDependentRelease;
          });

    return devDependentReleases;
  }

  static fromReleaseMapSubDirectoryMapAndForcedDependencyRelations(releaseMap, subDirectoryMap, forcedDependencyRelations) {
    const dependencyDirectedGraph = DirectedGraph.fromNothing(),
          devDependencyDirectedGraph = DirectedGraph.fromNothing(),
          releaseNames = releaseMap.getNames(),
          subDirectoryPaths = releaseMap.getSubDirectoryPaths(),
          nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(),
          vertexNames = subDirectoryPaths;  ///

    dependencyDirectedGraph.addVerticesByVertexNames(vertexNames);

    devDependencyDirectedGraph.addVerticesByVertexNames(vertexNames);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = releaseMap.retrieveRelease(subDirectoryPath),
            releaseDependencyNames = release.getDependencyNames(),
            releaseDevDependencyNames = release.getDevDependencyNames();

      releaseDependencyNames.forEach((releaseDependencyName) => {
        const releaseNamesIncludesReleaseDependencyName = releaseNames.includes(releaseDependencyName);

        if (releaseNamesIncludesReleaseDependencyName) {
          const dependencySubDirectoryPath = nameToSubDirectoryPathMap[releaseDependencyName],
                sourceVertexName = dependencySubDirectoryPath,  ///
                targetVertexName = subDirectoryPath;  ///

          dependencyDirectedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
        }
      });

      releaseDevDependencyNames.forEach((releaseDevDependencyName) => {
        const releaseNamesIncludesReleaseDevDependencyName = releaseNames.includes(releaseDevDependencyName);

        if (releaseNamesIncludesReleaseDevDependencyName) {
          const devDependencySubDirectoryPath = nameToSubDirectoryPathMap[releaseDevDependencyName],
                sourceVertexName = devDependencySubDirectoryPath,  ///
                targetVertexName = subDirectoryPath;  ///

          devDependencyDirectedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
        }
      });
    });

    forcedDependencyRelations.forEach((forcedDependencyRelation) => {
      const { dependent } = forcedDependencyRelation,
            dependentSubDirectoryName = dependent, //
            dependentSubDirectoryPath = subDirectoryMap[dependentSubDirectoryName], ///
            dependentRelease = releaseMap.retrieveRelease(dependentSubDirectoryPath);

      if (dependentRelease === null) {
        console.log(`The '${dependent}' forced dependent does not exist.`);

        process.exit(1);
      }

      const { dependency } = forcedDependencyRelation,
            dependencySubDirectoryName = dependency,  ///
            dependencySubDirectoryPath = subDirectoryMap[dependencySubDirectoryName],  ///
            dependencyRelease = releaseMap.retrieveRelease(dependencySubDirectoryPath);

      if (dependencyRelease === null) {
        console.log(`The '${dependency}' forced dependency does not exist.`);

        process.exit(1);
      }

      const sourceVertexName = dependencySubDirectoryPath,  ///
            targetVertexName = dependentSubDirectoryPath;  ///

      const dependencyDirectedGraphEdgePresent = dependencyDirectedGraph.isEdgePresentByVertexNames(sourceVertexName, targetVertexName),
            dependencyRelationPresent = dependencyDirectedGraphEdgePresent; ///

      if (dependencyRelationPresent) {
        console.log(`The '${dependency}' -> '${dependent}' dependency relation is present and therefore cannot be forced.`);

        process.exit(1);
      }

      const devDependencyDirectedGraphEdgePresent = devDependencyDirectedGraph.isEdgePresentByVertexNames(sourceVertexName, targetVertexName),
            devDependencyRelationPresent = devDependencyDirectedGraphEdgePresent; ///

      if (!devDependencyRelationPresent) {
        console.log(`The '${dependency}' -> '${dependent}' developer dependency relation is not present and therefore cannot be forced.`);

        process.exit(1);
      }

      if (dependencyRelease) {
        dependencyDirectedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      }
    });

    const releaseGraph = new ReleaseGraph(dependencyDirectedGraph, devDependencyDirectedGraph);

    return releaseGraph;
  }
}

module.exports = ReleaseGraph;
