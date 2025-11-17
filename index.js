import express from "express"
import cors from "cors"
import winston from "winston"
import bodyParser from "body-parser"
import morgan from "morgan"
import cookieParser from "cookie-parser"
const app = express()
import supabaseClient from "./utils/supabase_client.js" 
import prisma from "./prisma/prismaClient.js"
import mainRouter from "./app.js"
import { errorHandler, notFound } from "./utils/errors/errorHandler.js"
import { PORT } from "./constants.js"

app.use(cors({
    origin: "*",    
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan("dev"))
app.use(cookieParser())


app.get('/health',async(req,res)=>{
    res.send("working fine")
})

 
app.use(`/api/v1`,mainRouter)
app.use(notFound)
app.use(errorHandler)


app.listen(PORT,async()=>{
    console.log(`the server is running on port ${PORT}`)
})