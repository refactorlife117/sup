import { createServerClient } from "@supabase/ssr";
import asyncHandler from "../utils/errors/asyncHandler.js";
import supabaseClient from "../utils/supabase_client.js";

export const google_signup = asyncHandler(async (req, res, next) => {
  const { data, error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:3000/api/v1/auth/oauth/callback",
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
        skipBrowserRedirect: false
    },
  });

  console.log("the data is", data);

  if (error) {
    console.error("Supabase auth error:", error);
    return res.status(400).json({ error: error.message });
  }

  if (data?.url) {
     return res.redirect(data.url);
  } else {
    res.status(500).json({ error: "No redirect URL returned from Supabase" });
  }
});

export const google_callback = asyncHandler(async (req, res) => {
  const code = req.query.code;
  const next = req.query.next ?? "/";

  if (code) {
    

    const { data, error:exchangeError } = await supabaseClient.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code:", error);
      return res.status(400).json({ error: error.message });
    }
        console.log("Successfully authenticated user:", data.user.email)
        console.log("Session expires at:", new Date(data.session.expires_at * 1000))
 
        res.cookie('sb-access-token', data.session.access_token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000  
        })
        res.cookie('sb-refresh-token', data.session.refresh_token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 604800000 
        })
          console.log("the data received after login", data);
         return res.redirect('http://localhost:5173/dashboard')
   }
});
