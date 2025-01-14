const Lisc = require('../models/lisc.model');
const generateLicenseKey = require('../utils/lisckey');
const { generateToken, verifyToken } = require('../utils/token');
const createLisc= async(req,res,next)=>{

    const {name,email,product,message} =  req.body;
  
    const postingLisc = new Lisc ({ 
        email:req.body.email,
        lisc:generateLicenseKey(req.body.email),
        token:"null",
        keystatus:'fresh',
        chromeProfile:"null",
    })

    try{
      await postingLisc.save();
      return res.status(400).json({message:'success'})
    }
    catch(err){
        console.log(err)
        return res.status(400).json({message:'Unable to save the data'})
    }
  

    // return res.status(200).json({zone})

}


const createToken = async (req, res, next) => {
    try {
        console.log(req.body)
        // Find the document for the given email (use findOne to get a single document)
        const conts = await Lisc.findOne({ lisc:req.body.lkey,keystatus:'fresh' });

        // Check if the document was found
        if (!conts) {
            return res.status(404).json({ data: 'failed' });
        }

        // Generate the token using the 'lisc' field from the found document
        const token = generateToken(conts.lisc,req.body.id);

        // Add the token to the document object (you don't need to update the DB if you don't want to)
        conts.token = token;
        conts.keystatus='used'
        conts.chromeProfile=req.body.id
        await conts.save()
        .then(savedCont => {
            console.log('Document saved:', savedCont);
            res.status(200).json({ data: token });
        })
        .catch(error => {
            console.error('Error saving document:', error);
            res.status(500).json({ data: 'failed' });
        });
        // Optionally, if you want to save the token in the database:
        // await conts.save();
        // Return the updated data (including the token) to the client
      
    } catch (error) {
        console.log(error);
        return res.status(500).json({ data: 'failed' });
    }
};

const validateToken = async (req, res, next) => {
    try {
        console.log(req.body)

        var decoded =verifyToken(req.body.token)
        console.log(decoded)
        var lisckey=decoded.licenseKey

        
        // Find the document for the given email (use findOne to get a single document)
        const conts = await Lisc.findOne({ chromeProfile: req.body.id,token:req.body.token,lisc:lisckey });

        // Check if the```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````1 ```````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````````` document was found
        if (!conts) {
            return res.status(404).json({ data: 'failed' });
        }
        console.log('success')
        res.status(200).json({ data: 'mapsdata',linkstructure:'' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ data: 'failed' });
    }
};





const getAllLiscs=async(req,res,next)=>{
    let conts
    try {
       conts = await Lisc.find({})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({'message':'unable to get all the zones'})
    }
    res.status(200).json({data:conts})

}
module.exports ={
    createLisc,
    getAllLiscs,
    createToken,
    validateToken

}
