import { Schema,model } from "mongoose";

const jobSchema=new Schema({
    companyName:{type:String,required:true},
    CompanyLocation:{type:String,required:true},
    JobRole:{type:String,required:true},
    PostingDate:{type:String,required:true},
    JobType:{type:String,required:true},
    Experience:{type:String,required:true},
    JobDescription:{type:String,required:true},
    HrEmail:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:"User"}
})

export default model("Job",jobSchema)