import { createClient } from '@supabase/supabase-js'
import dotenv from "dotenv"
dotenv.config()
const supabaseClient =  createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY,{
    auth:{
        flowType:"pkce"
    }
})
export default supabaseClient