const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Board name',
    columns = [
      { title: 'TODO', order: 1 },
      { title: 'In progress', order: 2 }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    if (!board) return;
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
