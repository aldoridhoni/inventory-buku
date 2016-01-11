'use strict';
const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Book = mongoose.model('Book');
const Author = mongoose.model('Author');
const Publisher = mongoose.model('Publisher');

// Main Books List
router.get('/', function(req, res) {
    var populate_query = [{path:'_author', select:'name'}, {path:'_publisher', select:'name'}]
    Book.find({}).populate(populate_query).exec(function(err, buku) {
        if (err) throw err;
        console.log(buku);
        res.render('book_list', { data: buku });
    });
});

// Detail Book
router.get('/:book_id([0-9]+)', function(req, res) {
});

// Create new book
router.get('/create', function(req, res) {
    Author.find({}, function(err, pengarang){
        if (err) throw err;
        Publisher.find({}, function(err, penerbit){
          if (err) throw err;
          res.render('book_create', { title: 'Buku Baru', _author: pengarang, _publisher: penerbit });
        });
    });
});

router.post('/create', function(req, res) {
    console.log(req.body);
    var buku = new Book(req.body);
    buku.save(function (err){
        if (err) console.log(err);
    });
    res.redirect('/book');
});

// Change book
router.get('/:book_id([0-9a-z]+)/change', function(req, res) {
    var populate_query = [{path:'_author', select:'name'}, {path:'_publisher', select:'name'}]
    Book.findOne({ _id: req.params.book_id }).populate(populate_query).exec(function(err, buku) {
      if (err) throw err;
      Author.find({}, function(err, pengarang){
        Publisher.find({}, function(err, penerbit){
          if (err) throw err;
          res.render('book_create', { title: 'Ubah Buku', data: buku, _author: pengarang, _publisher: penerbit });
        });
      });
  });
});

router.post('/:book_id([0-9a-z]+)/change', function(req, res) {
  var update = req.body;
  Book.findOneAndUpdate({ _id: req.params.book_id }, update).populate('_author', '_publisher').exec(function (err) {
    if (err) throw err;
    else res.redirect('/book');
  });
});

// Delete book
router.get('/:book_id([0-9a-z]+)/destroy', function(req, res) {
    //Book.find().remove({ _id: req.params.book_id}, function(err, find) {
    Book.findOneAndRemove({ _id: req.params.book_id}, function(err, find) {
      if (err) throw err;
      console.log(find)
    });
    res.redirect('/book');
});


module.exports = router;
