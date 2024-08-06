import { defineEventHandler, parseCookies } from 'h3';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const token = cookies.token;

  if (!token) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 返回用戶數據
    return { statusCode: 200, body: decoded.sub};
  } catch (error) {
    console.error(error);
    return { statusCode: 403, body: 'Forbidden' };
  }
});