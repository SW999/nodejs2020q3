const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  const board = await boardsService.get(req.params.id).catch(err => {
    if (res.headersSent) {
      return next(err);
    }
    res
      .status(404)
      .send({ error: `Board with id '${req.params.id}' was not found!` });
  });

  res.json(Board.toResponse(board));
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(new Board({ ...req.body }));

  res.json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res, next) => {
  const board = await boardsService
    .update(req.params.id, req.body)
    .catch(err => {
      if (res.headersSent) {
        return next(err);
      }
      res
        .status(400)
        .send({ error: `Board with id '${req.params.id}' was not found!` });
    });

  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res, next) => {
  const result = await boardsService.remove(req.params.id).catch(err => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(404).send({ error: 'Board not found' });
  });

  if (result) {
    res.status(204).send('The board has been deleted');
  }
});

module.exports = router;
