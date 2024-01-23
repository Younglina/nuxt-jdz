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
router
  .get('/getArea', defineEventHandler(async (event) => {
    const query = getQuery(event)
    console.log(query)
    let params = {}
    if (query.id) {
      params.id = +query.id
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
      data: area.map(item => {
        item.imgs = JSON.parse(item.images).map(item => `https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/${item}`)
        item.tags = JSON.parse(item.tags)
        if (item.imgs.length) {
          item.firstImg = `https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/${item.imgs[0]}`
        }
        return item
      })
    };
  }))
  .get('/getAreaComment', defineEventHandler(async (event) => {
    const query = getQuery(event)
    const comment = await prisma.jdz_comment.findMany({
      where: {
        areakey: query.areakey
      },
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })
    return {
      status: 200,
      data: comment.map(item => {
        item.images = JSON.parse(item.images).map(item => `https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/${item}`)
        item.nickname = item.user.username
        delete item.user
        return item
      }),
    };
  }))
export default useBase('/api/area', router.handler);