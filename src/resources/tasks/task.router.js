const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);

  res.json(tasks.map(Task.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  const task = await tasksService
    .get(req.params.boardId, req.params.id)
    .catch(err => {
      if (res.headersSent) {
        return next(err);
      }
      res
        .status(404)
        .send({ error: `Task with id '${req.params.id}' was not found!` });
    });

  res.json(Task.toResponse(task));
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({ ...req.body, boardId: req.params.boardId })
  );

  res.json(Task.toResponse(task));
});

router.route('/:id').put(async (req, res, next) => {
  const task = await tasksService
    .update(req.params.boardId, req.params.id, req.body)
    .catch(err => {
      if (res.headersSent) {
        return next(err);
      }
      res
        .status(400)
        .send({ error: `Task with id '${req.params.id}' was not found!` });
    });

  res.json(Task.toResponse(task));
});

router.route('/:id').delete(async (req, res, next) => {
  const result = await tasksService
    .remove(req.params.boardId, req.params.id)
    .catch(err => {
      if (res.headersSent) {
        return next(err);
      }
      res.status(404).send({ error: 'Task not found' });
    });

  if (result) {
    res.status(204).send('The task has been deleted');
  }
});

module.exports = router;
