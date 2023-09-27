const express = require('express');

const router = express.Router();

const messages = [
  {
    text: 'Hi there',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello world!',
    user: 'Charles',
    added: new Date(),
  },
];

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Mini Messageboard', messages });
});

router.post('/new', (req, res) => {
  const { messageText } = req.body;
  const { userName } = req.body;
  messages.push({ text: messageText, user: userName, added: new Date() });
  res.redirect('/');
});

module.exports = router;
