import { GraphQLID, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { UserSchemaUsertype } from "./UserSchema";
import User from '../model/User'
export const JobSchemaType:GraphQLObjectType=new GraphQLObjectType({
    name:"JobSchemaType",
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLID)},
        companyName:{type:new GraphQLNonNull(GraphQLString)},
        CompanyLocation:{type:new GraphQLNonNull(GraphQLString)},
        JobRole:{type:new GraphQLNonNull(GraphQLString)},
        PostingDate:{type:new GraphQLNonNull(GraphQLString)},
        JobType:{type:new GraphQLNonNull(GraphQLString)},
        Experience:{type:new GraphQLNonNull(GraphQLString)},
        JobDescription:{type:new GraphQLNonNull(GraphQLString)},
        HrEmail:{type:new GraphQLNonNull(GraphQLString)},
        user:{type:UserSchemaUsertype,
            async resolve(parent){
                return await User.findById(parent.user)
            }
        }
    })
})
