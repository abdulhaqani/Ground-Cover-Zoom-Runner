/* eslint-disable eqeqeq */
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');

const router = express.Router();
const { ensureAuthenticated } = require('../helpers/auth');

// body parser middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

require('../models/DisplayForms');

const DisplayForms = mongoose.model('displayForms');

// DisplayForms index page
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('displayForms/index');
});

// solar panel display form page
router.get('/solarpanel', ensureAuthenticated, (req, res) => {
  res.render('displayForms/solarpanel');
});

// greenhouse post request
router.post('/', ensureAuthenticated, (req, res) => {
  let fileSource = '';
  let fileDest = '';
  if (fileName != '') {
    // create the destination folder depending on the req.body
    if (req.body.greenHouse) {
      fileSource = path.join(
        __dirname,
        `./../public/greenHouseImages/${fileName}`
      );
      fileDest = path.join(
        __dirname,
        `./../public/greenHousePresent/${fileName}`
      );
    } else {
      fileSource = path.join(
        __dirname,
        `./../public/greenHouseImages/${fileName}`
      );
      fileDest = path.join(__dirname, `./../public/noGreenHouse/${fileName}`);
    }
    // copy the file to the destination folder
    fs.copyFileSync(fileSource, fileDest, err => {
      if (err) return console.error(err);
      console.log('success');
    });
    // remove file from the origin folder
    fsExtra.remove(fileSource, err => {
      if (!err) {
        // classify image in mongodb
        if (req.body.greenHouse) {
          const newClassification = {
            FileName: fileName,
            Classified: true,
            SolarPanel: false,
            GreenHouse: true,
          };
          new DisplayForms(newClassification)
            .save()
            .then(() => {
              req.flash('success_msg', 'greenhouse image classified');
              res.redirect('/displayForms');
            })
            .catch(err => {
              throw err;
            });
        } else {
          const newClassification = {
            FileName: fileName,
            Classified: true,
            SolarPanel: false,
            GreenHouse: false,
          };
          new DisplayForms(newClassification)
            .save()
            .then(() => {
              req.flash('success_msg', 'no greenhouse image classified');
              res.redirect('/displayForms');
            })
            .catch(err => {
              throw err;
            });
        }
      }
    });
  } else {
    // if no images left then redirect
    req.flash('error_msg', 'No Images left');
    res.redirect('/');
  }
});

// solarPanel post request
router.post('/solarpanel', ensureAuthenticated, (req, res) => {
  let fileSource = '';
  let fileDest = '';
  console.log(req.body.solarPanel);
  if (fileName != '') {
    // create the destination folder depending on the req.body
    if (req.body.solarPanel) {
      fileSource = path.join(
        __dirname,
        `./../public/solarPanelImages/${fileName}`
      );
      fileDest = path.join(
        __dirname,
        `./../public/solarPanelPresent/${fileName}`
      );
    } else {
      fileSource = path.join(
        __dirname,
        `./../public/solarPanelImages/${fileName}`
      );
      fileDest = path.join(__dirname, `./../public/noSolarPanel/${fileName}`);
    }
    // copy file to destination folder
    fs.copyFileSync(fileSource, fileDest, err => {
      if (err) return console.error(err);
      console.log('success');
    });
    // remove file from origin folder
    fsExtra.remove(fileSource, err => {
      if (!err) {
        // mongodb classification
        if (req.body.solarPanel) {
          const newClassification = {
            FileName: fileName,
            Classified: true,
            SolarPanel: true,
            GreenHouse: false,
          };
          new DisplayForms(newClassification)
            .save()
            .then(() => {
              req.flash('success_msg', 'Solar Panel image classified');
              res.redirect('/displayForms/solarpanel');
            })
            .catch(err => {
              throw err;
            });
        } else {
          const newClassification = {
            FileName: fileName,
            Classified: true,
            SolarPanel: false,
            GreenHouse: false,
          };
          new DisplayForms(newClassification)
            .save()
            .then(() => {
              req.flash('success_msg', 'no Solar Panel image classified');
              res.redirect('/displayForms/solarpanel');
            })
            .catch(err => {
              throw err;
            });
        }
      }
    });
  } else {
    // if no images left then redirect
    req.flash('error_msg', 'No Images left');

    res.redirect('/');
  }
});

module.exports = router;
