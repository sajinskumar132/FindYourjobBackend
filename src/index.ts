import express from "express"
import {config} from "dotenv"
import { MongoDbconnections } from "./connections/MongoDbconnection"
import { graphqlHTTP } from "express-graphql"
import schema from './handler/GrahqlHandler'
import cors from 'cors'
config()
const app=express()
app.use(cors())
app.use('/graphql',graphqlHTTP({schema:schema,graphiql:true}))
const StartServer=()=>{
    try {
        MongoDbconnections(process.env.MongoDbUrl?process.env.MongoDbUrl:"").then(()=>{
            app.listen(5000,()=>{
                console.log("Server Started")
            })
        })
    } catch (error) {
        console.log(error)
    }
}

StartServer()
