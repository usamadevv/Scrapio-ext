const Aff = require('../models/aff.model');
const Order = require('../models/order.model');
const { affToken } = require('../utils/token');
const createAff= async(req,res,next)=>{


  
    const postingAff = new Aff (req.body)

    try{
      await postingAff.save();
      return res.status(200).json({message:'success'})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:'Unable to save the data'})
    }
  

    // return res.status(200).json({zone})

}


const login=async(req,res,next)=>{
    console.log(req.body)
    let conts
    try {
       conts = await Aff.findOne({email:req.body.email,password:req.body.pass})
       const payload = {
        userId: conts._id,  // Include any other data you want in the token
        email: conts.email,
        name: conts.name,  // Assuming you have a 'name' field
    };

        var token=affToken(payload)
        return res.status(200).json({'token':token})

    } catch (error) {
        console.log(error)
        return res.status(404).json({'message':'invalid'})
    }
    res.status(200).json({data:conts})

}
const incrementVisitor = async (req, res, next) => {
    console.log(req.body);
    console.log('inccremented')
    let conts;
    try {
      // Update the unique visitors count
      conts = await Aff.findOneAndUpdate(
        { affid: req.body.affid },
        { $inc: { uniquevisitors: 1 } },
        { new: true } // This ensures the updated document is returned
      );
  
      if (!conts) {
        return res.status(404).json({ message: 'Affiliate not found' });
      }
  
      // Generate the token (assuming you have a function `affToken`)
      const token = affToken({ affid: req.body.affid });
  
      // Send the token and other relevant data in the response
      return res.status(200).json({ token: token, data: conts });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Unable to update the visitor count' });
    }
  };
  

const validateaff = async (req, res, next) => {
    try {
      console.log('valid');
      // Do your processing here, if needed
      return res.status(200).json({ 'data': 'valid' }); // This is the final response
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ 'message': 'unable to get all the zones' });
    }
  };
const getaffinfo=async(req,res,next)=>{
   
    console.log(req.body)
    let conts
    let orders
    try {

       conts = await Aff.findOne({_id:req.body.userId})
       orders= await Order.find({aff_id:conts.affid}).select('commamount uniquevisitors orderamount product orderstatus createdAt')


      console.log(conts)
      console.log(orders)

        return res.status(200).json({'token':conts,'sales':orders})

    } catch (error) {
        console.log(error)
        return res.status(500).json({'message':'unable to get all the zones'})
    }
    res.status(200).json({data:conts})

}


const getAllAffs=async(req,res,next)=>{
    let conts
    try {
       conts = await Aff.find({})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({'message':'unable to get all the zones'})
    }
    res.status(200).json({data:conts})

}
module.exports ={
    createAff,
    getAllAffs,
    login,
    validateaff,
    getaffinfo,
    incrementVisitor

}
