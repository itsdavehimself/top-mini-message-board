const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const router = express.Router();

const uri = process.env.SERVER_URL;

const client = new MongoClient(uri);

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

router.get('/', async (req, res, next) => {
  try {
    const messagesCollection = client.db('mini_message_board').collection('messages');
    const messages = await messagesCollection.find({}).toArray();

    res.render('index', { title: 'Mini Messageboard', messages });
  } catch (err) {
    console.error('Error:', err);
    next(err);
  }
});

router.post('/new', async (req, res) => {
  const { messageText } = req.body;
  const { userName } = req.body;
  const messagesCollection = client.db('mini_message_board').collection('messages');
  await messagesCollection.insertOne({ text: messageText, user: userName, added: new Date() });

  res.redirect('/');
});

module.exports = router;
