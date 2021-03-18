# 华信专业设计 后端代码

## 安装与运行

```bash
# 安装
npm i

# 构建
npm run build # 构建运行文件
npm run build:force # 清空build文件夹并构建运行文件
npm run build:sass w # 监听sass/scss文件改动并构建css文件

# 运行
npm run dev # 开发模式运行
npm run serve # 生产模式运行
```

## 接口文档

参考：<https://documenter.getpostman.com/view/8434489/Tz5tZGYX#intro>

## dotenv 配置

项目使用 `dotenv` 存储秘钥等信息，你需要在此目录下创建一个 `.env` 文件，并且存储如下的秘钥：

```env
ACCESS_TOKEN_SECRET=xxx
DATABASE_PASSWORD=xxx
```

这些秘钥的值需要大家在本地都保持一样，秘钥最新值请参考：<https://i23h2iat6t.feishu.cn/docs/doccnUI6ygmKXZsr17MXwmNFBCc> 。
