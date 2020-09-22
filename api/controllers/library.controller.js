const httpStatus = require('http-status');
const LibraryService = require('../services/library.service');

const responseHandler = (res) => (err, result) => {
  if (err) {
    return res.status(err.status).send(err.message);
  }

  res.status(httpStatus.OK).send(result);
};

exports.getBookList = (req, res) => {
  LibraryService.getBookList([], 0, responseHandler(res));
};

exports.addBook = (req, res) => {
  LibraryService.addBook(req.body.book, responseHandler(res));
};

exports.deleteBook = (req, res) => {
  LibraryService.deleteBook(req.body.book, responseHandler(res));
};

exports.updateBook = (req, res) => {
  LibraryService.updateBook(req.body.original_book, req.body.new_book, responseHandler(res));
};

exports.saveBookList = (req, res) => {
  LibraryService.saveBookList({}, 0, 0, responseHandler(res));
};
