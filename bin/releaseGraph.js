'use strict';

const necessary = require('necessary');

const AcyclicGraph = require('./acyclicGraph');

const { arrayUtilities } = necessary,
      { filter } = arrayUtilities;

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
          dependentSubDirectoryPaths = successorVertexNames,  ///
          successorReleases = dependentSubDirectoryPaths.map((dependentSubDirectoryPath) => releaseMap.retrieveRelease(dependentSubDirectoryPath));

    return successorReleases;
  }

  static fromReleaseMap(releaseMap) {
    const acyclicGraph = AcyclicGraph.fromNothing(),
          names = releaseMap.getNames(),
          subDirectoryPaths = releaseMap.getSubDirectoryPaths(),
          nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(),
          vertexNames = subDirectoryPaths;  ///

    acyclicGraph.addVerticesByVertexNames(vertexNames);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = releaseMap.retrieveRelease(subDirectoryPath),
            dependencyMap = release.getDependencyMap(),
            dependencyNames = Object.keys(dependencyMap),
            devDependencyMap = release.getDevDependencyMap(),
            devDependencyNames = Object.keys(devDependencyMap);

      filter(dependencyNames, (dependencyName) => {
        const namesIncludesDependencyName = names.includes(dependencyName);

        if (namesIncludesDependencyName) {
          return true;
        }
      });

      filter(devDependencyNames, (devDependencyName) => {
        const namesIncludesDevDependencyName = names.includes(devDependencyName);

        if (namesIncludesDevDependencyName) {
          return true;
        }
      });

      dependencyNames.forEach((dependencyName) => {
        const dependencySubDirectoryPath = nameToSubDirectoryPathMap[dependencyName],
              sourceVertexName = dependencySubDirectoryPath,  ///
              targetVertexName = subDirectoryPath;  ///

        acyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      });

      devDependencyNames.forEach((devDependencyName) => {
        const devDependencySubDirectoryPath = nameToSubDirectoryPathMap[devDependencyName],
              sourceVertexName = devDependencySubDirectoryPath,  ///
              targetVertexName = subDirectoryPath;  ///

        acyclicGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      });
    });

    const releaseGraph = new ReleaseGraph(acyclicGraph);

    return releaseGraph;
  }
}

module.exports = ReleaseGraph;
