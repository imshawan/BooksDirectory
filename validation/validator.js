const { check } = require('express-validator');

exports.validateData = [
  check('title').not().isEmpty(),
  check('author').not().isEmpty(),
  check('link').not().isEmpty(),
  check('origin').not().isEmpty(),
  check('language').not().isEmpty(),
  check('year').not().isEmpty(),
  check('pages').not().isEmpty(),
]