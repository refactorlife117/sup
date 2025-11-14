import supabaseClient from "../utils/supabase_client.js"

const authenticateUser = async (req, res, next) => {
    console.log("the cookies are",req.cookies) 
    const token = req.cookies?.['sb-access-token'] || 
                  req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
        return res.status(401).json({ error: 'No authentication token' })
    }
    
    const { data: { user }, error } = await supabaseClient.auth.getUser(token)
    
    if (error || !user) {
        return res.status(401).json({ error: 'Invalid or expired token' })
    }
    console.log("the whole data for authenticating is", data)
    req.user = user
    next()
}


const verifyPermission = async(...role)=>{
    if(role.includes(req.user.role)){
        next()
    }
    return res.status(403).json({message:"You are not authorized"})
}