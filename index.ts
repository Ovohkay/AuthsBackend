import express, { Application } from "express"
import dotenv from "dotenv"
import enVariables from "./Config/environmentVariable"
import  appConfig  from "./app"
import {dbConnect} from "./Config/DB"

const  app : Application = express();


appConfig(app)
dbConnect()

const port = enVariables.PORT || 2009

app.listen(port, () => {
    console.log(`SERVER IS RUNNING ${port}`)
})