const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const get = (boardId, id) => tasksRepo.get(boardId, id);
const create = task => tasksRepo.create(task);
const update = (boardId, id, body) => tasksRepo.update(boardId, id, body);
const remove = (boardId, id) => tasksRepo.remove(boardId, id);

module.exports = { getAll, create, get, update, remove };
