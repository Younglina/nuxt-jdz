/*
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-28 15:53:01
 * @Description: user相关api
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const prisma = new PrismaClient();

import {
  createRouter,
  useBase,
  defineEventHandler,
} from 'h3';

const router = createRouter();
router
  .post('/login', defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)
    const user = await prisma.jdz_user.findFirst({
      where: {
        username,
      },
    })
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (isPasswordMatch) {
      const token = jwt.sign({ username }, 'woung', { expiresIn: '1h' }) // 生成JWT令牌，有效期为1小时
      // 将JWT令牌设置为Cookie
      setCookie(event, 'token', token, { httpOnly: true })
      return { data: '登录成功' };
    }
    else {
      return { status: 400, data: '用户名或密码错误' };
    }
  }))
  .post('/addUser', defineEventHandler(async (event) => {
    const { username, password } = await readBody(event)
    if (!username || !password) {
      return { status: 400, data: '用户名密码不能为空' }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await prisma.jdz_user.create({
      data: {
        username,
        password: hashedPassword,
      },
    })
    return {
      user,
    };
  }))

router
  .get('/getUser', defineEventHandler(async (event) => {
    const user = await prisma.jdz_user.findFirst({
      where: {
        username: 'woung',
      },
    })
    return {
      user,
    };
  }))
export default useBase('/api/user', router.handler);