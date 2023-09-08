# charome插件(小红书内容抓取)

闲着没事搞了个插件，用来抓取小红书的笔记内容和图片url

主要依赖包：

- Node.js 18.17.1
- vite 4.4.9
- react 18.2.0
- react-dom 18.2.0
- react-router-dom 6.15.0
- antd 5.8.3
- less 4.2.0
- sass 1.65.1
- stylus 0.59.0

## 安装项目

执行：

```
npm install
```

或

```
yarn
```

## 使用方法：build项目

> ※注：执行build前一定检查src/main.jsx代码中，注释掉import '@/content'。这段代码是用于方便在开发环境调试content script的，否则content script会被集成到popup页面中。

执行：

```
npm run build
```

或

```
yarn build
```

打包好的插件文件在`./build`文件夹中

