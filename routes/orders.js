const express = require('express');
const OrderService = require('../services/orderService');

const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        const validatedOrder = OrderService.validateAndTransformOrder(req.body);
        res.status(200).json(validatedOrder);
    } catch (error) {
        error.status = 400;
        next(error);
    }
});

module.exports = router;
