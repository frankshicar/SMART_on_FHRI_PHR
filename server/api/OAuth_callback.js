// server/api/OAuth_callback.js
import { defineEventHandler, sendRedirect, setCookie } from 'h3';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
  redirectUri: `${process.env.HOST}/api/OAuth_callback`,
});
// console.log(redirectUri)

export default defineEventHandler(async (event) => {
  const url = new URL(event.req.url, `http://${event.req.headers.host}`);
  const code = url.searchParams.get('code');
  
  if (!code) {
    return { statusCode: 400, body: 'Missing authorization code' };
  }

  try {
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const userInfo = await client.request({
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
    });

    const token = jwt.sign(userInfo.data, process.env.JWT_SECRET);


    setCookie(event, 'token', token, {
      // httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    });

    return sendRedirect(event, '/appointment_home');
  } catch (error) {
    console.error(error);
    return { statusCode: 400, body: 'Error fetching Google user info' };
  }
});
