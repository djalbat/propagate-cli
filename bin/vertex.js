'use strict';

class Vertex {
  constructor(name, predecessorVertexes, successorVertexes) {
    this.name = name;

    this.successorVertexes = successorVertexes;
    this.predecessorVertexes = predecessorVertexes;
  }

  getName() {
    return this.name;
  }

  getSuccessorVertexes() {
    return this.successorVertexes;
  }

  getPredecessorVertexes() {
    return this.predecessorVertexes;
  }

  getSuccessorVertexNames() {
    const successorVertexNames = this.successorVertexes.map((successorVertex) => successorVertex.getName());

    return successorVertexNames;
  }

  addSuccessorVertex(successorVertex) {
    this.successorVertexes.push(successorVertex);
  }

  addPredecessorVertex(predecessorVertex) {
    this.predecessorVertexes.push(predecessorVertex);
  }

  static fromName(name) {
    const successorVertexes = [],
          predecessorVertexes = [],
          vertex = new Vertex(name, successorVertexes, predecessorVertexes);

    return vertex;
  }
}

module.exports = Vertex;
