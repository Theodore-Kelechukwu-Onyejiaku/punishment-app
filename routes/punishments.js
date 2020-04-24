const router = require('express').Router();
let Punishment = require('../models/punishment.model');

router.route('/').get((req, res) => {
  Punishment.find()
    .then(punishments => res.json(punishments))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newPunishment = new Punishment({
    username,
    description,
    duration,
    date,
  });

  newPunishment.save()
  .then(() => res.json('Punishment added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Punishment.findById(req.params.id)
    .then(punishment => res.json(punishment))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Punishment.findByIdAndDelete(req.params.id)
    .then(() => res.json('Punishment deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Punishment.findById(req.params.id)
    .then(punishment => {
      punishment.username = req.body.username;
      punishment.description = req.body.description;
      punishment.duration = Number(req.body.duration);
      punishment.date = Date.parse(req.body.date);

      punishment.save()
        .then(() => res.json('Punishment updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;