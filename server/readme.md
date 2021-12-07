# 后端代码

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
