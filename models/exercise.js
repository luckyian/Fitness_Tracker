const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: "Exercise Name is Required"
  },

  type: {
    type: String,
    required: true
  },

  weight: {
    type: Number,
  },

  sets: Number,

  reps: Number,

  duration: Number,

  distance: Number
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;