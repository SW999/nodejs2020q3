const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = [];

DB.push({ type: 'user', data: [new User(), new User()] });
DB.push({ type: 'board', data: [new Board(), new Board()] });
DB.push({ type: 'task', data: [new Task(), new Task()] });

const USERS = DB.find(item => item.type === 'user').data;
const BOARDS = DB.find(item => item.type === 'board').data;
const TASKS = DB.find(item => item.type === 'task').data;

// Task
const getAllTasks = async id => [...TASKS.filter(el => el.boardId === id)];

const createTask = async task => {
  TASKS.push(task);
  return task;
};

const getTask = async (boardId, id) =>
  TASKS.filter(el => el.boardId === boardId && el.id === id)[0];

const updateTask = async (boardId, id, body) => {
  const index = TASKS.findIndex(el => el.id === id);

  if (index > -1 && TASKS[index].boardId === boardId) {
    TASKS[index] = { ...TASKS[index], ...body };
  }

  return index < 0 || TASKS[index].boardId !== boardId
    ? undefined
    : TASKS[index];
};

const removeTask = async (boardId, id) => {
  const index = TASKS.findIndex(el => el.id === id);
  if (index > -1 && TASKS[index].boardId === boardId) {
    TASKS.splice(index, 1);
  }

  return index > -1 && TASKS[index].boardId === boardId;
};

const getUserTaskIds = async userId => {
  return [...TASKS.filter(el => el.userId === userId)].map(el => el.id);
};

// User
const getAllUsers = async () => [...USERS];

const getUser = async id => USERS.filter(el => el.id === id)[0];

const createUser = async user => {
  USERS.push(user);
  return user;
};

const updateUser = async (id, user) => {
  const index = USERS.findIndex(el => el.id === id);

  if (index > -1) {
    USERS[index] = { ...USERS[index], ...user };
  }

  return index < 0 ? undefined : USERS[index];
};

const removeUser = async id => {
  const index = USERS.findIndex(el => el.id === id);
  if (index > -1) {
    USERS.splice(index, 1);

    const userTaskIds = await getUserTaskIds(id);
    userTaskIds.map(async taskId => {
      const ind = TASKS.findIndex(el => el.id === taskId);
      TASKS[ind] = { ...TASKS[ind], userId: null };
    });
  }

  return index > -1;
};

// Board
const getAllBoards = async () => [...BOARDS];

const getBoard = async id => BOARDS.filter(el => el.id === id)[0];

const createBoard = async board => {
  BOARDS.push(board);
  return board;
};

const updateBoard = async (id, board) => {
  const index = BOARDS.findIndex(el => el.id === id);

  if (index > -1) {
    BOARDS[index] = { ...BOARDS[index], ...board };
  }

  return index < 0 ? undefined : BOARDS[index];
};

const removeBoard = async id => {
  const index = BOARDS.findIndex(el => el.id === id);
  if (index > -1) {
    BOARDS.splice(index, 1);
    const tasks = await getAllTasks(id);

    [...tasks].map(task => {
      const ind = TASKS.findIndex(el => el.id === task.id);
      TASKS.splice(ind, 1);
    });
  }

  return index > -1;
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  removeUser,
  getAllBoards,
  getBoard,
  createBoard,
  updateBoard,
  removeBoard,
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  removeTask
};
