# Eslint Config package
通用eslint

## Trouble
如果`.npmrc`文件
```json
shared-workspace-lockfile=true
```
项目引用改配置包的时候，`monorepo` `root`目录下`pnpm i`后，`dependencies`会安装在`root`目录下的`node_modules`里。子`packages` `eslint --fix .`的时候会向上找到对应的依赖
T

当`.npmrc`文件
```json
shared-workspace-lockfile=false
```
的情况下，`pnpm i` 后`root`目录和项目里的`node_modules`都没有对应的依赖，进入到子项目里运行`npx eslint --fix .`会出现`ESLint couldn't find the plugin "eslint-plugin-prettier".`

解决方法如下:
```bash
pnpm add --save-dev @rushstack/eslint-patch
```

`index.js`
```js
require('@rushstack/eslint-patch/modern-module-resolution')

// ... your code
```

或者你可以选择在项目里删除`pnpm-lock.yaml`(或者在`pnpm- workspace.yaml`删除configs的引入)，并且删除monorepo的里的配置包，这样就会从私有仓库拉取。
> 私有仓库拉取后，配置包的`dependencies`会在node_modules里。就不会出现`eslint-plugin-prettier`找不到的情况