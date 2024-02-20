# 前端面试题(个人用)

## 1.JS

##### 1.promise
promise三个状态：进⾏中（pending）、已完成(fulfilled)、已拒绝（rejected）
promise使用: 

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('foo')
  }, 300)
})
```
手写Promise:
```js
class MyPromise {
  constructor(callback) {
    this.status = 'pending'
    this.value = ''
    this.reason = ''
    // 存储成功状态的回调函数
    this.onResolvedCallbacks = []
    // 存储失败状态的回调函数
    this.onRejectedCallbacks = []
    const resolve = (value) => {
      if (this.status == 'pending') {
        this.status = 'resolved'
        this.value = value
        this.onResolvedCallbacks.forEach((fn) => fn())
      }
    }
    const reject = (reason) => {
      if (this.status == 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach((fn) => fn())
      }
    }
    try {
      callback(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onResolved, onRejected) {
    // 防止传入的不是函数
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => value
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason }

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status == 'resolved') {
        console.log('1111111111')
        try {
          const x = onResolved(this.value)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status == 'rejected') {
        console.log('2222222')
        try {
          const x = onRejected(this.reason)
          resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      if (this.status == 'pending') {
        console.log('333333333333')
        this.onResolvedCallbacks.push(() => {
          if (this.status == 'resolved') {
            try {
              const x = onResolved(this.value)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          }
        })
        this.onRejectedCallbacks.push(() => {
          if (this.status == 'rejected') {
            try {
              const x = onRejected(this.reason)
              resolve(x)
            } catch (error) {
              reject(error)
            }
          }
        })
      } else {
        // 执行完所有回调函数之后，清空回调数组
        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []
      }
    })
    return promise2
  }
  catch(onRejected) {
    // 函数糖的方式使用
    return this.then(null, onRejected)
  }
}

```

##### 2.闭包

- 闭包就是能够读取其他函数内部变量的函数
- 闭包是指有权访问另一个函数作用域中变量的函数，创建闭包的最常见的方式就是在一个函数内创建另一个函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用链域
- **闭包的特性：**
  - 函数内再嵌套函数
  - 内部函数可以引用外层的参数和变量
  - 参数和变量不会被垃圾回收机制回收

**说说你对闭包的理解**

- 使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。在js中，函数即闭包，只有函数才会产生作用域的概念
- 闭包 的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量始终保持在内存中
- 闭包的另一个用处，是封装对象的私有属性和私有方法
- **好处**：能够实现封装和缓存等；
- **坏处**：就是消耗内存、不正当使用会造成内存溢出的问题

**使用闭包的注意点**

- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露
- 解决方法是，在退出函数之前，将不使用的局部变量全部删除

##### 3.原型链

- **原型：**

  - `JavaScript`的所有对象中都包含了一个 `[__proto__]` 内部属性，这个属性所对应的就是该对象的原型
  - JavaScript的函数对象，除了原型 `[__proto__]` 之外，还预置了 `prototype` 属性
  - 当函数对象作为构造函数创建实例时，该 prototype 属性值将被作为实例对象的原型 `[__proto__]`。

  特点

- **原型链：**

  - 当一个对象调用的属性/方法自身不存在时，就会去自己 `[__proto__]` 关联的前辈 `prototype` 对象上去找
  - 如果没找到，就会去该 `prototype` 原型 `[__proto__]` 关联的前辈 `prototype` 去找。依次类推，直到找到属性/方法或 `undefined` 为止。从而形成了所谓的“原型链”

特点

- 当我们需要一个属性的时，`Javascript`引擎会先看当前对象中是否有这个属性， 如果没有的
- 就会查找他的`Prototype`对象是否有这个属性，如此递推下去，一直检索到 `Object` 内建对象
- `JavaScript`对象是通过引用来传递的，当修改原型时，与之相关的对象也会继承这一改变

##### 4.this

- `this`总是指向函数的直接调用者（而非间接调用者）
- 如果有`new`关键字，`this`指向`new`出来的那个对象
- 在事件中，`this`指向触发这个事件的对象，特殊的是，`IE`中的`attachEvent`中的`this`总是指向全局对象`Window`

##### 5.跨域

同源策略`/SOP（Same origin policy）`是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到`XSS`、`CSRF`等攻击。所谓同源是指"**协议+域名+端口**"三者相同，即便两个不同的域名指向同一个ip地址，也非同源

- **通过jsonp跨域**

```javascript
var script = document.createElement('script');
script.type = 'text/javascript';

// 传参并指定回调执行函数为onBack
script.src = 'http://www.....:8080/login?user=admin&callback=onBack';
document.head.appendChild(script);

// 回调执行函数
function onBack(res) {
    alert(JSON.stringify(res));
}
```

- **document.domain + iframe跨域**

> 此方案仅限主域相同，子域不同的跨域应用场景

1.）父窗口：(http://www.domain.com/a.html)

```html
<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
    document.domain = 'domain.com';
    var user = 'admin';
</script>
```

2.）子窗口：(http://child.domain.com/b.html)

```javascript
document.domain = 'domain.com';
// 获取父窗口中变量
alert('get js data from parent ---> ' + window.parent.user);
```

- **nginx代理跨域**
- **nodejs中间件代理跨域**
- **后端在头部信息里面设置安全域名**

##### 6.内存问题

> JavaScript 内存泄露指对象在不需要使用它时仍然存在，导致占用的内存不能使用或回收

- 未使用 `var` 声明的全局变量
- 闭包函数(`Closures`)
- 循环引用(两个对象相互引用)
- 控制台日志(`console.log`)
- 移除存在绑定事件的`DOM`元素(`IE`)
- `setTimeout` 的第一个参数使用字符串而非函数的话，会引发内存泄漏
- 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 `0`（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收

## 2.HTML

##### 1.meta相关注释

```html
<!DOCTYPE html>  <!--H5标准声明，使用 HTML5 doctype，不区分大小写-->
<head lang=”en”> <!--标准的 lang 属性写法-->
<meta charset=’utf-8′>    <!--声明文档使用的字符编码-->
<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   <!--优先使用 IE 最新版本和 Chrome-->
<meta name=”description” content=”不超过150个字符”/>       <!--页面描述-->
<meta name=”keywords” content=””/>     <!-- 页面关键词-->
<meta name=”author” content=”name, email@gmail.com”/>    <!--网页作者-->
<meta name=”robots” content=”index,follow”/>      <!--搜索引擎抓取-->
<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> <!--为移动设备添加 viewport-->
<meta name=”apple-mobile-web-app-title” content=”标题”> <!--iOS 设备 begin-->
<meta name=”apple-mobile-web-app-capable” content=”yes”/>  <!--添加到主屏后的标题（iOS 6 新增）
是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏-->
<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
<!--添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）-->
<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
<meta name=”format-detection” content=”telphone=no, email=no”/>  <!--设置苹果工具栏颜色-->
<meta name=”renderer” content=”webkit”> <!-- 启用360浏览器的极速模式(webkit)-->
<meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     <!--避免IE使用兼容模式-->
<meta http-equiv=”Cache-Control” content=”no-siteapp” />    <!--不让百度转码-->
<meta name=”HandheldFriendly” content=”true”>     <!--针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓-->
<meta name=”MobileOptimized” content=”320″>   <!--微软的老式浏览器-->
<meta name=”screen-orientation” content=”portrait”>   <!--uc强制竖屏-->
<meta name=”x5-orientation” content=”portrait”>    <!--QQ强制竖屏-->
<meta name=”full-screen” content=”yes”>              <!--UC强制全屏-->
<meta name=”x5-fullscreen” content=”true”>       <!--QQ强制全屏-->
<meta name=”browsermode” content=”application”>   <!--UC应用模式-->
<meta name=”x5-page-mode” content=”app”>   <!-- QQ应用模式-->
<meta name=”msapplication-tap-highlight” content=”no”>    <!--windows phone 点击无高亮
设置页面不缓存-->
<meta http-equiv=”pragma” content=”no-cache”>
<meta http-equiv=”cache-control” content=”no-cache”>
<meta http-equiv=”expires” content=”0″>
```

##### 2.请求类型

- `GET`方法
  - 发送一个请求来取得服务器上的某一资源
- `POST`方法
  - 向`URL`指定的资源提交数据或附加新的数据
- `PUT`方法
  - 跟`POST`方法很像，也是想服务器提交数据。但是，它们之间有不同。`PUT`指定了资源在服务器上的位置，而`POST`没有
- `HEAD`方法
  - 只请求页面的首部
- `DELETE`方法
  - 删除服务器上的某资源
- `OPTIONS`方法
  - 它用于获取当前`URL`所支持的方法。如果请求成功，会有一个`Allow`的头包含类似`“GET,POST”`这样的信息
- `TRACE`方法
  - `TRACE`方法被用于激发一个远程的，应用层的请求消息回路
- `CONNECT`方法
  - 把请求连接转换到透明的`TCP/IP`通道

##### 3.状态码类型

- ```
  1XX
  ```

  ：信息状态码

  - `100 Continue` 继续，一般在发送`post`请求时，已发送了`http header`之后服务端将返回此信息，表示确认，之后发送具体参数信息

- ```
  2XX
  ```

  ：成功状态码

  - `200 OK` 正常返回信息
  - `201 Created` 请求成功并且服务器创建了新的资源
  - `202 Accepted` 服务器已接受请求，但尚未处理

- ```
  3XX
  ```

  ：重定向

  - `301 Moved Permanently` 请求的网页已永久移动到新位置。
  - `302 Found` 临时性重定向。
  - `303 See Other` 临时性重定向，且总是使用 `GET` 请求新的 `URI`。
  - `304 Not Modified` 自从上次请求后，请求的网页未修改过。

- ```
  4XX
  ```

  ：客户端错误

  - `400 Bad Request` 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  - `401 Unauthorized` 请求未授权。
  - `403 Forbidden` 禁止访问。
  - `404 Not Found` 找不到如何与 `URI` 相匹配的资源。

- ```
  5XX:
  ```

   

  服务器错误

  - `500 Internal Server Error` 最常见的服务器端错误。
  - `503 Service Unavailable` 服务器端暂时无法处理请求（可能是过载或维护）

## 3.CSS

##### 1.css3新特性

- 新增选择器 `p:nth-child(n){color: rgba(255, 0, 0, 0.75)}`
- 弹性盒模型 `display: flex;`
- 多列布局 `column-count: 5;`
- 媒体查询 `@media (max-width: 480px) {.box: {column-count: 1;}}`
- 个性化字体 `@font-face{font-family: BorderWeb; src:url(BORDERW0.eot);}`
- 颜色透明度 `color: rgba(255, 0, 0, 0.75);`
- 圆角 `border-radius: 5px;`
- 渐变 `background:linear-gradient(red, green, blue);`
- 阴影 `box-shadow:3px 3px 3px rgba(0, 64, 128, 0.3);`
- 倒影 `box-reflect: below 2px;`
- 文字装饰 `text-stroke-color: red;`
- 文字溢出 `text-overflow:ellipsis;`
- 背景效果 `background-size: 100px 100px;`
- 边框效果 `border-image:url(bt_blue.png) 0 10;`
- 转换
  - 旋转 `transform: rotate(20deg);`
  - 倾斜 `transform: skew(150deg, -10deg);`
  - 位移 `transform: translate(20px, 20px);`
  - 缩放 `transform: scale(.5);`
- 平滑过渡 `transition: all .3s ease-in .1s;`
- 动画 `@keyframes anim-1 {50% {border-radius: 50%;}} animation: anim-1 1s;`

##### 2.display值

- `block` 转换成块状元素。
- `inline` 转换成行内元素。
- `none` 设置元素不可见。
- `inline-block` 象行内元素一样显示，但其内容象块类型元素一样显示。
- `list-item` 象块类型元素一样显示，并添加样式列表标记。
- `table` 此元素会作为块级表格来显示
- `inherit` 规定应该从父元素继承 `display` 属性的值

##### 3.样式权重

- 优先级就近原则，同权重情况下样式定义最近者为准
- 载入样式以最后载入的定位为准,如果权重相同，则最后定义的样式会起作用，但是应该避免这种情况出现
- 优先级为: `!important > id > class > tag`; `!important` 比 内联优先级高
- `！important`规则最重要，大于其它规则
- 行内样式规则，加`1000`
- 对于选择器中给定的各个`ID`属性值，加`100`
- 对于选择器中给定的各个类属性、属性选择器或者伪类选择器，加`10`
- 对于选择其中给定的各个元素标签选择器，加1
- 如果权值一样，则按照样式规则的先后顺序来应用，顺序靠后的覆盖靠前的规则

```css
/*权重为1*/
div{
}
/*权重为10*/
.class1{
}
/*权重为100*/
#id1{
}
/*权重为100+1=101*/
#id1 div{
}
/*权重为10+1=11*/
.class1 div{
}
/*权重为10+10+1=21*/
.class1 .class2 div{
}
```

##### 4.position值

- `absolute`：生成绝对定位的元素，相对于 `static` 定位以外的第一个父元素进行定位
- `fixed`：生成绝对定位的元素，相对于浏览器窗口进行定位
- `relative`：生成相对定位的元素，相对于其正常位置进行定位
- `static` 默认值。没有定位，元素出现在正常的流中
- `inherit` 规定从父元素继承 `position` 属性的值

##### 5.hack

利用不同浏览器对CSS的支持和解析结果不一样编写针对特定浏览器样式。

##### 6.BFC

BFC(Block Formatting Context)，块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响

**触发条件 (以下任意一条)**

- `float`的值不为`none`
- `overflow`的值不为`visible`
- `display`的值为`table-cell`、`tabble-caption`和`inline-block`之一
- `position`的值不为`static`或则`releative`中的任何一个

> 在`IE`下, `Layout`,可通过`zoom:1` 触发

##### 7.CSS渲染层

在 DOM 树中每个节点都会对应一个渲染对象（`RenderObject），当它们的渲染对象处于相同的坐标空间（z 轴空间）时，就会形成一个 RenderLayers，也就是渲染层。渲染层将保证页面元素以正确的顺序堆叠，这时候就会出现层合成（`composite`），从而正确处理透明元素和重叠元素的显示。对于有位置重叠的元素的页面，这个过程尤其重要，因为一旦图层的合并顺序出错，将会导致元素显示异常