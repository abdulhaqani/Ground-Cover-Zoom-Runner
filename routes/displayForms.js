/* eslint-disable eqeqeq */
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');

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

// DisplayForms index page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('displayForms/index');
});

// solar panel display form page
router.get('/solarpanel', ensureAuthenticated, (req, res) => {
  res.render('displayForms/solarpanel');
});

// greenhouse post request
router.post('/', ensureAuthenticated, upload.single('file'), (req, res) => {
  // single upload post request

  // req.file.path,
  // `./public/temp/${req.file.originalname}`,

  // set variable to image data
  // perform api call with variable as param
  res.redirect('/');
});

router.post(
  '/greenHouseFolder',
  ensureAuthenticated,
  upload.any('folder'),
  (req, res) => {
    // upload Folder post request
    for (let i = 0; i < req.files.length; i += 1) {
      // fs.existsSync(req.files[i].path
      // `./public/temp/${req.files[i].originalname}`
    }
    // set variable to image data
    // perform api call with variable as param
    res.redirect('/');
  }
);

// solarPanel post request
router.post(
  '/solarpanel',
  upload.single('file'),
  ensureAuthenticated,
  (req, res) => {
    // single upload post request

    // req.file.path,
    // `./public/temp/${req.file.originalname}`,

    // set variable to image data
    // perform api call with variable as param
    res.redirect('/');
  }
);

router.post(
  '/solarpanelFolder',
  ensureAuthenticated,
  upload.any('folder'),
  (req, res) => {
    // upload Folder post request
    for (let i = 0; i < req.files.length; i += 1) {
      // fs.existsSync(req.files[i].path
      // `./public/temp/${req.files[i].originalname}`
    }
    // set variable to image data
    // perform api call with variable as param
    res.redirect('/');
  }
);

module.exports = router;
