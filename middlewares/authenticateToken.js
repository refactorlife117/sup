import supabaseClient from "../utils/supabase_client.js"

const authenticateUser = async (req, res, next) => {
    const token = req.cookies?.['sb-access-token'] || 
                  req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
        return res.status(401).json({ error: 'No authentication token' })
    }
    
    const { data: { user }, error } = await supabaseClient.auth.getUser(token)
    
    if (error || !user) {
        return res.status(401).json({ error: 'Invalid or expired token' })
    }
    
    req.user = user
    next()
}
