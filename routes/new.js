const express = require('express');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('new', { title: 'New Post' });
});

module.exports = router;
