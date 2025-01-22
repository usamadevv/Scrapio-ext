const express = require('express');
const { orderInitiate, confirmOrder, getAllorders } = require('./order.controller');
const { verifyAffToken } = require('../utils/token');
const orderRouter = express.Router();
orderRouter.post('/api/order/initiate',orderInitiate);
orderRouter.post('/api/order/confirm',confirmOrder);
//orderRouter.post('/api/aff/login',login);
//orderRouter.post('/aff/deletecont',deleteaff)
//orderRouter.post('/api/validateaff', verifyAffToken,validateaff);
//orderRouter.post('/api/aff/getuserinfo', verifyAffToken,validateaff);
orderRouter.get('/order/x09',getAllorders)





module.exports = orderRouter;