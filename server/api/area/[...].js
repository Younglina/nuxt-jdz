/*
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2024-01-03 09:55:24
 * @Description: 记账相关api
 */
import { PrismaClient } from "@prisma/client";
// import bcrypt from 'bcrypt';
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
  await prisma.charge_form.update({
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
  .get('/getArea', defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log('getArea')
    let params = {}
    if (query.userId) {
      params.userId = query.userId
    }
    if (query.chargeId) {
      params.id = +query.chargeId
    }
    const area = await prisma.jdz_area.findMany({
      where: params,
      orderBy: {
        likes: 'desc' // 按likes字段降序排序
      }
    })
    return {
      status: 200,
      data: area,
    };
  }))
  .get('/deleteCharge', defineEventHandler(async (event) => {
    const query = getQuery(event)
    await prisma.charge_form.delete({
      where: { id: +query.id }
    })
    return {
      status: 200,
      data: '删除成功',
    };
  }))
export default useBase('/api/area', router.handler);