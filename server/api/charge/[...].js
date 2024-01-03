/*
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2024-01-03 09:55:24
 * @Description: 记账相关api
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
router.post('/addCharge', defineEventHandler(async (event) => {
  const { title, date, uses } = await readBody(event)
  if (!title) {
    return { status: 400, data: '标题不能为空' }
  }
  const userId = '1'
  const charge = await prisma.charge_form.create({
    data: {
      title,
      date,
      uses: JSON.stringify(uses),
      userId,
    },
  })
  return {
    status: 200,
    message: '新增成功',
  }
})).post('/updateCharge', defineEventHandler(async (event) => {
  const { title, date, uses, id } = await readBody(event)
  if (!title) {
    return { status: 400, data: '标题不能为空' }
  }
  const userId = '1'
  const charge = await prisma.charge_form.update({
    where: { id },
    data: {
      title,
      date,
      uses: JSON.stringify(uses),
      userId,
    },
  })
  return {
    status: 200,
    message: '更新成功',
  }
}))

router
  .get('/getCharge', defineEventHandler(async (event) => {
    const query = getQuery(event)
    const params = {}
    if (query.userId) {
      params.userId = query.userId
    }
    if (query.chargeId) {
      params.id = +query.chargeId
    }
    const charges = await prisma.charge_form.findMany({
      where: params,
    })
    return {
      status: 200,
      data: charges,
    };
  }))
export default useBase('/api/charge', router.handler);