import express from "express"
import { google_callback, google_signup } from "./auth.controller.js"
const router = express.Router()


router.route(`/oauth`).get(google_signup)
router.route(`/oauth/callback`).get(google_callback)

export default router