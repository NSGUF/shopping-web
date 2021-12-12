# 后端代码
##  踩坑记录
1. ❯ error database/migrations/1638886544587_users
   [ error ]  create table `users` (`id` int unsigned not null auto_increment primary key, `email` varchar(255) not null, `password` varchar(180) not null, `remember_me_token` varchar(255) null, `created_at` timestamp not null, `updated_at` timestamp not null) - ER_INVALID_DEFAULT: Invalid default value for 'updated_at'

这是因为我用的是5.7版本，默认值不兼容；
输入以下命令：
```shell
show variables like 'sql_mode' ;
set global sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
```

## 使用方式
```sh
npm install

# 生成唯一id，用于本地使用
node ace generate:key
# 复制到.env 然后编辑搞成你自己本地的
cp env.example .env

# 创建mysql的表
 npm run migrate-up

# 运行
npm run dev
```


## 如何创建数据库
/usr/local/mysql/bin/mysql -u root -p
登陆后：
```shell
show databases; # 查看数据库
create database shoppong_web; # 创建数据库
```
## 安全问题
1. @adonisjs/lucid：带有一个完全成熟的身份验证系统，可以使用会话、基本身份验证或API 令牌对应用程序的用户进行身份验证。
2. @adonisjs/session：使用会话/cookies 来登录用户。


## "Cannot find module 'phc-argon2'\nRequire stack:\n-
早些时候，argon2 和 bcrypt 驱动程序依赖于@phc/argon2 @phc/bcrypt 但是，这些软件包并未得到积极维护，并且存在一些安全漏洞。所以将它们分叉并发布为 phc-bcrypt 和 phc-argon2


创建migrations
node ace make:migration users
