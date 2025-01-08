const express = require('express');
const {createAff, getAllAffs, login, validateaff, getaffinfo, incrementVisitor } = require('./aff.controller');
const { verifyAffToken } = require('../utils/token');
const affRouter = express.Router();
affRouter.post('/aff/add',createAff);
affRouter.post('/api/aff/login',login);

affRouter.post('/api/aff/addvisitor',incrementVisitor);
//affRouter.post('/aff/deletecont',deleteaff)
affRouter.post('/api/validateaff', verifyAffToken,validateaff);
affRouter.post('/api/aff/getuserinfo', verifyAffToken,getaffinfo);

affRouter.get('/aff/x09',getAllAffs)





module.exports = affRouter;