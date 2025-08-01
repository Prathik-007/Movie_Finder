import mongoose from 'mongoose';
const connectDB = async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected:${conn.connection.host}`);
    }catch(error){
        console.error(`MongoDB error:${error.message}`);
        process.exit(1);
    }
};

export default connectDB;