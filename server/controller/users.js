const User = require('../model/user');
const user = new User();


exports.getUsers = (req, res) => User.find({}, (err, data) => {
  if (err) {
    return user.sendError(res, { status: 422, details: 'Cannot retrieve users' });
  }
  
  return res.status(200).json(data);

});

exports.registerUser = (req, res) => {
  
  const { name, userId, password } = req.body;


  if (!name || !userId || !password) {
    return user.sendError(res, { status: 422, details: 'Missing properties of users' });
  }

  User.findOne({ userId }, (err, existingUser) => {
    if (err) {
      return user.sendError(res, { status: 422, details: 'DB error' });
    }

    if (existingUser) {
      return user.sendError(res, { status: 422, details: 'User already registered please login' });
    }

    const newUser = new User({ name, password, userId });

    newUser.save((err, createdUser) => {
      if (err) {
        return user.sendError(res, { status: 422, details: 'DB error' });
      }
      return res.status(200).json({ message: `User created` });

    });
  });
}

exports.loginUser = (req, res) => {
  
  const { userId, password } = req.body;

  if (!userId || !password) {
    return user.sendError(res, { status: 422, details: 'Missing properties of users' });
  }

  User.findOne({ userId }, (err, existingUser) => {

    if (err) {
      return user.sendError(res, { status: 422, details: 'DB Error' });
    }

    if (!existingUser) {
      return user.sendError(res, { status: 422, details: 'User is not registered. Please register to login' });
    }

    if (existingUser.hasSamePassword(password)) {
      return res.status(200).json({ message: 'successfull login' });
    }
    return res.status(422).json([{ title: 'User Error', details: 'Invalid password' }]);

  });
}
