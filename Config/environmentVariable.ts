import dotenv from "dotenv"
dotenv.config()

 const enVariables = {
    PORT: process.env.PORT as string,
    // DB_STRING: process.env.MONGODB_STRING as string
    DB_STRING: "mongodb://localhost/set06Auth"
}

export default enVariables