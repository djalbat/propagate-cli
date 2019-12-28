'use strict';

const directedGraphs = require('occam-directed-graphs');

const { DirectedGraph } = directedGraphs;

class ReleaseGraph {
  constructor(directedGraph) {
    this.directedGraph = directedGraph;
  }

  getDirectedGraph() {
    return this.directedGraph;
  }

  areCyclesPresent() { return this.directedGraph.areCyclesPresent(); }

  getCyclicSubDirectoryNames() {
    const firstCycle = this.directedGraph.getFirstCycle(),
          vertexNames = firstCycle.getVertexNames(),
          cyclicSubDirectoryNames = vertexNames;  ///

    return cyclicSubDirectoryNames;
  }

  retrieveSuccessorReleases(release, releaseMap) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          vertexName = subDirectoryPath,  ///
          successorVertexNames = this.directedGraph.getSuccessorVertexNamesByVertexName(vertexName),
          successorSubDirectoryPaths = successorVertexNames,  ///
          successorReleases = successorSubDirectoryPaths.map((successorSubDirectoryPath) => releaseMap.retrieveRelease(successorSubDirectoryPath));

    return successorReleases;
  }

  static fromReleaseMap(releaseMap) {
    const directedGraph = DirectedGraph.fromNothing(),
          releaseNames = releaseMap.getNames(),
          subDirectoryPaths = releaseMap.getSubDirectoryPaths(),
          nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(),
          vertexNames = subDirectoryPaths;  ///

    directedGraph.addVerticesByVertexNames(vertexNames);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = releaseMap.retrieveRelease(subDirectoryPath),
            dependencyNames = release.getDependencyNames(),
            devDependencyNames = release.getDevDependencyNames(),
            predecessorNames = [
              ...dependencyNames,
              ...devDependencyNames
            ],
            predecessorReleaseNames = predecessorNames.filter((predecessorName) => {
              const releaseNamesIncludesPredecessorName = releaseNames.includes(predecessorName);

              if (releaseNamesIncludesPredecessorName) {
                return true;
              }
            });

      predecessorReleaseNames.forEach((predecessorReleaseName) => {
        const predecessorReleaseSubDirectoryPath = nameToSubDirectoryPathMap[predecessorReleaseName],
              sourceVertexName = predecessorReleaseSubDirectoryPath,  ///
              targetVertexName = subDirectoryPath;  ///

        directedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      });
    });

    const releaseGraph = new ReleaseGraph(directedGraph);

    return releaseGraph;
  }
}

module.exports = ReleaseGraph;

