import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name:String, email:{type:String,unique:true}, password:String, role:{type:String,enum:['admin','manager','user','expert'],default:'user'}, points:{type:Number,default:0}, otp:String, otpExpires:Date
},{timestamps:true});
export default mongoose.model('User', userSchema);
