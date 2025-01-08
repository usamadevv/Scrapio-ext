const mongoose = require('mongoose')







const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Plan name is required'], 
  },
  email: {
    type: String,
    required: [true, 'Down Payment is required'], 
  }, 
  message: {
    type: String,
    required: [true, 'Allocation is required'], 
  }, 
  product: {
    type: String,
    required: [true, 'Possession is required'], 
  }

  , 



},{ timestamps: true });

// Create and export the model
const Contact = mongoose.model('Contact', contactSchema );

module.exports = Contact;