const adminController = require('../controllers/admin');
const express = require('express');
const router = express.Router();




router.post('/add-product', adminController.postAddProduct);  
router.get('/products', adminController.getAllProducts);  
router.delete('/delete/:productId', adminController.postDeleteProduct);  

router.get('/getById/:productId',adminController.getById)

router.put('/edit-products/:productId',adminController.updateProduct)





router.post('/cart/:id/:productId/:quantity', adminController.postCartItems);

router.get('/getcart',adminController.getCart)

router.get('/cartitemDel',adminController.delete)

router.delete('/deletecart/:id/:productId', adminController.delete);

router.post('/cart/:id/:productId/:quantity', adminController.postQtyItems);


module.exports = router;
