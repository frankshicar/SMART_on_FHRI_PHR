// server/api/OAuth_login.js
import { defineEventHandler, sendRedirect } from 'h3';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET_KEY,
  redirectUri: `${process.env.HOST}/api/OAuth_callback`,
});

export default defineEventHandler(async (event) => {
  const authorizeUrl = client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
  });
  return sendRedirect(event, authorizeUrl);
});
