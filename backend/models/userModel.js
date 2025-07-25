import mongoose from 'mongoose';

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{ type: String, required: true },
    bookings:[
        {
            movie: String,
            date:String,
            time: String,
        },
    ],
});

const User=mongoose.model('User',userSchema);
export default User;