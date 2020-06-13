const express = require('express');
const router = express.Router();

const {
  getUsers,
  registerUser,
  loginUser
} = require('../controller/users');


router.get('', getUsers);

router.post('/login',loginUser);

router.post('/register',registerUser);

module.exports = router;