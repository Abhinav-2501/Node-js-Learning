const express = require("express");
const router = express.Router();
const {
  getProducts,
  getById,
  getByName,
  createProduct,
  deleteProduct,
  updateProduct,
  authorName,
  Testerror
} = require('../controller/product.controller.js');

// Routes using the controller methods that have error handling
router.get('/', getProducts);
router.get('/:id', getById);
router.get('/name/:name', getByName);
router.post('/add', createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', updateProduct);
router.get('/error/test', Testerror); // Use the controller method instead of inline function
router.get('/abhi', authorName);

module.exports = router;