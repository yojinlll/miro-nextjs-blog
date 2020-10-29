# Init

## 启动项目

```
// 启动虚拟机
docker run --name psql -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2 

// 进入数据库
yarn docker:psql

// 创建数据库
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

// 通过 typeorm 在 blog_development 中创建表
yarn m:run

// 在 blog_development 中创建一份测试数据
node dist/seed.js

// 启动 http://localhost:3000 端口
yarn dev
```

## Docker

- 启动虚拟机，得到虚拟机id
```
docker run --name psql -v "blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

- 进入虚拟机
```
docker exec -it psql bash
```

- 清空之前记录

```
docker ps
docker kill 容器id
docker rm 容器id

rm -rf blog-data
或
docker container prune 
docker volume rm blog-data
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
CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

- 删除 database
```
drop database blog_development
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

## 部署

- Docker 化
```
docker build -t blog/node-web-app .

// 由于使用的是 Docker Toolbox（得到IP）， 所以运行后需要启动相应 IP 的 3000 端口，便可正常浏览网页。
docker run --name blog -p 3000:3000 -d blog/node-web-app
```

- 脚本部署
```
ssh blog@dev 'bash -s' < bin/deploy.sh
```