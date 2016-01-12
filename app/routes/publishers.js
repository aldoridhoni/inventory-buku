'use strict';
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Publisher = mongoose.model('Publisher');
const Book = mongoose.model('Book');

router.get('/', function(req, res) {
  Publisher.find({}).populate('books').exec(function(err, penerbit) {
    if (err) throw err;
    res.render('publisher_list', {title: 'Daftar Penerbit', publisher: penerbit})
  });
});

router.get('/create', function(req, res) {
  if (req.query._popup == '1') {
    res.render('publisher_create_popup', {title: 'Tambah Penerbit', layout: false});
  } else {
    res.render('publisher_create', {title: 'Tambah Penerbit', referrer: req.header('Referrer')});
  };
});

router.post('/create', function(req, res) {
  var name = req.body.name;
  var alamat = req.body.alamat;
  var kota = req.body.kota;
  var referrer = req.body.referrer;
  var penerbit = new Publisher({name: name, alamat: alamat, kota: kota});
  penerbit.save(function(err, data) {
    if (err) throw err;
    if (req.xhr) {
      res.send(data.id)
    } else {
      res.redirect( referrer || '/publisher');
    }
  });
  
});

router.get('/:publisher_id([0-9a-z]+)/destroy', function(req, res) {
  Publisher.findOneAndRemove({ _id: req.params.publisher_id}, function(err, find) {
    if (err) throw err;
  });
  res.redirect('/publisher');
});

// Change Publisher
router.get('/:publisher_id([0-9a-z]+)/change', function(req, res) {
    Publisher.findOne({ _id: req.params.publisher_id }).exec(function(err, penerbit) {
        if (err) throw err;
        res.render('publisher_create', { title: 'Ubah Penerbit', data: penerbit });
    });
});

router.post('/:publisher_id([0-9a-z]+)/change', function(req, res) {
    var update = req.body;
    Publisher.findOneAndUpdate({ _id: req.params.publisher_id }, update).exec(function(err) {
        if (err) throw err;
        else res.redirect('/publisher');
    });
});
 
module.exports = router;
