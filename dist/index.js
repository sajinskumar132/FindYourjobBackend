"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const MongoDbconnection_1 = require("./connections/MongoDbconnection");
const express_graphql_1 = require("express-graphql");
const GrahqlHandler_1 = __importDefault(require("./handler/GrahqlHandler"));
const cors_1 = __importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({ schema: GrahqlHandler_1.default, graphiql: true }));
const StartServer = () => {
    try {
        (0, MongoDbconnection_1.MongoDbconnections)(process.env.MongoDbUrl ? process.env.MongoDbUrl : "").then(() => {
            app.listen(5000, () => {
                console.log("Server Started");
            });
        });
    }
    catch (error) {
        console.log(error);
    }
};
StartServer();
