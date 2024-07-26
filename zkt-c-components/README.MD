# zkt-c-components
老版ebooking基础组件库，收录了海报组件以外的所有组件。
通过npm安装的方式引用。
> 基本上没有什么需要修改的，等到项目迁移到新版eb就可以下线了。
## 安装和使用
通过npm的方式进行安装，安装前，**请先确保配置并切换到了私有源地址**。
```bash
npm install zkt-c-components
```
当前公共组件都是通过全局异步的方式注册的，文件位置位于ebooking项目中src/components/index.js文件中。如果添加了新组件按照一下方式引用即可。
```js
//注册全局组件
Vue.component('ZktTree', () => import(/* webpackChunkName: "zkt-tree" */ 'zkt-c-components/src/tree'))
Vue.component('ZktForm', () => import(/* webpackChunkName: "zkt-form" */ 'zkt-c-components/src/form'))
```
## 开发和调试
和所有npm模块一样，可以通过[npm link](https://docs.npmjs.com/cli/v7/commands/npm-link)的方式来进行本地开发和调试。
如果测试没有问题之后，可以发布到npm私有仓库。

## 发布
调试没有问题时就可以发不到npm私有仓库了。
1. 修改版本号
    ```bash
    npm version patch|minor|majar
    ```
2. 发布到私有仓库
    ```
    npm publish
    ```
3. 提交代码
    ```bash
    git push
    ```