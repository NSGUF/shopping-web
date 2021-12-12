# 后端
typescript+adonisjs+mysql

##  踩坑记录
1. ❯ error database/migrations/1638886544587_users
   [ error ]  create table `users` (`id` int unsigned not null auto_increment primary key, `email` varchar(255) not null, `password` varchar(180) not null, `remember_me_token` varchar(255) null, `created_at` timestamp not null, `updated_at` timestamp not null) - ER_INVALID_DEFAULT: Invalid default value for 'updated_at'

这是因为我用的是5.7版本，默认值不兼容；
输入以下命令：
```shell
show variables like 'sql_mode' ;
set global sql_mode = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
```

1. 输入中文报错；
> mysql改成utf-8

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


# 前端
vue2+typescript+element ui+vite

# 截图
## 未登陆浏览商品
只能浏览，不能购买  
![image](https://user-images.githubusercontent.com/16619359/145701480-f7d7862c-b403-4c83-b0c9-97a7b9ee0009.png)

## 登陆/注册
![image](https://user-images.githubusercontent.com/16619359/145700439-c237298a-0488-4f4e-a74e-1f193a9284c7.png)  
![image](https://user-images.githubusercontent.com/16619359/145700441-c0b3ae4c-775b-4e3c-a751-a7cd7642fd8a.png)  

## 登陆成功的用户
可购买，购买后库存减少；
![image](https://user-images.githubusercontent.com/16619359/145701537-ececa0c8-6fc9-4352-b196-1a7aa2fc6966.png)  
没有库存：  
![image](https://user-images.githubusercontent.com/16619359/145701520-334f3ba3-12ea-467d-8083-587f726e29cf.png)

title/detail的模糊搜索：  
![image](https://user-images.githubusercontent.com/16619359/145701553-4dce82c3-1df5-4817-8b5f-73de90a77952.png)  

 
## 登陆成功的管理者
![image](https://user-images.githubusercontent.com/16619359/145700467-c5df8af8-2662-4288-b78d-f7e0c26d06bb.png)
添加商品：    
![image](https://user-images.githubusercontent.com/16619359/145700578-e3a068d7-e3df-49b0-b4b9-c2820607ee92.png)
title/detail的模糊搜索  
![image](https://user-images.githubusercontent.com/16619359/145700608-7fd37e19-9688-4ec0-b95c-8117afdd3e99.png)

## 查看日志  
打开server/app.log:   
![image](https://user-images.githubusercontent.com/16619359/145701409-fb1dd458-b9f3-4245-8de1-7f7110be7a3d.png)
