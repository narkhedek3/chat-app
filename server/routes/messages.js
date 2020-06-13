const express = require('express');
const router = express.Router();

const {
  createMessage,
  deleteMessages,
  getFriends,
  getMessages,
  getMessagesByUserIds
} = require('../controller/messages');


router.get('', getMessages);

router.get('/:userId', getFriends);

router.get('/:userId1/:userId2', getMessagesByUserIds);

router.post('', createMessage);

router.delete('', deleteMessages);

module.exports = router;
