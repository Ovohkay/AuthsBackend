import mongoose from "mongoose";
import enVariables from "./environmentVariable";

 const dbVariables: string = enVariables.DB_STRING

 export const dbConnect = async () =>{
    mongoose.set("strictQuery", true)
    try {
        const conn = await mongoose.connect(dbVariables);
        console.log(`database connected ${conn.connection.host}`)

    } catch (error) {
        console.log(`an error ${error}`)
    }
 }

