const mongoose = require('mongoose')

const connectDB =async ()=>{
    try{
        // mongo
        const conc = await mongoose.connect(process.env.MONGO_URI)
        // redis
        
        // console.log(`mongo connected ${conc.connection.host}`);
    }catch(err){
        console.log(err); 
    } 
}
module.exports = connectDB 