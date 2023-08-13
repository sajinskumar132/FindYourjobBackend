import { Schema,model } from "mongoose";

const UserSchema=new Schema({
    userName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,minLength:6},
    jobs:[{type:Schema.Types.ObjectId,ref:'Job'}]
})

export default model("User",UserSchema)