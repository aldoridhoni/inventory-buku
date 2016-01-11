'use strict';
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Author = mongoose.model('Author');
const Book = mongoose.model('Book');

router.get('/', function(req, res) {
  Author.find({}).populate('books').exec(function(err, pengarang) {
    if (err) throw err;
    res.render('author_list', {title: 'Daftar Pengarang', authors: pengarang})
  });
});

router.get('/create', function(req, res) {
  if (req.query._popup == '1') {
    res.render('author_create_popup', {layout: false});
  } else {
    res.render('author_create', {title: 'Tambah Pengarang', referrer: req.header('Referrer')});
  };
});

router.post('/create', function(req, res) {
  var name = req.body.name;
  var referrer = req.body.referrer;
  var pengarang = new Author({name: name});
  pengarang.save(function(err) {
    if (err) throw err;
  });
  if (req.xhr) {
    res.send('ok')
  } else {
    res.redirect( referrer || '/author');
  }
});

router.get('/:author_id([0-9a-z]+)/destroy', function(req, res) {
  Author.findOneAndRemove({ _id: req.params.author_id}, function(err, find) {
    if (err) throw err;
    console.log(find)
  });
  res.redirect('/author');
});

// Change author
router.get('/:author_id([0-9a-z]+)/change', function(req, res) {
    Author.findOne({ _id: req.params.author_id }).exec(function(err, pengarang) {
        if (err) throw err;
        res.render('author_create', { title: 'Ubah pengarang', data: pengarang });
    });
});

router.post('/:author_id([0-9a-z]+)/change', function(req, res) {
    var update = req.body;
    Author.findOneAndUpdate({ _id: req.params.author_id }, update).exec(function (err) {
        if (err) throw err;
        else res.redirect('/author');
    });
});

module.exports = router;
