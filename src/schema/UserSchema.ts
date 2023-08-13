import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { JobSchemaType } from "./JobSchema";
import Job from "../model/Job";

export const UserSchemaUsertype:GraphQLObjectType =new GraphQLObjectType({
    name:"UserSchemaUsertype",
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLID)},
        userName:{type:new GraphQLNonNull(GraphQLString)},
        email:{type:new GraphQLNonNull(GraphQLString)},
        password:{type:new GraphQLNonNull(GraphQLString)},
        jobs:{type:new GraphQLList(JobSchemaType),
            async resolve(parent){
                console.log(parent)
                return await Job.find({user:parent.id})
        }}
    }),
})