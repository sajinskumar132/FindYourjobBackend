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
exports.JobSchemaType = void 0;
const graphql_1 = require("graphql");
const UserSchema_1 = require("./UserSchema");
const User_1 = __importDefault(require("../model/User"));
exports.JobSchemaType = new graphql_1.GraphQLObjectType({
    name: "JobSchemaType",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        companyName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        CompanyLocation: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        JobRole: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        PostingDate: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        JobType: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        Experience: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        JobDescription: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        HrEmail: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        user: { type: UserSchema_1.UserSchemaUsertype,
            resolve(parent) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield User_1.default.findById(parent.user);
                });
            }
        }
    })
});
