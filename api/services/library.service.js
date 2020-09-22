const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

const Library = [];

const getBookList = (list, index, callback) => {
  if (index >= Library.length) {
    return callback(null, list.join(','));
  }

  getBookList([...list, Library[index]], index + 1, callback);
};

const addBook = (title, callback) => {
  if (Library.includes(title)) {
    return callback(new APIError('Duplicated book!', httpStatus.BAD_REQUEST));
  }

  Library.push(title);
  callback(null);
};

const deleteBook = (title, callback) => {
  if (!Library.includes(title)) {
    return callback(new APIError('Book not found!', httpStatus.NOT_FOUND));
  }

  Library.splice(Library.indexOf(title), 1);
  callback(null);
};

const updateBook = (originalBook, newBook, callback) => {
  if (!Library.includes(originalBook)) {
    return callback(new APIError('Book not found!', httpStatus.NOT_FOUND));
  }

  if (Library.includes(newBook)) {
    return callback(new APIError('Duplicated book!', httpStatus.BAD_REQUEST));
  }

  Library[Library.indexOf(originalBook)] = newBook;
  callback(null);
};

const saveItemOnDatabase = (name, callback) => {
  const delay = Math.round(Math.random() * name.length * 10);
  setTimeout(() => callback(delay), delay);
};

const saveBookList = (result, index, accDelay, callback) => {
  if (index >= Library.length) {
    return callback(null, result);
  }

  const currentBook = Library[index];
  saveItemOnDatabase(currentBook, (delay) => {
    const newResult = {
      ...result,
      [currentBook]: accDelay + delay,
    };
    saveBookList(newResult, index + 1, accDelay + delay, callback);
  });
};

module.exports = {
  getBookList,
  addBook,
  deleteBook,
  updateBook,
  saveBookList,
};
