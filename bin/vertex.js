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
    const successorVertexName = successorVertex.getName(),
          successorVertexNames = this.getSuccessorVertexNames(),
          successorVertexNamesIncludesSuccessorVertexName = successorVertexNames.includes(successorVertexName);

    if (!successorVertexNamesIncludesSuccessorVertexName) {
      this.successorVertexes.push(successorVertex);
    }
  }

  addPredecessorVertex(predecessorVertex) {
    const predecessorVertexName = predecessorVertex.getName(),
          predecessorVertexNames = this.getSuccessorVertexNames(),
          predecessorVertexNamesIncludesPredecessorVertexName = predecessorVertexNames.includes(predecessorVertexName);

    if (!predecessorVertexNamesIncludesPredecessorVertexName) {
      this.predecessorVertexes.push(predecessorVertex);
    }
  }

  static fromName(name) {
    const successorVertexes = [],
          predecessorVertexes = [],
          vertex = new Vertex(name, successorVertexes, predecessorVertexes);

    return vertex;
  }
}

module.exports = Vertex;
