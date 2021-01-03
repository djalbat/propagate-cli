"use strict";

const directedGraphs = require("occam-directed-graphs");

const { DirectedGraph } = directedGraphs;

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

  getCyclicDependencySubDirectoryNames() {
    const firstCycle = this.dependencyDirectedGraph.getFirstCycle(),
          vertexNames = firstCycle.getVertexNames(),
          cyclicDependencySubDirectoryNames = vertexNames;  ///

    return cyclicDependencySubDirectoryNames;
  }

  getCyclicDevDependencySubDirectoryNames() {
    const firstCycle = this.devDependencyDirectedGraph.getFirstCycle(),
          vertexNames = firstCycle.getVertexNames(),
          cyclicDevDependencySubDirectoryNames = vertexNames;  ///

    return cyclicDevDependencySubDirectoryNames;
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

  static fromReleaseMap(releaseMap) {
    const dependencyDirectedGraph = DirectedGraph.fromNothing(),
          devDependencyDirectedGraph = DirectedGraph.fromNothing(),
          releaseNames = releaseMap.getNames(),
          subDirectoryPaths = releaseMap.getSubDirectoryPaths(),
          nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(),
          vertexNames = subDirectoryPaths;  ///

    dependencyDirectedGraph.addVerticesByVertexNames(vertexNames);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = releaseMap.retrieveRelease(subDirectoryPath),
            releaseDependencyNames = release.getDependencyNames();

      releaseDependencyNames.forEach((releaseDependencyName) => {
        const releaseNamesIncludesReleaseDependencyName = releaseNames.includes(releaseDependencyName);

        if (releaseNamesIncludesReleaseDependencyName) {
          const dependencySubDirectoryPath = nameToSubDirectoryPathMap[releaseDependencyName],
                sourceVertexName = dependencySubDirectoryPath,  ///
                targetVertexName = subDirectoryPath;  ///

          dependencyDirectedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
        }
      });
    });

    devDependencyDirectedGraph.addVerticesByVertexNames(vertexNames);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = releaseMap.retrieveRelease(subDirectoryPath),
            releaseDevDependencyNames = release.getDevDependencyNames();

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

    const releaseGraph = new ReleaseGraph(dependencyDirectedGraph, devDependencyDirectedGraph);

    return releaseGraph;
  }
}

module.exports = ReleaseGraph;

