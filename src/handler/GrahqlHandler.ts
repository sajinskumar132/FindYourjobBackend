import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { UserSchemaUsertype } from "../schema/UserSchema";
import User from "../model/User";
import { compareSync, hashSync } from "bcryptjs"
import { JobSchemaType } from "../schema/JobSchema";
import Job from "../model/Job";
import { Document, startSession } from "mongoose";
const RootQuery = new GraphQLObjectType({
    name: "RootQueRy",
    fields: {
        //Get User Details
        users: {
            type: new GraphQLList(UserSchemaUsertype),
            async resolve() {
                return await User.find()
            }
        },
        jobs: {
            type: new GraphQLList(JobSchemaType),
            async resolve() {
                return await Job.find()
            }
        },
        user: {
            type: UserSchemaUsertype,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            async resolve(parent, { id }) {
                return await User.findById(id).populate('jobs')
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "mutation",
    fields: {
        signUp: {
            type: UserSchemaUsertype,
            args: {
                userName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, { userName, email, password }) {
                try {
                    let existingUser = await User.findOne({ email: email })
                    if (existingUser) return new Error("User already exists")
                    const encryptPassword = hashSync(password)
                    const NewUser = new User({ userName: userName, email: email, password: encryptPassword })
                    return await NewUser.save()
                } catch (error) {
                    console.log(error)
                    return new Error("User SignUp failed.Try again")
                }
            }
        },
        login: {
            type: UserSchemaUsertype,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, { email, password }) {
                try {
                    let existingUser = await User.findOne({ email: email })
                    if (!existingUser) return new Error(`User not available with this email '${email}'`)
                    const DecryptPassword = compareSync(password, existingUser.password)
                    if (!DecryptPassword) return new Error("Wrong Password")
                    return existingUser
                } catch (error) {
                    console.log(error)
                    return new Error("Login failed")
                }
            }
        },
        addNewJob: {
            type: JobSchemaType,
            args: {
                user: { type: new GraphQLNonNull(GraphQLID) },
                companyName: { type: new GraphQLNonNull(GraphQLString) },
                CompanyLocation: { type: new GraphQLNonNull(GraphQLString) },
                JobRole: { type: new GraphQLNonNull(GraphQLString) },
                PostingDate: { type: new GraphQLNonNull(GraphQLString) },
                JobType: { type: new GraphQLNonNull(GraphQLString) },
                Experience: { type: new GraphQLNonNull(GraphQLString) },
                JobDescription: { type: new GraphQLNonNull(GraphQLString) },
                HrEmail: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const session = await startSession()
                try {

                    session.startTransaction()
                    const newJob: Document<any, any, any> | any = new Job(args)
                    const exitinguser = await User.findById(args.user)
                    if (!exitinguser) return new Error("User not found")
                    exitinguser.jobs.push(newJob)
                    await exitinguser.save({ session })
                    return await newJob.save()
                } catch (error) {
                    console.log(error)
                    return new Error("Failed to Create job")
                } finally {
                    await session.commitTransaction()
                }
            }
        },
        updateExistingJob: {
            type: JobSchemaType,
            args: {
                userId: { type: new GraphQLNonNull(GraphQLID) },
                jobId: { type: new GraphQLNonNull(GraphQLID) },
                companyName: { type: new GraphQLNonNull(GraphQLString) },
                CompanyLocation: { type: new GraphQLNonNull(GraphQLString) },
                JobRole: { type: new GraphQLNonNull(GraphQLString) },
                PostingDate: { type: new GraphQLNonNull(GraphQLString) },
                JobType: { type: new GraphQLNonNull(GraphQLString) },
                Experience: { type: new GraphQLNonNull(GraphQLString) },
                JobDescription: { type: new GraphQLNonNull(GraphQLString) },
                HrEmail: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, { userId, jobId, companyName, CompanyLocation, JobRole, PostingDate, JobType, Experience, JobDescription, HrEmail }) {
                try {
                    const existinguser = await User.findById(userId)
                    if (!existinguser) return new Error("User not found")
                    const existingJob = await Job.findById(jobId)
                    if (!existingJob) return new Error("Job not found")
                    return await Job.findByIdAndUpdate(jobId, { companyName, CompanyLocation, JobRole, PostingDate, JobType, Experience, JobDescription, HrEmail }, { new: true })
                } catch (error) {
                    console.log(error)
                }
            }
        },
        deleteJob:{
            type:JobSchemaType,
            args:{id:{type:new GraphQLNonNull(GraphQLID)}},
            async resolve(parent,{id}){
                try {
                  let existingjob=await Job.findByIdAndRemove(id)
                  if(!existingjob) return new Error ("Job not found")
                  return existingjob
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }


})

export default new GraphQLSchema({ query: RootQuery, mutation: Mutation })