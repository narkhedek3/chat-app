const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  message: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});


// rental model functions
messageSchema.methods.sendError = function (res, config) {
  const { status, details } = config;
  return res
    .status(status)
    .send({ errors: [{ title: 'Message Error', message: details }] });
}


module.exports = mongoose.model('Message', messageSchema);