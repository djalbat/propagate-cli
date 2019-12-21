'use strict';

const Vertex = require('./vertex');

class AcyclicGraph {
  constructor(vertexes) {
    this.vertexes = vertexes;
  }

  findVertexByVertexName(vertexName) {
    const vertex = this.vertexes.find((vertex) => {
      const name = vertex.getName();

      if (name === vertexName) {
        return true;
      }
    }) || null; ///

    return vertex;
  }

  addEdgeByVertexNames(sourceVertexName, targetVertexName) {
    const sourceVertex = this.addVertexByVertexName(sourceVertexName),
          targetVertex = this.addVertexByVertexName(targetVertexName),
          successorVertex = targetVertex, ///
          predecessorVertex = sourceVertex; ///

    sourceVertex.addSuccessorVertex(successorVertex);

    targetVertex.addPredecessorVertex(predecessorVertex);
  }

  addVertexByVertexName(vertexName) {
    let vertex = this.findVertexByVertexName(vertexName);

    if (vertex === null) {
      const name = vertexName;  ///

      vertex = Vertex.fromName(name);

      this.vertexes.push(vertex);
    }

    return vertex;
  }

  addVerticesByVertexNames(vertexNames) {
    vertexNames.forEach((vertexName) => this.addVertexByVertexName(vertexName));
  }

  static fromNothing() {
    const vertices = [],
          acyclicGraph = new AcyclicGraph(vertices);

    return acyclicGraph;
  }
}

module.exports = AcyclicGraph;
