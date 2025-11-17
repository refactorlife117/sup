import express from "express";
const routes = express.Router()
import authRouter from "./src/modules/auth/auth.routes.js"

routes.use(`/auth`, authRouter) // for auth services

export default routes