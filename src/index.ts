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
        const url=`mongodb+srv://dummyuser:${process.env.MongoDbPassword}@cluster0.4zinq1l.mongodb.net/FindYourJobs`
        MongoDbconnections(url).then(()=>{
            app.listen(process.env.Port,()=>{
                console.log("Server Started")
            })
        })
    } catch (error) {
        console.log(error)
    }
}

StartServer()
