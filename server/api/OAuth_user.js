export default defineEventHandler(async (event) => {
  // const cookies = parseCookies(event);
  // const token = cookies.token;
  const token = useCookie('token')

  if (!token) {
    return { statusCode: 401, body: 'Unauthorized' };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // 返回用戶數據
    return { statusCode: 200, body: decoded };
  } catch (error) {
    console.error(error);
    return { statusCode: 403, body: 'Forbidden' };
  }
});