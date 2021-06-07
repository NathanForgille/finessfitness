const router = require('express').Router();
const Fitness = require('../models/fitness.js');

router.post('/api/fitness', (req, res) => {
  Fitness.create({})
    .then((dbFiness) => {
      res.json(dbFiness);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/api/fitness/:id', ({ body, params }, res) => {
  Fitness.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    // "runValidators" will ensure new exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then((dbFiness) => {
      res.json(dbFiness);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/api/fitness', (req, res) => {
  Fitness.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then((dbFiness) => {
      res.json(dbFiness);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get('/api/fitness/range', (req, res) => {
  Fitness.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((dbFiness) => {
      console.log(dbFiness);
      res.json(dbFiness);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/api/fitness', ({ body }, res) => {
  Fitness.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;