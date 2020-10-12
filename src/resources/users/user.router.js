const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res, next) => {
  const user = await usersService.get(req.params.id).catch(err => {
    if (res.headersSent) {
      return next(err);
    }
    res
      .status(404)
      .send({ error: `User with id '${req.params.id}' was not found!` });
  });

  res.json(User.toResponse(user));
});

router.route('/').post(async (req, res) => {
  const user = await usersService.create(new User({ ...req.body }));

  res.json(User.toResponse(user));
});

router.route('/:id').put(async (req, res, next) => {
  const user = await usersService.update(req.params.id, req.body).catch(err => {
    if (res.headersSent) {
      return next(err);
    }
    res
      .status(400)
      .send({ error: `User with id '${req.params.id}' was not found!` });
  });

  res.json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res, next) => {
  const result = await usersService.remove(req.params.id).catch(err => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(404).send({ error: 'User not found' });
  });

  if (result) {
    res.status(204).send('The user has been deleted');
  }
});

module.exports = router;
