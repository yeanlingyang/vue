# 单页应用程序与路由

## SPA - 单页应用程序

- SPA： `Single Page Application`  单页面应用程序
- MPA : `Multiple Page Application`多页面应用程序

[SPA ](https://baike.baidu.com/item/SPA/17536313?fr=aladdin)

[网易云音乐](https://music.163.com/)

### 优势

- 传统的多页面应用程序，每次请求服务器返回的都是一整个完整的页面
- 单页面应用程序只有第一次会加载完整的页面
- 以后每次请求仅仅获取必要的数据，减少了请求体积，加快页面响应速度，降低了对服务器的压力
- SPA更好的用户体验，运行更加流畅

### 缺点

1. 开发成本高 (需要学习路由)
2. **不利于 SEO** 搜索引擎优化

ssr: server side rendering : 服务端渲染   大前端 nodejs

## 路由介绍

- **路由** : 是浏览器 **URL 中的哈希值**( # hash) 与 **展示视图内容(组件)** 之间的对应规则
  - 简单来说,路由就是一套映射规则(一对一的对应规则), 由开发人员制定规则.- 
  - 当 URL 中的哈希值( `#` hash) 发生改变后,路由会根据制定好的**规则**, 展示对应的视图内容(组件)
- **为什么要学习路由?**
  - 渐进式 =>vue => vuer-router (管理组件之间的跳转)
  - 在 web App 中, 经常会出现通过一个页面来展示和管理整个应用的功能.
  - SPA 往往是功能复杂的应用,为了有效管理所有视图内容,前端路由 应运而生.
- **vue 中的路由** : 是 **hash** 和 **component** 的对应关系, **一个哈希值对应一个组件**

# vue-router（官方提供）

## 基本使用

- 安装

```bash
yarn add vue-router
```

+ 引入路由 文件

```html
<script src="vue.js"></script>
<script src="vue-router.js"></script>
```

+ 创建路由并且挂载到vue实例

```js
const router = new VueRouter()
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello vue'
  },
  router
})
```

## 具体步骤

实现vue的具体步骤

+ 配置路由规则  hash值和组件的映射规则
+ 提供对应组件
+ 配置路由的显示出口, 确定匹配到的组件显示的位置



配置路由规则

```js
const router = new VueRouter({
    // 配置路由的规则
    routes: [
        { path: '/one', component: One }, 
        { path: '/two', component: Two }
    ]
})
```



创建对应组件

```js
const One = {
  template: ` <div> 子组件 one </div> `
}
const Two = {
  template: ` <div> 子组件 one </div> `
}
```



配置路由的出口，显示位置

```html
<div id="app">
  <h1>{{ msg }}</h1>
  <router-view></router-view>
</div>
```

## 路由导航

```html
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
```

## 导航高亮

- **点击导航 =**> 元素里添加了两个类

```html
<a href="#/one" class="router-link-exact-active router-link-active">One</a>
<a href="#/two" class="">Two</a>
```

- **修改方式1 : 直接修改类的样式**

```css
.router-link-exact-active,
.router-link-active {
  color: red;
  font-size: 50px;
}
```

- **修改方式2 : 使用存在过的类样式 => 修改默认高亮类名** 

```js
const router = new VueRouter({
  routes: [],
  // 修改默认高亮的a标签的类名
  // red 是已经存在过的
  linkActiveClass: 'red'
})
```

精确匹配和模糊匹配

- 精确匹配 : router-link-exact-active 类名 : 只有当 `浏览器地址栏中的哈希值 与 router-link 的 to 属性值,完全匹配对,才会添加该类`
- 模糊匹配: router-link-active 类名 : 只要 `浏览器地址栏中的哈希值` 包含 router-link 的 to 属性值,就会添加该类名
- 解决办法 : 加个 exact

```js
<router-link to="/" exact>
  One
</router-link>
```

- 注意 : 精确匹配和模糊匹配，只对添加类名这个机制有效，与路由的匹配规则无关！！！

## 路由重定向

- 解释：将 `/` 重定向到 `/home`

```js
{ path: '/', redirect: '/home' }
```

## 编程式导航

**在 Vue 实例内部，你可以通过 $router 访问路由实例。因此你可以调用 this.$router.push**

当你点击 `<router-link>` 时，这个方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `this.$router.push(...)`

```js
this.router.push('/home')
```

