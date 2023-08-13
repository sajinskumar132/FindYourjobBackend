import { connect } from "mongoose"

export const MongoDbconnections=async (url:string)=>{
    try {
        await connect(url).then(()=>{
            console.log("MongoDb connected")
        })
    } catch (error) {
        console.log(error)
    }

}
