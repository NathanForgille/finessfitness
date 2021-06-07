const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: 'Everybody has a type...',
      },
      name: {
        type: String,
        trim: true,
        required: 'Who you did',
      },
      duration: {
        type: Number,
        required: 'How long you did... it',
      },
      weight: {
        type: Number,
      },
      reps: {
        type: Number,
      },
      sets: {
        type: Number,
      },
      distance: {
        type: Number,
      },
    },
  ],
});

const Fitness = mongoose.model('fitness', fitnessSchema);

module.exports = Fitness;