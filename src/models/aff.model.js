const mongoose = require('mongoose')







const AffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Plan name is required'],
    },
    uniquevisitors: {
        type: Number,
    },
    affpaymentstatus: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Down Payment is required'],
    },
    password: {
        type: String,
        required: [true, 'Allocation is required'],
    },
    link: {
        type: String,
        required: [true, 'Possession is required'],
    },

    phone: {
        type: String,
        required: [true, 'Possession is required'],
    },

    commission: {
        type: String,
        required: [true, 'Possession is required'],
    },

    affid: {
        type: String,
        required: [true, 'Possession is required'],
    },



}, { timestamps: true });

// Create and export the model
const Aff = mongoose.model('Aff', AffSchema);

module.exports = Aff;