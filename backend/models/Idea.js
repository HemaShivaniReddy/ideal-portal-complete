import mongoose from 'mongoose';
const ideaSchema = new mongoose.Schema({
  title:{type:String,required:true},
  problemStatement:String, existingSolution:String, proposedSolution:String, expectedImpact:String,
  author:{type:mongoose.Schema.Types.ObjectId, ref:'User'}, status:{type:String, enum:['Born','PeerReview','ExpertReview','Accepted','OnHold','Rejected','InWork'], default:'Born'},
  likes:[{type:mongoose.Schema.Types.ObjectId, ref:'User'}],
  comments:[{user:{type:mongoose.Schema.Types.ObjectId, ref:'User'}, text:String, createdAt:Date}]
},{timestamps:true});
export default mongoose.model('Idea', ideaSchema);
