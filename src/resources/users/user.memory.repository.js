const DB = require('../../common/inMemoryDB');

const getAll = async () => await DB.getAllUsers();

const get = async id => {
  const user = await DB.getUser(id);

  if (!user) {
    throw new Error();
  }

  return user;
};

const create = async user => await DB.createUser(user);

const update = async (id, user) => {
  const _user = await DB.updateUser(id, user);

  if (!_user) {
    throw new Error();
  }

  return _user;
};

const remove = async id => {
  const res = await DB.removeUser(id);
  if (!res) {
    throw new Error();
  }

  return res;
};

module.exports = { getAll, get, create, update, remove };
