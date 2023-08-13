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
exports.UserSchemaUsertype = void 0;
const graphql_1 = require("graphql");
const JobSchema_1 = require("./JobSchema");
const Job_1 = __importDefault(require("../model/Job"));
exports.UserSchemaUsertype = new graphql_1.GraphQLObjectType({
    name: "UserSchemaUsertype",
    fields: () => ({
        id: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLID) },
        userName: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        email: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        password: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) },
        jobs: { type: new graphql_1.GraphQLList(JobSchema_1.JobSchemaType),
            resolve(parent) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(parent);
                    return yield Job_1.default.find({ user: parent.id });
                });
            } }
    }),
});
