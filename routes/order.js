const orderController = require('../controllers/order');
const express = require('express');
const router = express.Router();

router.post('/order/:id', orderController.postOrders);  
router.get('/order', orderController.getOrders);
router.get('/order/:id', orderController.getUserOrders);

router.delete('/order/:id', orderController.cancelOrders);
router.put('/order/:id/:sit', orderController.situation);

module.exports= router;
