import mongoose ,{Schema}from "mongoose";
const usersSchema:Schema=new Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    age:{type:Number,required:true},
    blocked:{type:Boolean,default:false},
    active:{type:Boolean,default:true},
    password:{type:String,required:true}
})

export default mongoose.model("users",usersSchema);