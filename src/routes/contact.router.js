const express = require('express');
const {createContact, getAllContacts} = require('./contact.controller')
const contactRouter = express.Router();
contactRouter.post('/contact/add',createContact);
contactRouter.get('/contact/x09',getAllContacts)
//contactRouter.post('/contact/deletecont',deleteContact)






module.exports = contactRouter;