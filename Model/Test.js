const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  name: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

const Testme = mongoose.model('testme', TestSchema);

module.exports = Testme;
