const router = require("express").Router();

//const { protect, authorize } = require("../middleware/auth");

const {
   getAllProducts,
  addProducts,
  updateProducts,
  deleteProducts,
  
} = require('../controller/products');


router.get('/products',  getAllProducts);
router.post('/products',  addProducts);
router.patch('/products/:products_id',  updateProducts);
router.delete('/products/:products_id', deleteProducts);
 
module.exports= router;

