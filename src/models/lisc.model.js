const mongoose = require('mongoose');
const lisc = mongoose.Schema({
    email:{type:String,required:true},
    lisc:{type:String, required:true},
    token:{type:String},
    keystatus:{type:String, required:true},
    limit:{type:Number, required:true},
    used:{type:Number, required:true},
    chromeProfile:{type:Object,},
},{ timestamps: true })


const Lisc = mongoose.model('Lisc',lisc)

module.exports= Lisc;