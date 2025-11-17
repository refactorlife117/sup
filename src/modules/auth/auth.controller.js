import { createServerClient } from "@supabase/ssr";
import supabaseClient from "../../../utils/supabase_client.js";
import asyncHandler from "../../../utils/errors/asyncHandler.js"
import { google } from "googleapis";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URL } from "../../../constants.js";
const oauth2Client= new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
)

oauth2Client.on('tokens', (tokens) => {
  if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
  }
  console.log(tokens.access_token);
});

export const google_signup = asyncHandler(async (req, res, next) => {
 
  const scopes = ['https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/calendar.events','https://www.googleapis.com/auth/calendar']

  const data = oauth2Client.generateAuthUrl(
       {
          access_type:"offline",
          scope:scopes,
          prompt:"consent"
       })


  // const { data, error } = await supabaseClient.auth.signInWithOAuth({
  //   provider: "google",
  //   options: {
  //     redirectTo: "http://localhost:3000/api/v1/auth/oauth/callback",
  //     queryParams: {
  //       access_type: "offline",
  //       prompt: "consent",
  //     },
  //       skipBrowserRedirect: false,
  //       // scopes:['https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly',
  //       //         'https://www.googleapis.com/auth/calendar.events']
  //   },
  // });

  console.log("the data is", data);

  // if (error) {
  //   console.error("Supabase auth error:", error);
  //   return res.status(400).json({ error: error.message });
  // }

  if (data) {
     return res.redirect(data);
  } else {
    res.status(500).json({ error: "No redirect URL returned from Supabase" });
  }
});

export const google_callback = asyncHandler(async (req, res) => {
  const code = req.query.code;
  const next = req.query.next ?? "/";

const { tokens }= await oauth2Client.getToken(code)
oauth2Client.setCredentials(tokens);

console.log("tokens are",data)
if (!tokens){
  res.redirect()
}
  // if (code) {
    

  //   const { data, error:exchangeError } = await supabaseClient.auth.exchangeCodeForSession(code);

  //   if (exchangeError) {
  //     console.error("Error exchanging code:", error);
  //     return res.status(400).json({ error: error.message });
  //   }
  //       console.log("Successfully authenticated user:", data.user.email)
  //       console.log("Session expires at:", new Date(data.session.expires_at * 1000))
 
  //       res.cookie('sb-access-token', data.session.access_token, { 
  //           httpOnly: true, 
  //           secure: process.env.NODE_ENV === 'production',
  //           sameSite: 'lax',
  //           maxAge: 3600000  
  //       })
  //       res.cookie('sb-refresh-token', data.session.refresh_token, { 
  //           httpOnly: true, 
  //           secure: process.env.NODE_ENV === 'production',
  //           sameSite: 'lax',
  //           maxAge: 604800000 
  //       })
  //         console.log("the data received after login", data);
  //        return res.redirect('http://localhost:5173/dashboard')
  //  }
});
