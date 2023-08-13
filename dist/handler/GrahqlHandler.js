"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const UserSchema_1 = require("../schema/UserSchema");
const User_1 = __importDefault(require("../model/User"));
const bcryptjs_1 = require("bcryptjs");
const JobSchema_1 = require("../schema/JobSchema");
const Job_1 = __importDefault(require("../model/Job"));
const mongoose_1 = require("mongoose");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueRy",
    fields: {
        //Get User Details
        users: {
            type: new graphql_1.GraphQLList(UserSchema_1.UserSchemaUsertype),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield User_1.default.find();
                });
            }
        },
        jobs: {
            type: new graphql_1.GraphQLList(JobSchema_1.JobSchemaType),
            resolve() {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield Job_1.default.find();
                });
            }
        },
        user: {
            type: UserSchema_1.UserSchemaUsertype,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield User_1.default.findById(id).populate('jobs');
                });
            }
        }
    }
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    fields: {
        signUp: {
            type: UserSchema_1.UserSchemaUsertype,
            args: {
                userName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { userName, email, password }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let existingUser = yield User_1.default.findOne({ email: email });
                        if (existingUser)
                            return new Error("User already exists");
                        const encryptPassword = (0, bcryptjs_1.hashSync)(password);
                        const NewUser = new User_1.default({ userName: userName, email: email, password: encryptPassword });
                        return yield NewUser.save();
                    }
                    catch (error) {
                        console.log(error);
                        return new Error("User SignUp failed.Try again");
                    }
                });
            }
        },
        login: {
            type: UserSchema_1.UserSchemaUsertype,
            args: {
                email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { email, password }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let existingUser = yield User_1.default.findOne({ email: email });
                        if (!existingUser)
                            return new Error(`User not available with this email '${email}'`);
                        const DecryptPassword = (0, bcryptjs_1.compareSync)(password, existingUser.password);
                        if (!DecryptPassword)
                            return new Error("Wrong Password");
                        return existingUser;
                    }
                    catch (error) {
                        console.log(error);
                        return new Error("Login failed");
                    }
                });
            }
        },
        addNewJob: {
            type: JobSchema_1.JobSchemaType,
            args: {
                user: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                companyName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                CompanyLocation: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                JobRole: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                PostingDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                JobType: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Experience: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                JobDescription: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                HrEmail: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                return __awaiter(this, void 0, void 0, function* () {
                    const session = yield (0, mongoose_1.startSession)();
                    try {
                        session.startTransaction();
                        const newJob = new Job_1.default(args);
                        const exitinguser = yield User_1.default.findById(args.user);
                        if (!exitinguser)
                            return new Error("User not found");
                        exitinguser.jobs.push(newJob);
                        yield exitinguser.save({ session });
                        return yield newJob.save();
                    }
                    catch (error) {
                        console.log(error);
                        return new Error("Failed to Create job");
                    }
                    finally {
                        yield session.commitTransaction();
                    }
                });
            }
        },
        updateExistingJob: {
            type: JobSchema_1.JobSchemaType,
            args: {
                userId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                jobId: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
                companyName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                CompanyLocation: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                JobRole: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                PostingDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                JobType: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                Experience: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                JobDescription: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
                HrEmail: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, { userId, jobId, companyName, CompanyLocation, JobRole, PostingDate, JobType, Experience, JobDescription, HrEmail }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        const existinguser = yield User_1.default.findById(userId);
                        if (!existinguser)
                            return new Error("User not found");
                        const existingJob = yield Job_1.default.findById(jobId);
                        if (!existingJob)
                            return new Error("Job not found");
                        return yield Job_1.default.findByIdAndUpdate(jobId, { companyName, CompanyLocation, JobRole, PostingDate, JobType, Experience, JobDescription, HrEmail }, { new: true });
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        },
        deleteJob: {
            type: JobSchema_1.JobSchemaType,
            args: { id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) } },
            resolve(parent, { id }) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        let existingjob = yield Job_1.default.findByIdAndRemove(id);
                        if (!existingjob)
                            return new Error("Job not found");
                        return existingjob;
                    }
                    catch (error) {
                        console.log(error);
                    }
                });
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: Mutation });
