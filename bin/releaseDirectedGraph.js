'use strict';

const necessary = require('necessary'),
      directedGraphs = require('occam-directed-graphs');

const { DirectedGraph } = directedGraphs,
      { arrayUtilities } = necessary,
      { filter } = arrayUtilities;

class ReleaseDirectedGraph {
  constructor(directedGraph) {
    this.directedGraph = directedGraph;
  }

  static fromReleaseMap(releaseMap) {
    const directedGraph = DirectedGraph.fromNothing(),
          names = releaseMap.getNames(),
          subDirectoryPaths = releaseMap.getSubDirectoryPaths(),
          nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(),
          vertexNames = subDirectoryPaths;  ///

    directedGraph.addVerticesByVertexNames(vertexNames);

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

        directedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      });

      devDependencyNames.forEach((devDependencyName) => {
        const devDependencySubDirectoryPath = nameToSubDirectoryPathMap[devDependencyName],
              sourceVertexName = devDependencySubDirectoryPath,  ///
              targetVertexName = subDirectoryPath;  ///

        directedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      });
    });

    const releaseDirectedGraph = new ReleaseDirectedGraph(directedGraph);

    return releaseDirectedGraph;
  }
}

module.exports = ReleaseDirectedGraph;
