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
  // send file to temp and rename it
  if (fs.existsSync(req.file.path)) {
    fs.rename(req.file.path, `./public/temp/${req.file.originalname}`, err => {
      if (err) console.log('err');
      else console.log('file name changed');
    });
  } else {
    console.log('does not exist');
  }
  res.redirect('/');
});

router.post(
  '/greenHouseFolder',
  ensureAuthenticated,
  upload.any('folder'),
  (req, res) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < req.files.length; i++) {
      if (fs.existsSync(req.files[i].path)) {
        fs.rename(
          req.files[i].path,
          `./public/temp/${req.files[i].originalname}`,
          err => {
            if (err) console.log('err');
            else console.log('file name changed');
          }
        );
      } else {
        console.log('does not exist');
      }
    }
    res.redirect('/');
  }
);

// solarPanel post request
router.post(
  '/solarpanel',
  upload.single('file'),
  ensureAuthenticated,
  (req, res) => {
    // send file to temp and rename it
    if (fs.existsSync(req.file.path)) {
      fs.rename(
        req.file.path,
        `./public/temp/${req.file.originalname}`,
        err => {
          if (err) console.log('err');
          else console.log('file name changed');
        }
      );
    } else {
      console.log('does not exist');
    }
    res.redirect('/');
  }
);

router.post(
  '/solarpanelFolder',
  ensureAuthenticated,
  upload.any('folder'),
  (req, res) => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < req.files.length; i++) {
      if (fs.existsSync(req.files[i].path)) {
        fs.rename(
          req.files[i].path,
          `./public/temp/${req.files[i].originalname}`,
          err => {
            if (err) console.log('err');
            else console.log('file name changed');
          }
        );
      } else {
        console.log('does not exist');
      }
    }
    res.redirect('/');
  }
);

module.exports = router;
