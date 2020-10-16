# Init

## 启动数据库

启动虚拟机，得到虚拟机id
```
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2
```

进入虚拟机
```
docker exec -it de6aa18355bf bash
```

进入 databases
```
psql -U blog

\l: list databases
\c: connect to a database
\dt: display tables
```

创建 database
```
CREATE DATABASE ${database name} ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';
```

## PostgreSQL

创建表
```
typeorm migration:create -n TableName
```

数据迁移
```
typeorm migration:run
typeorm migration:revert
```

数据映射实体
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