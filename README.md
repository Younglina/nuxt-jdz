<!--
 * @Author: younglina younglina0409@gmail.com
 * @Date: 2023-12-27 22:27:58
 * @Description: 
-->
## ORM 
prisma配合SQLite
https://prisma.yoga/reference/api-reference/prisma-client-reference#findfirst
pnpm i prisma @prisma/client --save-dev
npx prisma init: 用于初始化 Prisma 项目，生成 Prisma schema 文件和 .env 文件，配置数据库连接等信息。
npx prisma migrate dev: 用于创建和应用数据库迁移脚本，将 Prisma schema 中的更改同步到数据库中。
npx prisma generate: 用于生成 Prisma Client，该客户端是一个自动生成的、类型安全的查询构建器，用于与数据库进行交互。
npx prisma db pull: 用于将数据库的结构转换为 Prisma schema，将数据库中的表和字段映射到 Prisma schema 中。
npx prisma db push: 用于将 Prisma schema 中的结构转换为数据库，创建或修改数据库中的表和字段。
npx prisma format: 用于格式化 Prisma schema 文件，使其具有一致的风格和可读性。
npx prisma introspect: 用于从现有数据库中自动生成 Prisma schema 文件，将数据库结构反向工程到 Prisma schema 中。

## 路由
在pages下的文件会自动转成路由

文件或文件夹名带上`[参数]`会成为动态路由；  
如`/pages/chargeUp-[type]/[[id]].vue`  
```
// 这两个路由都能匹配
navigateTo(`/chargeUp-edit/${id}`)
navigateTo(`/chargeUp-add`)

// 通过route可获取参数
const route = useRoute()
route.params.type
route.params.id
```

