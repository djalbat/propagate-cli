"use strict";

const directedGraphs = require("occam-directed-graphs");

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

  getTopologicallyOrderedSubDirectoryNames() {
    const topologicallyOrderedVertexNames = this.directedGraph.getTopologicallyOrderedVertexNames(),
          topologicallyOrderedSubDirectoryNames = topologicallyOrderedVertexNames;  ///

    return topologicallyOrderedSubDirectoryNames;
  }

  retrieveImmediateSuccessorReleases(release, releaseMap) {
    const subDirectoryPath = release.getSubDirectoryPath(),
          vertexName = subDirectoryPath,  ///
          immediateSuccessorVertexNames = this.directedGraph.getImmediateSuccessorVertexNamesByVertexName(vertexName),
          immediateSuccessorSubDirectoryPaths = immediateSuccessorVertexNames,  ///
          immediateSuccessorReleases = immediateSuccessorSubDirectoryPaths.map((immediateSuccessorSubDirectoryPath) => {
            const immediateSuccessorRelease = releaseMap.retrieveRelease(immediateSuccessorSubDirectoryPath);

            return immediateSuccessorRelease;
          });

    return immediateSuccessorReleases;
  }

  static fromReleaseMap(releaseMap) {
    const directedGraph = DirectedGraph.fromNothing(),
          releaseNames = releaseMap.getNames(),
          subDirectoryPaths = releaseMap.getSubDirectoryPaths(),
          nameToSubDirectoryPathMap = releaseMap.getNameToSubDirectoryPathMap(),
          vertexNames = subDirectoryPaths;

    directedGraph.addVerticesByVertexNames(vertexNames);

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = releaseMap.retrieveRelease(subDirectoryPath),
            dependencyNames = release.getDependencyNames(),
            devDependencyNames = release.getDevDependencyNames(),
            immediatePredecessorVertexNames = [
              ...dependencyNames,
              ...devDependencyNames
            ],
            immediatePredecessorReleaseNames = immediatePredecessorVertexNames.filter((immediatePredecessorVertexName) => {
              const releaseNamesIncludesPredecessorName = releaseNames.includes(immediatePredecessorVertexName);

              if (releaseNamesIncludesPredecessorName) {
                return true;
              }
            });

      immediatePredecessorReleaseNames.forEach((immediatePredecessorReleaseName) => {
        const immediatePredecessorReleaseSubDirectoryPath = nameToSubDirectoryPathMap[immediatePredecessorReleaseName],
              sourceVertexName = immediatePredecessorReleaseSubDirectoryPath,  ///
              targetVertexName = subDirectoryPath;  ///

        directedGraph.addEdgeByVertexNames(sourceVertexName, targetVertexName);
      });
    });

    subDirectoryPaths.forEach((subDirectoryPath) => {
      const release = releaseMap.retrieveRelease(subDirectoryPath);

      if (release !== null) {
        const vertexName = subDirectoryPath,  ///
              dependencyNames = release.getDependencyNames(),
              dependencySubDirectoryPaths = [];

        dependencyNames.forEach((dependencyName) => {
          const dependencySubDirectoryPath = nameToSubDirectoryPathMap[dependencyName] || null;

          if (dependencySubDirectoryPath !== null) {
            dependencySubDirectoryPaths.push(dependencySubDirectoryPath);
          }
        });

        const includeCyclicEdges = true,
              immediatePredecessorVertexNames = directedGraph.getImmediatePredecessorVertexNamesByVertexName(vertexName, includeCyclicEdges),
              dependencyPresent = dependencySubDirectoryPaths.some((dependencySubDirectoryPath) => {
                const immediatePredecessorVertexNamesIncludesDependencySubDirectoryPath = immediatePredecessorVertexNames.includes(dependencySubDirectoryPath);

                if (immediatePredecessorVertexNamesIncludesDependencySubDirectoryPath) {
                  return true;
                }
              });

        if (!dependencyPresent) {
          const releaseSubDirectoryPath = release.getSubDirectoryPath(),
                sourceVertexName = releaseSubDirectoryPath; ///

          directedGraph.removeEdgesBySourceVertexName(sourceVertexName);
        }
      }
    });

    const releaseGraph = new ReleaseGraph(directedGraph);

    return releaseGraph;
  }
}

module.exports = ReleaseGraph;

