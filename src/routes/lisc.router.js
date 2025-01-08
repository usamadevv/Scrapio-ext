const express = require('express');
const {createLisc, getAllLiscs, createToken, validateToken} = require('./lisc.controller')
const liscRouter = express.Router();
//&liscRouter.post('/lisc/add',createLisc);
liscRouter.post('/lisc/validatelisc',createToken)
liscRouter.post('/lisc/validatetoken',validateToken)
//liscRouter.post('/lisc/deletecont',deletelisc)

//&liscRouter.get('/lisc/x09',getAllLiscs)





module.exports = liscRouter;