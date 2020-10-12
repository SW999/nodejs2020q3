const DB = require('../../common/inMemoryDB');

const getAll = async id => await DB.getAllTasks(id);

const get = async (boardId, id) => {
  const task = await DB.getTask(boardId, id);

  if (!task) {
    throw new Error();
  }

  return task;
};

const create = async task => await DB.createTask(task);

const update = async (boardId, id, body) => {
  const _task = await DB.updateTask(boardId, id, body);

  if (!_task) {
    throw new Error();
  }

  return _task;
};

const remove = async (boardId, id) => {
  const res = await DB.removeTask(boardId, id);
  if (!res) {
    throw new Error();
  }

  return res;
};

module.exports = { getAll, create, get, update, remove };
