const express = require ("express");
const router = express.Router();
const {getProducts , getById, getByName , createProduct , deleteProduct ,updateProduct ,authorName} = require('../controller/product.controller.js')

router.get('/', getProducts);
router.get('/api/product/:id', getById);
router.get('/api/product/name', getByName);
router.post('/api/product',createProduct);
router.delete('/:id' , deleteProduct);
router.put('/:id',updateProduct);
router.get('/abhi',authorName);   // route will be {{base_url}}api/products/abhi
 


module.exports = router ;