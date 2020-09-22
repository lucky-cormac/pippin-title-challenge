const express = require('express');
const libraryController = require('../../controllers/library.controller');
const router = express.Router();

router
  .route('/')
  .get(libraryController.getBookList)
  .post(libraryController.addBook)
  .patch(libraryController.updateBook)
  .put(libraryController.saveBookList)
  .delete(libraryController.deleteBook);

module.exports = router;
