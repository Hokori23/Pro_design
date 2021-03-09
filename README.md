# 华信专业设计

![contributors](https://img.shields.io/github/contributors/Hokori23/Pro_design?style=flat-square)
![pull request](https://img.shields.io/bitbucket/pr-raw/Hokori23/Pro_design?style=flat-square)
![last commit](https://img.shields.io/github/last-commit/Hokori23/Pro_design?style=flat-square)

![repo size](https://img.shields.io/github/repo-size/Hokori23/Pro_design?style=flat-square)
![code size](https://img.shields.io/github/languages/code-size/Hokori23/Pro_design?style=flat-square)
![language](https://img.shields.io/github/languages/top/Hokori23/Pro_design?style=flat-square)

![key words](https://img.shields.io/github/package-json/keywords/Hokori23/Pro_design?style=flat-square)

## 安装与运行

前后端放在一个仓库里面，使用 [lerna](https://github.com/lerna/lerna) 统一管理。你需要全局安装 lerna：

```bash
npm i -g lerna
```

```bash
# 安装根目录依赖
npm i
# 自动前后端所有依赖
lerna bootstrap
# 同时 build 前后端
lerna run build
```

目前已经将 `lerna bootstrap` 加入了 `postinstall` 脚本中，会在 `npm i` 的时候自动运行。同时在 pull 的时候如果远程仓库的依赖发生改变会自动运行 `npm i`，参考脚本 [.scripts/update_dependencies.sh](./.scripts/update_dependencies.sh)。因此只需要第一次 clone 仓库的时候手动在根目录 `npm i`，一下，后续都是自动安装依赖的了。

### 前端

Writing...

### 后端

```bash
cd backend
npm run dev # 开发模式运行
npm run serve # 生产模式运行
```

存放于文件夹 [backend](backend)。

#### 主要技术栈

- Express
- Sequelize

## 项目基础配置

### 推荐插件

在 [`.vscode/extensions.json`](.vscode/extensions.json) 中列出了推荐安装的插件，打开 VSCode 的时候会提示是否安装，最好全部安装一下。

### workspace 设置

在 [`.vscode/settings.json`](.vscode/settings.json) 中配置了项目的共享配置，这些配置在所有的协作者本地都是一样的，保证大家的环境一致性。

### 代码规范

统一使用 ESLint 进行代码规范和格式化，采用 [standardjs](https://standardjs.com/) 标准，并集成了 `eslint-plugin-prettier`。如需增加规则，可修改配置文件 [.eslintrc.js](.eslintrc.js)。

采用 `lint-staged` 进行 commit 时的代码格式化，如果不合规范将无法 commit。当然在特殊情况下你可以用 `git commit -n` 来绕过这些检查，但是不建议。
