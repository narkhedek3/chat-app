const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  userId: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.methods.sendError = function (res, config) {
  const { status, details } = config;
  return res
    .status(status)
    .send({ errors: [{ title: 'User Error', message: details }] });
}

userSchema.methods.hasSamePassword = function (providedPassword) {
  return bcrypt.compareSync(providedPassword, this.password);
}

// to trigger function before saveing model
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });

});


module.exports = mongoose.model('User', userSchema);