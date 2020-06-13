const Message = require('../model/message');

exports.getMessages = (req, res) => Message.find({}, (err, data) => {
  
  if (err) {
    return Message.sendError(res, { status: 422, details: 'Cannot retrieve messages' });
  }

  return res.status(200).json(data);
});

exports.getFriends = (req, res) => {
  
  
  const { userId } = req.params;

  Message.find({ from: userId }, (err, data) => {
    if (err) {
      return Message.sendError(res, { status: 422, details: 'Cannot retrieve friends' });
    }
    
    return res.status(200).json(data);

  });

}


exports.getMessagesByUserIds = (req, res) => {
  
  
  const { userId1 } = req.params;
  const { userId2 } = req.params;

  Message.find({ from: userId1, to: userId2 }, (err, data) => {
    if (err) {
      return Message.sendError(res, { status: 422, details: 'Cannot retrieve messages' });
    }

    return res.status(200).json(data);

  });
}

exports.createMessage = (messageBody,socket) => {
  const newMessage = new Message(messageBody);
  newMessage.save((err, createdRental) => {
    if (err) {
      return Message.sendError(res, { status: 422, details: 'Cannot create message' });
    }
    return socket.broadcast.emit(messageBody['to'], messageBody);
  });

}

exports.deleteMessages = (req, res) => {
  
  
  Message.remove({}, (err) => {
    if (err) {
      return Message.sendError(res, { status: 422, details: 'Cannot delete messages' });
    }

    res.status.json({ message: 'all messages are deleted' });

  })
}