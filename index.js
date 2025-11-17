import express from "express"
import cors from "cors"
const app = express()
import supabaseClient from "./utils/supabase_client.js" 
import prisma from "./prisma/prismaClient.js"
import mainRouter from "./app.js"

app.use(cors({
    origin: "*",
    credentials: true
}))

app.get('/',async(req,res)=>{
    res.send("working fine")
})

app.get("/hello-world", async function (req, res, next) {
//   const { email, emailConfirm } = req.body 
    const val = await prisma.user.findMany({
    take: 10,
  });
  console.log(val);

  res.status(200).json({message:"API Working",data:val})
 })

app.use(`/api/v1`,mainRouter)
app.listen(3000,async()=>{
    console.log("the server is running on port 3000")
})