const Product = require('../models/product.model.js');
const asyncHandler = require('express-async-handler');

// Using consistent error handling across all controllers
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error(`Product with id ${id} not found`);
  }
  res.status(200).json(product);
});

const getByName = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const products = await Product.find({ name });
  res.status(200).json(products);
});

const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error(`Product with id ${id} not found`);
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    message: `Product '${product.name}' deleted successfully.`,
    deletedProduct: product
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  if (!product) {
    res.status(404);
    throw new Error(`Product with id ${id} not found`);
  }
  res.status(200).json(product);
});

const authorName = (req, res) => {
  res.send("Hello this is my Abhinav");
};

const Testerror = asyncHandler(async (req, res) => {
  throw new Error('This is a test error');
});

module.exports = {
  getProducts,
  getById,
  getByName,
  createProduct,
  deleteProduct,
  updateProduct,
  authorName,
  Testerror
};