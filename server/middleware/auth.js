/*
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-29 10:52:22
 * @Description: 
 */
import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const { pathname } = getRequestURL(event)
  if (['/api/user/getUser'].includes(pathname)) {
    const token = getCookie(event, 'token')
    if (token) {
      try {
        // 验证 JWT
        const decoded = jwt.verify(token, 'woung')
        event.context.user = decoded
      }
      catch (error) {
        console.log(error)
        // JWT 验证失败
        throw createError({
          statusCode: 401,
          message: '未登录或令牌已过期',
        })
      }
    }
    else {
      // Cookie 中没有 JWT
      throw createError({
        statusCode: 401,
        message: '未登录',
      })
    }
  }
})