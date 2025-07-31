const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); 

const {
  getProducts,
  getById,
  getByName,
  createProduct,
  deleteProduct,
  updateProduct,
  authorName,
  Testerror,
} = require("../controller/product.controller.js");


// ✅ Apply auth middleware to all routes in this router
router.use(authMiddleware);

// All routes below require JWT authentication
router.get("/", getProducts);
router.get("/:id", getById);
router.get("/name/:name", getByName);
router.post("/add", createProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/error/test", Testerror);
router.get("/abhi", authorName);

module.exports = router;
