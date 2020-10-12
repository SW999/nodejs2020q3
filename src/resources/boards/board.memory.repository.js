const DB = require('../../common/inMemoryDB');

const getAll = async () => await DB.getAllBoards();

const get = async id => {
  const board = await DB.getBoard(id);

  if (!board) {
    throw new Error();
  }

  return board;
};

const create = async board => await DB.createBoard(board);

const update = async (id, board) => {
  const _board = await DB.updateBoard(id, board);

  if (!_board) {
    throw new Error();
  }

  return _board;
};

const remove = async id => {
  const res = await DB.removeBoard(id);
  if (!res) {
    throw new Error();
  }

  return res;
};

module.exports = { getAll, get, create, update, remove };
