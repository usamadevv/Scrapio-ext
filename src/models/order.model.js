const mongoose = require('mongoose');
const order = mongoose.Schema({
    product: { type: String, required: true },
    commamount: { type: String, required: true },
    orderamount: { type: String },
    orderstatus: { type: String, required: true },
    paymentstatus: { type: String, required: true },
    affpaymentstatus: { type: String, required: true },
    aff_id: { type: Object, required: true },
    trid: { type: String, required: true },
    customer: { type: String, },
    customeremail: { type: String},
    customerphone: { type: String},
    customercountry: { type: String},
    paymentpayload: { type: Object, required: true },

}, { timestamps: true })


const Order = mongoose.model('Order', order)

module.exports = Order;