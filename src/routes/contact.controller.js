const Contact = require('../models/contact.model');
const generateLicenseKey = require('../utils/lisckey');
const createContact= async(req,res,next)=>{

    const {name,email,product,message} =  req.body;
  
    const postingContact = new Contact ({ 
        name:name,
        email:email,
        product:product,
        message:message,
    })

    try{
        await postingContact.save();

      return res.status(400).json({message:'success'})

    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:'Unable to save the data'})
    }
  

    // return res.status(200).json({zone})

}






const getAllContacts=async(req,res,next)=>{
    let conts
    try {
       conts = await Contact.find({})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({'message':'unable to get all the zones'})
    }
  generateLicenseKey('sdsd')
    res.status(200).json({data:conts})

}
module.exports ={
    createContact,
    getAllContacts

}
