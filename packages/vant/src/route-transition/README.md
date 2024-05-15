# RouteTransition 路由过渡

### 引入

```js
import Vue from 'vue';
import { RouteTransition } from 'vant';

Vue.use(RouteTransition);
```

## 代码演示

### 第 1 步：注册路由层级

- 通过`level`注册当前路由的层级，值越大表示路由的嵌套层数越多
- 在路由前进返回的过程中，会比较`from`和`to`的`meta.level`，低层级往高层级跳转会启用`routerIn`过渡，高层级往低层级跳转会启用`routerOut`过渡

```js
new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: () => import('./pages/home'),
      meta: { title: 'Kylin Touch Lab', level: 1 },
    },
    {
      path: '/foo',
      component: () => import(`./pages/foo`),
      meta: { level: 2 },
    },
    {
      path: '/foo/bar',
      component: () => import(`./pages/foo/bar`),
      meta: { level: 3 },
    },
  ],
});
```

### 第 2 步：使用 RouteTransition 组件

```html
<ky-route-transition>
  <keep-alive>
    <router-view />
  </keep-alive>
</ky-route-transition>
```

> `iosTouchBackDisbleTransition`默认开启，可以解决 iOS 设备手指触摸滑动前进、返回时 过渡效果二次执行 的问题

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| levelKey | $route.meta 里面代表路由层级的 key | _string_ | `level` |
| routerIn | 路由进入过渡名 | _string_ | `'ky-route-transition__left'` |
| routerOut | 路由退出过渡名 | _string_ | `'ky-route-transition__right'` |
| disable | 禁用过渡 | _boolean_ |  |
| iosTouchBackDisbleTransition | iOS 设备手指触摸滑动返回时禁用过渡效果 | _boolean_ | `true` |

### Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |
