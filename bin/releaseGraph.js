'use strict';

const AcyclicGraph = require('./acyclicGraph');

class ReleaseGraph {
  constructor(acyclicGraph) {
    this.acyclicGraph = acyclicGraph;
  }

  getAcyclicGraph() {
    return this.acyclicGraph;
  }

  retrieveSuccessorReleases(release, releaseMap) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          vertexName = subDirectoryPath,  ///
          vertex = this.acyclicGraph.findVertexByVertexName(vertexName),
          successorVertexNames = vertex.getSuccessorVertexNames(),
          successorSubDirectoryPaths = successorVertexNames,  ///
          successorReleases = successorSubDirectoryPaths.map((successorSubDirectoryPath) => releaseMap.retrieveRelease(successorSubDirectoryPath));

    return successorReleases;
  }

  static fromReleaseMap(releaseMap) {
    const acyclicGraph = AcyclicGraph.fromNothing(),
          releaseNames = releaseMap.getNames(),
          subDirectoryPaths = releaseMap.getSubDirectoryPaths(),
          nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(),
          vertexNames = subDirectoryPaths;  ///

    acyclicGraph.addVerticesByVertexNames(vertexNames);

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

        acyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      });
    });

    const releaseGraph = new ReleaseGraph(acyclicGraph);

    return releaseGraph;
  }
}

module.exports = ReleaseGraph;

