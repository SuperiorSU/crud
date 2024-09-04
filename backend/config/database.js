const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async (req,res) =>{
    try{
        await mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log('Database connected successfully')
        })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:'Database connection failed'
        })
    }
}

module.exports = dbConnect;