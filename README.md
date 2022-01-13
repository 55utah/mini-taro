## mini-taro 实现一个react版本的Taro原型
#### 基础说明

1. 编译层尽量mock，所以产物dist文件夹内只有app.js和各页面的index.js，venders.js这些是webpack编译生成的，其他是固定的。
2. 源码内app.ts/index.ts/index2.ts分别是小程序入口、页面1、页面2。
3. 页面在src/pages内，目前只跑通了class组件。
4. 小程序支持列表渲染+增删、基本事件处理、style、className支持；

#### 体验

yarn build编译后，使用IDE打开dist文件夹。
