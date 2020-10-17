# Init

## 启动项目

```
yarn dev

// 该命令包含 next dev 和 yarn typeorm:build
// 为了统一 ts 转换 js 的标准，移除 typeorm 自带的 ts-node 依赖，与 nextjs 一样， typeorm 的 ts 文件同样使用 babel 编译
// yarn typeorm:build, babel 会监控文件的变化，将 src 下的 ts 文件 （typeorm 相关） 编译到 dist, 让 node 执行 dist 目录下的 js（typeorm 相关）
```

## 启动数据库

- 启动虚拟机，得到虚拟机id
```
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

- 进入虚拟机
```
docker exec -it de6aa18355bf bash
```

## PostgreSQL

配置查看 `ormconfig.json`

- 进入 databases
```
psql -U blog

\l: list databases
```

- 创建 database
```
CREATE DATABASE ${database name} ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

- 删除 database
```
drop database ${database name}
```

- 操作 database
```
\dt: display tables
\d ${table}: describe table
\c ${databaseName}: connect to a ${databaseName}

select * from ${relation name};
```

## Typeorm

- 创建表
```
typeorm migration:create -n TableName
```

- 数据迁移(迁进 & 迁出)
```
typeorm migration:run
typeorm migration:revert
```

- 数据映射实体
```
typeorm entity:create
```

## 清空之前记录

```
docker ps
docker kill 容器id
docker rm 容器id

rm -rf blog-data
或
docker container prune 
docker volume rm blog-data
```

## 创建数据库

```
docker exec -it <id> bash
psql -U blog
docker run -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```