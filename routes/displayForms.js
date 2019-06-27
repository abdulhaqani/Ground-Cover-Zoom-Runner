/* eslint-disable eqeqeq */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

const handleError = (err, res) => {
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!');
};

const upload = multer({
  dest: './public/temp',
});

// body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

require('../models/DisplayForms');

const DisplayForms = mongoose.model('displayForms');

// DisplayForms index page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('displayForms/index');
  if (!fs.existsSync('./public/temp')) {
    fs.mkdirSync('./public/temp');
  }
});

// solar panel display form page
router.get('/solarpanel', ensureAuthenticated, (req, res) => {
  res.render('displayForms/solarpanel');
});

// greenhouse post request
router.post('/', ensureAuthenticated, upload.single('file'), (req, res) => {
  // if a file submitted, perform api call on the single file
  if (req.body.fileSubmit) console.log('file');
  res.redirect('/');
});

router.post(
  '/greenHouseFolder',
  ensureAuthenticated,
  upload.any('folder'),
  (req, res) => {
    if (req.body.folderSubmit) console.log('folder');
    res.redirect('/');
  }
);

// solarPanel post request
router.post(
  '/solarpanel',
  upload.single('file'),
  ensureAuthenticated,
  (req, res) => {
    // if a file submitted, perform api call on the single file
    if (req.body.fileSubmit) console.log('file');
    res.redirect('/');
  }
);

router.post(
  '/solarpanelFolder',
  ensureAuthenticated,
  upload.any('folder'),
  (req, res) => {
    if (req.body.folderSubmit) console.log('folder');
    res.redirect('/');
  }
);

module.exports = router;
