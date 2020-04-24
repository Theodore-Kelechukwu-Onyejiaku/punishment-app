const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const punishmentSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Punishment = mongoose.model('Punishment', punishmentSchema);

module.exports = Punishment;