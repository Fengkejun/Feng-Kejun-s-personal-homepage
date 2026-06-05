// 笔记详情内容 - 每篇文章的实际技术内容
export const noteContents: Record<string, string | Record<string, string>> = {
  javascript: {
    "js-vars": `## var、let 和 const 的区别

JavaScript 有三种声明变量的方式，各有特点：

### var 声明

\`\`\`js
function fn() {
  var a = 1;
  if (true) {
    var a = 2; // 同一个变量，函数作用域
  }
  console.log(a); // 2
}
\`\`\`

- 函数作用域，不支持块级作用域
- 存在变量提升（hoisting）
- 可以重复声明

### let 声明

\`\`\`js
function fn() {
  let a = 1;
  if (true) {
    let a = 2; // 不同的变量，块级作用域
  }
  console.log(a); // 1
}
\`\`\`

- 块级作用域
- 不存在变量提升，存在暂时性死区（TDZ）
- 同一作用域内不可重复声明

### const 声明

\`\`\`js
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

const obj = { name: 'test' };
obj.name = 'changed'; // 可以修改对象属性
// obj = {}; // TypeError: 不能重新赋值
\`\`\`

- 声明时必须初始化
- 引用类型的内容可以修改，但绑定不能改变

## 垃圾回收机制

JavaScript 使用**标记清除**（Mark and Sweep）算法进行垃圾回收：

1. 垃圾收集器从根对象（全局对象）开始
2. 标记所有从根对象可达的对象
3. 回收未被标记的对象占用的内存

> 内存泄漏常见原因：意外的全局变量、被遗忘的定时器、脱离 DOM 的引用`,

    "js-ref": `## Date 类型

创建日期对象的几种方式：

\`\`\`js
// 当前时间
const now = new Date();

// 指定日期（月份从 0 开始）
const date = new Date(2025, 0, 15); // 2025年1月15日

// 解析日期字符串
const fromStr = new Date('2025-01-15');

// 时间戳（毫秒）
const fromTs = new Date(1705276800000);
\`\`\`

常用方法：

\`\`\`js
const d = new Date(2025, 5, 28);
d.getFullYear();    // 2025
d.getMonth();       // 5 (0-based, 实际是6月)
d.getDate();        // 28
d.getDay();         // 星期几 (0=周日)
d.getTime();        // 时间戳
d.toISOString();    // '2025-06-28T00:00:00.000Z'
\`\`\`

## RegExp 类型

正则表达式的两种创建方式：

\`\`\`js
// 字面量
const pattern1 = /\\d+/g;

// 构造函数
const pattern2 = new RegExp('\\\\d+', 'g');

// 常用方法
pattern1.test('abc123');       // true
'abc123'.match(/\\d+/g);       // ['123']
'abc123def456'.replace(/\\d+/g, '#'); // 'abc#def#'
\`\`\`

## 原始值包装类型

JavaScript 会在需要时自动为原始值创建临时包装对象：

\`\`\`js
const str = 'hello';
str.toUpperCase(); // 'HELLO'
// 执行过程：创建 String 临时对象 → 调用方法 → 销毁对象

// 显式创建
const strObj = new String('hello');
const numObj = new Number(42);
const boolObj = new Boolean(true);
\`\`\``,

    "js-iter": `## 迭代器协议

迭代器是一个对象，实现了 \`.next()\` 方法，返回 { value, done }：

\`\`\`js
// 手动创建迭代器
function createIterator(items) {
  let index = 0;
  return {
    next() {
      return index < items.length
        ? { value: items[index++], done: false }
        : { done: true };
    }
  };
}

const it = createIterator([1, 2, 3]);
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { done: true }
\`\`\`

## 生成器函数

使用 \`function*\` 语法，通过 \`yield\` 暂停执行：

\`\`\`js
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }

// 生成器天然可迭代
for (const num of numberGenerator()) {
  console.log(num); // 1, 2, 3
}
\`\`\`

## 实际应用：惰性求值

\`\`\`js
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
// 只在需要时才计算下一个值
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2
\`\`\`

生成器在 Redux-Saga、Koa 中间件等场景广泛应用。`,

    "js-closure": `## 闭包的原理

闭包是指函数能够访问其词法作用域中的变量，即使函数在其作用域之外执行。

\`\`\`js
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  };
}

const fn = outer();
fn(); // 1
fn(); // 2 — count 被闭包记住
\`\`\`

## 闭包的应用场景

### 1. 数据私有化

\`\`\`js
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}
\`\`\`

### 2. 函数柯里化

\`\`\`js
function add(a) {
  return function(b) {
    return a + b;
  };
}
add(1)(2); // 3
\`\`\`

### 3. 防抖/节流

\`\`\`js
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
\`\`\`

> 内存泄漏风险：闭包会保持对外部变量的引用，不再需要时应手动解除。`,

    "js-prototype": `## 原型链

每个对象都有一个内部属性 [[Prototype]]，指向它的原型对象。

\`\`\`js
function Person(name) {
  this.name = name;
}
Person.prototype.sayHello = function() {
  console.log(\`Hello, I'm \${this.name}\`);
};

const p = new Person('Tom');
p.sayHello(); // Hello, I'm Tom

// 原型链查找
p.toString() // 找到 Object.prototype.toString
\`\`\`

## 继承方式

\`\`\`js
// ES6 class 语法
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(\`\${this.name} makes a sound\`); }
}

class Dog extends Animal {
  speak() { console.log(\`\${this.name} barks\`); }
}

const d = new Dog('Rex');
d.speak(); // Rex barks
\`\`\`

> ES6 class 本质上是原型链的语法糖。`,

    "js-error": `## 错误处理

\`\`\`js
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  console.error('解析失败:', error.message);
} finally {
  console.log('无论如何都会执行');
}
\`\`\`

## 自定义错误

\`\`\`js
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

try {
  throw new ValidationError('email', '邮箱格式不正确');
} catch (e) {
  if (e instanceof ValidationError) {
    console.log(\`\${e.field}: \${e.message}\`);
  }
}
\`\`\`

## 异步错误处理

\`\`\`js
// Promise
fetch('/api').catch(err => console.error(err));

// async/await
async function fetchData() {
  try {
    const res = await fetch('/api');
    return await res.json();
  } catch (err) {
    console.error('请求失败:', err);
  }
}
\`\`\``,

    "js-regex": `## 正则表达式进阶

\`\`\`js
// 常用匹配
/\\d+/         // 一个或多个数字
/^[a-z]\\w{5,}/ // 字母开头，至少6位
/^\\w+@\\w+\\.\\w+$/ // 简单邮箱校验
\`\`\`

## 捕获组

\`\`\`js
const str = '2025-06-28';
const match = str.match(/(\\d{4})-(\\d{2})-(\\d{2})/);
// match[1]='2025', match[2]='06', match[3]='28'

// 命名捕获组
const re = /(?<year>\\d{4})-(?<month>\\d{2})/;
const { groups: { year, month } } = '2025-06'.match(re);
\`\`\`

## 常用方法

\`\`\`js
// test — 是否匹配
/\\d+/.test('abc123');     // true

// exec — 逐个匹配
const re = /\\d+/g;
re.exec('a1b2c3'); // ['1']
re.exec('a1b2c3'); // ['2']

// replace — 替换
'hello world'.replace(/(\\w)/g, c => c.toUpperCase());
// 'Hello World'
\`\`\``,

    "js-obj": `## Object 静态方法

\`\`\`js
const user = { name: 'Tom', age: 25, city: 'Beijing' };

// 获取键/值/键值对
Object.keys(user);    // ['name', 'age', 'city']
Object.values(user);  // ['Tom', 25, 'Beijing']
Object.entries(user); // [['name','Tom'], ['age',25], ['city','Beijing']]

// 对象合并（浅拷贝）
const merged = Object.assign({}, user, { age: 26 });
const spread = { ...user, age: 26 };

// 冻结与密封
Object.freeze(obj);   // 完全不可变
Object.seal(obj);     // 不能增删属性，可以改值

// 判断属性是否存在
Object.hasOwn(user, 'name'); // true（推荐，替代 hasOwnProperty）
\`\`\`

## ES6 Class

\`\`\`js
class Person {
  // 私有字段（ES2022）
  #age;

  constructor(name, age) {
    this.name = name;
    this.#age = age;
  }

  // Getter / Setter
  get info() {
    return \`\${this.name}, \${this.#age}岁\`;
  }

  set age(val) {
    if (val < 0) throw new Error('年龄不能为负');
    this.#age = val;
  }

  // 静态方法
  static create(name) {
    return new Person(name, 0);
  }

  // 静态字段
  static species = 'Homo sapiens';
}

// 继承
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  // 方法重写
  get info() {
    return \`\${super.info}, 年级: \${this.grade}\`;
  }
}

const s = new Student('Tom', 18, 3);
s.info; // 'Tom, 18岁, 年级: 3'
Person.create('Jerry'); // 工厂方法
\`\`\`

> Class 本质是原型继承的语法糖，\`super\` 调用父类构造函数或方法。`,

    "js-proxy": `## Proxy 代理

Proxy 可以拦截对象的基本操作，实现自定义行为：

\`\`\`js
const target = { name: 'Tom', age: 18 };

const proxy = new Proxy(target, {
  get(target, key, receiver) {
    console.log(\`读取 \${key}\`);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    if (key === 'age' && typeof value !== 'number') {
      throw new TypeError('age 必须是数字');
    }
    return Reflect.set(target, key, value, receiver);
  },
  has(target, key) {
    return key in target;
  },
  deleteProperty(target, key) {
    if (key.startsWith('_')) throw new Error('不能删除私有属性');
    return Reflect.deleteProperty(target, key);
  }
});

proxy.name;        // '读取 name' → 'Tom'
proxy.age = 20;    // 设置成功
'name' in proxy;   // true
\`\`\`

## Reflect API

Reflect 提供与 Proxy trap 一一对应的标准方法：

\`\`\`js
const obj = { x: 1, y: 2 };

Reflect.get(obj, 'x');           // 1
Reflect.set(obj, 'x', 10);       // true
Reflect.has(obj, 'x');           // true
Reflect.deleteProperty(obj, 'y'); // true
Reflect.ownKeys(obj);             // ['x']

// Reflect.construct — 替代 new
class Foo { constructor(a, b) { this.sum = a + b; } }
const instance = Reflect.construct(Foo, [1, 2]);

// Reflect.apply — 替代 Function.prototype.apply
Reflect.apply(Math.max, null, [1, 3, 2]); // 3
\`\`\`

> 实际应用：Vue3 响应式系统基于 Proxy + Reflect 实现。`,

    "js-fn": `## this 绑定规则

\`\`\`js
// 1. 默认绑定 — 独立函数调用
function foo() { console.log(this); }
foo(); // window（非严格模式）

// 2. 隐式绑定 — 对象方法调用
const obj = {
  name: 'Tom',
  sayHi() { console.log(this.name); }
};
obj.sayHi(); // 'Tom'

// 3. 显式绑定 — call / apply / bind
function greet(greeting) {
  console.log(\`\${greeting}, \${this.name}\`);
}
greet.call({ name: 'Tom' }, 'Hello');  // Hello, Tom
greet.apply({ name: 'Tom' }, ['Hi']);  // Hi, Tom

const bound = greet.bind({ name: 'Tom' });
bound('Hey'); // Hey, Tom

// 4. new 绑定
function Person(name) { this.name = name; }
new Person('Tom');
\`\`\`

## 箭头函数的 this

箭头函数没有自己的 this，继承外层作用域：

\`\`\`js
const obj = {
  name: 'Tom',
  sayHi() { console.log(this.name); },  // this → obj
  sayBye: () => { console.log(this.name); }, // this → 外层（window）
  delayedGreet() {
    setTimeout(() => {
      console.log(this.name); // 'Tom' — 继承 delayedGreet 的 this
    }, 100);
  }
};
\`\`\`

## Rest 参数

\`\`\`js
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

function log(tag, ...messages) {
  messages.forEach(msg => console.log(\`[\${tag}] \${msg}\`));
}
log('INFO', '启动完成', '端口: 3000');
\`\`\`

> rest 参数 \`...args\` 是真正的数组，\`arguments\` 是类数组对象。`,

    "js-promise": `## Promise 三种状态

- **pending**（待定）：初始状态
- **fulfilled**（已兑现）：操作成功
- **rejected**（已拒绝）：操作失败

状态一旦改变就不可逆。

\`\`\`js
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve('done'), 1000);
});

p.then(val => console.log(val))  // 'done'
 .catch(err => console.error(err))
 .finally(() => console.log('结束'));
\`\`\`

## 链式调用

\`\`\`js
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch(\`/api/posts?userId=\${user.id}\`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));
\`\`\`

## 静态方法

\`\`\`js
// Promise.all — 全部成功才成功
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
]);

// Promise.allSettled — 等待所有完成
const results = await Promise.allSettled([
  fetch('/api/a'),
  fetch('/api/b'),
]);
// [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]

// Promise.race — 第一个完成的结果
const fastest = await Promise.race([
  fetch('/api/data'),
  new Promise((_, rej) => setTimeout(() => rej(new Error('超时')), 5000)),
]);

// Promise.any — 第一个成功的结果
const first = await Promise.any([
  fetch('/mirror1/api'),
  fetch('/mirror2/api'),
]);
\`\`\`

## async/await

\`\`\`js
async function getUserWithPosts(id) {
  try {
    const userRes = await fetch(\`/api/users/\${id}\`);
    const user = await userRes.json();
    const postsRes = await fetch(\`/api/posts?userId=\${id}\`);
    const posts = await postsRes.json();
    return { ...user, posts };
  } catch (err) {
    console.error('获取失败:', err);
    throw err;
  }
}
\`\`\`

> 并行用 \`Promise.all\`，串行用 \`for...of\` + await。`,

    "js-bom": `## window 对象

\`\`\`js
// 窗口尺寸
window.innerWidth;   // 视口宽度
window.innerHeight;  // 视口高度

// 滚动
window.scrollTo(0, 100);
window.scrollBy(0, 50);

// 定时器
const timer = setTimeout(fn, 1000);
clearTimeout(timer);

const interval = setInterval(fn, 1000);
clearInterval(interval);

// requestAnimationFrame — 动画帧
function animate() {
  // 执行动画逻辑
  requestAnimationFrame(animate);
}
\`\`\`

## navigator 对象

\`\`\`js
navigator.userAgent;     // 浏览器标识
navigator.language;      // 'zh-CN'
navigator.onLine;        // 网络是否在线

// 地理位置
navigator.geolocation.getCurrentPosition(
  pos => console.log(pos.coords.latitude),
  err => console.error(err)
);

// 剪切板
await navigator.clipboard.writeText('复制的文本');
const text = await navigator.clipboard.readText();
\`\`\`

## location 对象

\`\`\`js
// 假设 URL: https://example.com:8080/path?page=1#sec
location.href;     // 完整 URL
location.protocol; // 'https:'
location.host;     // 'example.com:8080'
location.pathname; // '/path'
location.search;   // '?page=1'
location.hash;     // '#sec'

location.href = 'https://example.com'; // 跳转
location.reload();                      // 刷新
location.replace('/new');              // 替换（无历史记录）
\`\`\`

## history 对象

\`\`\`js
history.back();    // 后退
history.forward(); // 前进
history.go(-2);    // 后退两步

// pushState（SPA 路由基础）
history.pushState({ page: 1 }, '', '/page1');

window.addEventListener('popstate', (e) => {
  console.log('当前状态:', e.state);
});
\`\`\``,
  },

  es6: {
    "es6-let": `## 块级作用域

ES6 引入 \`let\` 和 \`const\`，带来了真正的块级作用域：

\`\`\`js
{
  let a = 10;
  const b = 20;
}
// a 和 b 在此处不可访问
\`\`\`

### 经典面试题：循环中的闭包

\`\`\`js
// var 的问题
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 输出：3, 3, 3

// let 解决
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// 输出：0, 1, 2
\`\`\`

每次循环会创建一个新的块级作用域，\`i\` 在每个作用域中是独立的。

## 暂时性死区（TDZ）

\`\`\`js
// 在声明之前访问会报错
console.log(a); // ReferenceError
let a = 1;

// typeof 不再安全
console.log(typeof undeclaredVar); // 'undefined' (var 环境)
console.log(typeof x); // ReferenceError (let 环境，TDZ)
let x = 1;
\`\`\`

## const 的本质

\`const\` 保证的是变量绑定的不可变，而非值的不可变：

\`\`\`js
const arr = [1, 2, 3];
arr.push(4);      // 可以
arr = [5, 6];     // TypeError

const obj = { x: 1 };
obj.x = 2;        // 可以
obj = {};         // TypeError

// 真正的不可变需要 Object.freeze
const frozen = Object.freeze({ x: 1 });
frozen.x = 2; // 静默失败
\`\`\``,

    "es6-destr": `## 数组解构

\`\`\`js
// 基本用法
const [a, b, c] = [1, 2, 3];

// 跳过元素
const [first, , third] = [1, 2, 3]; // first=1, third=3

// 默认值
const [x = 0, y = 0] = [1]; // x=1, y=0

// 剩余元素
const [head, ...tail] = [1, 2, 3, 4]; // head=1, tail=[2,3,4]

// 交换变量（不需要临时变量）
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1
\`\`\`

## 对象解构

\`\`\`js
// 基本用法
const { name, age } = { name: 'Tom', age: 25 };

// 重命名
const { name: userName } = { name: 'Tom' };
// userName = 'Tom', name is not defined

// 嵌套解构
const { address: { city } } = { address: { city: 'Beijing' } };

// 默认值 + 重命名
const { x: newX = 0 } = {};

// 函数参数解构
function createUser({ name, age = 18 }) {
  return { name, age };
}
\`\`\`

## 实际应用场景

\`\`\`js
// 1. 从 API 响应中提取字段
const { data: { list, total } } = await fetch('/api/users');

// 2. React Hooks 解构
const [count, setCount] = useState(0);

// 3. 配置对象参数
function connect({ host = 'localhost', port = 3306, database }) {
  // ...
}
\`\`\``,

    "es6-promise": `## Promise 基础

Promise 是异步编程的一种解决方案，避免回调地狱：

\`\`\`js
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve('完成');
    } else {
      reject(new Error('失败'));
    }
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error))
  .finally(() => console.log('结束'));
\`\`\`

## Promise 链式调用

\`\`\`js
fetch('/api/user')
  .then(res => res.json())
  .then(user => fetch(\`/api/posts?userId=\${user.id}\`))
  .then(res => res.json())
  .then(posts => console.log(posts))
  .catch(err => console.error(err));
\`\`\`

## Promise 静态方法

\`\`\`js
// Promise.all — 全部成功才成功，一个失败即失败
const [users, posts] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json())
]);

// Promise.allSettled — 等待所有完成（不管成功失败）
const results = await Promise.allSettled([
  fetch('/api/a'),
  fetch('/api/b'),
]);
// [{ status: 'fulfilled', value: ... }, { status: 'rejected', reason: ... }]

// Promise.race — 第一个完成的结果
const result = await Promise.race([
  fetch('/api/data'),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('超时')), 5000)
  )
]);

// Promise.any — 第一个成功的结果
const first = await Promise.any([
  fetch('/mirror1/api'),
  fetch('/mirror2/api'),
]);
\`\`\`

## async/await

\`\`\`js
async function getUserData(userId) {
  try {
    const userRes = await fetch(\`/api/users/\${userId}\`);
    const user = await userRes.json();

    const postsRes = await fetch(\`/api/posts?userId=\${userId}\`);
    const posts = await postsRes.json();

    return { ...user, posts };
  } catch (error) {
    console.error('获取用户数据失败:', error);
    throw error;
  }
}
\`\`\``,

    "es6-class": `## Class 类

ES6 的 class 语法是原型继承的语法糖：

\`\`\`js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(\`Hi, I'm \${this.name}\`);
  }

  static create(name) {
    return new Person(name, 0);
  }
}

class Student extends Person {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
\`\`\`

## Getter / Setter

\`\`\`js
class User {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return \`\${this.firstName} \${this.lastName}\`;
  }

  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
}
\`\`\``,

    "es6-proxy": `## Proxy 代理

\`\`\`js
const target = { name: 'Tom', age: 18 };

const proxy = new Proxy(target, {
  get(target, key) {
    console.log(\`读取 \${key}\`);
    return target[key];
  },
  set(target, key, value) {
    console.log(\`设置 \${key} = \${value}\`);
    target[key] = value;
    return true;
  }
});

proxy.name;  // '读取 name' → 'Tom'
proxy.age = 20; // '设置 age = 20'
\`\`\`

## Reflect

Reflect 提供与 Proxy 对应的标准方法：

\`\`\`js
Reflect.get(obj, 'name');
Reflect.set(obj, 'name', 'Jerry');
Reflect.has(obj, 'name');
Reflect.deleteProperty(obj, 'age');
\`\`\``,

    "es6-setmap": `## Set — 唯一值集合

\`\`\`js
const s = new Set([1, 2, 3, 3, 4]);
s.size;      // 4
s.has(2);    // true
s.add(5);
s.delete(1);

// 数组去重
const arr = [...new Set([1, 2, 2, 3])]; // [1, 2, 3]

// 并集/交集/差集
const union = new Set([...a, ...b]);
const intersect = new Set([...a].filter(x => b.has(x)));
\`\`\`

## Map — 键值对集合

\`\`\`js
const m = new Map();
m.set('name', 'Tom');
m.set({}, 'object key'); // 对象可以作为 key
m.get('name');  // 'Tom'
m.has('name');  // true
m.size;         // 2

// 遍历
for (const [key, value] of m) { /* ... */ }
\`\`\`

> Map vs Object：Map 的 key 可以是任意类型，保持插入顺序，size 属性直接获取。`,

    "es6-async": `## async/await 详解

async 函数返回 Promise，await 暂停执行等待 Promise 完成。

\`\`\`js
async function getUser(id) {
  const res = await fetch(\`/api/users/\${id}\`);
  const user = await res.json();
  return user;
}

// 等价于
function getUser(id) {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json());
}
\`\`\`

## 错误处理

\`\`\`js
async function main() {
  try {
    const data = await riskyOperation();
  } catch (err) {
    console.error(err);
  } finally {
    cleanup();
  }
}
\`\`\`

## 并发执行

\`\`\`js
// 并行（推荐）
const [users, posts] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
]);

// 串行
for (const id of ids) {
  const user = await fetchUser(id);
}
\`\`\``,
  },

  "es6-str": `## 模板字符串

\`\`\`js
const name = 'Tom';
const age = 25;

// 基本用法
const msg = \`我叫\${name}，今年\${age}岁\`;

// 多行字符串
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>年龄: \${age}</p>
  </div>
\`;

// 表达式
const result = \`\${1 + 1}\`; // '2'
\`\`\`

## Tagged Templates

\`\`\`js
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const val = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
    return result + str + val;
  }, '');
}

const output = highlight\`你好\${name}，欢迎！\`;
// '你好<mark>Tom</mark>，欢迎！'
\`\`\`

## 新增字符串方法

\`\`\`js
const str = 'Hello, World!';

// includes — 是否包含
str.includes('World');    // true

// startsWith / endsWith
str.startsWith('Hello');  // true
str.endsWith('World!');   // true

// repeat — 重复
'ab'.repeat(3);           // 'ababab'

// padStart / padEnd — 填充
'5'.padStart(3, '0');     // '005'
'5'.padEnd(3, '0');       // '500'

// trimStart / trimEnd
'  hello  '.trimStart();  // 'hello  '
'  hello  '.trimEnd();    // '  hello'
\`\`\``,

  "es6-fn": `## 箭头函数

\`\`\`js
// 基本写法
const add = (a, b) => a + b;

// 单参数可省略括号
const double = n => n * 2;

// 函数体用大括号时需 return
const greet = name => {
  const msg = \`Hello, \${name}\`;
  return msg;
};

// 返回对象字面量
const getUser = () => ({ name: 'Tom', age: 25 });
\`\`\`

> 箭头函数没有自己的 \`this\`、\`arguments\`、\`super\`，不能用作构造函数。

## 默认参数

\`\`\`js
function createUser(name, role = 'user', active = true) {
  return { name, role, active };
}

createUser('Tom');           // { name: 'Tom', role: 'user', active: true }
createUser('Admin', 'admin'); // { name: 'Admin', role: 'admin', active: true }

// 默认参数可以引用前面的参数
function createPoint(x = 0, y = x) {
  return { x, y };
}
\`\`\`

## Rest / Spread 在函数中的应用

\`\`\`js
// Rest 收集参数
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3); // 6

function log(level, ...args) {
  console.log(\`[\${level}]\`, ...args);
}
log('INFO', 'server', 'started');

// Spread 展开参数
const nums = [1, 2, 3];
Math.max(...nums); // 3

// 合并用法
function wrapper(...args) {
  return originalFn(...args);
}
\`\`\``,

  "es6-symbol": `## Symbol 基础

Symbol 是唯一的、不可变的原始值，常用于对象属性的唯一键：

\`\`\`js
const s1 = Symbol('desc');
const s2 = Symbol('desc');
s1 === s2; // false — 每个 Symbol 都是唯一的

// 作为对象属性（不会被 for...in 枚举）
const id = Symbol('id');
const user = { name: 'Tom', [id]: 123 };
user[id]; // 123
\`\`\`

## Symbol.for — 全局注册表

\`\`\`js
// Symbol.for 会在全局注册表中查找或创建
const s1 = Symbol.for('key');
const s2 = Symbol.for('key');
s1 === s2; // true

Symbol.keyFor(s1); // 'key'
\`\`\`

## 内置 Symbol（Well-known Symbols）

\`\`\`js
// Symbol.iterator — 定义迭代行为
const collection = {
  items: [1, 2, 3],
  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
        value: this.items[i],
        done: i++ >= this.items.length
      })
    };
  }
};
for (const item of collection) console.log(item); // 1, 2, 3

// Symbol.toPrimitive — 类型转换
const money = {
  value: 100,
  currency: 'CNY',
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') return this.value;
    if (hint === 'string') return \`\${this.value} \${this.currency}\`;
    return this.value;
  }
};
+money;       // 100
\`\${money}\`;  // '100 CNY'
\`\`\``,

  "es6-iter": `## 可迭代协议（Iterable）

实现了 \`Symbol.iterator\` 方法的对象是可迭代的：

\`\`\`js
// 内置可迭代类型：Array, String, Map, Set, arguments
for (const item of [1, 2, 3]) { /* ... */ }
for (const char of 'hello') { /* ... */ }
for (const [key, val] of new Map([['a', 1]])) { /* ... */ }
\`\`\`

## 迭代器协议（Iterator）

迭代器是实现了 \`next()\` 方法的对象：

\`\`\`js
function createRange(start, end) {
  return {
    [Symbol.iterator]() {
      let current = start;
      return {
        next() {
          return current <= end
            ? { value: current++, done: false }
            : { done: true };
        }
      };
    }
  };
}

for (const num of createRange(1, 5)) {
  console.log(num); // 1, 2, 3, 4, 5
}
\`\`\`

## for...of vs for...in

\`\`\`js
// for...of — 遍历值（适用于可迭代对象）
for (const val of [10, 20, 30]) { /* 10, 20, 30 */ }

// for...in — 遍历键（适用于对象）
for (const key in { a: 1, b: 2 }) { /* 'a', 'b' */ }

// 数组遍历推荐 for...of 或 forEach
// 对象遍历推荐 Object.keys/values/entries
\`\`\`

## 生成器作为迭代器

\`\`\`js
function* range(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

// 展开运算符
const nums = [...range(1, 5)]; // [1, 2, 3, 4, 5]

// 解构
const [first, ...rest] = range(1, 5);
\`\`\``,

  "es6-module": `## 基本导出与导入

\`\`\`js
// math.js — 命名导出
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class Calculator { /* ... */ }

// main.js — 命名导入
import { PI, add, Calculator } from './math.js';
import { add as sum } from './math.js'; // 重命名

// 导入所有
import * as math from './math.js';
math.add(1, 2);
\`\`\`

## 默认导出

\`\`\`js
// logger.js — 默认导出
export default function log(msg) {
  console.log(\`[LOG] \${msg}\`);
}

// main.js — 默认导入（名字随意）
import logger from './logger.js';
logger('应用启动');
\`\`\`

## 混合导出

\`\`\`js
// utils.js
export default class Utils {
  static format(str) { return str.trim(); }
}
export const VERSION = '1.0.0';

// main.js
import Utils, { VERSION } from './utils.js';
\`\`\`

## 动态 import()

按需加载模块，返回 Promise：

\`\`\`js
// 路由懒加载
button.addEventListener('click', async () => {
  const module = await import('./heavy-module.js');
  module.init();
});

// 条件加载
if (needChart) {
  const { Chart } = await import('./chart.js');
  new Chart(container);
}

// Vue Router 懒加载
const routes = [
  { path: '/dashboard', component: () => import('./Dashboard.vue') }
];
\`\`\`

> 动态 import 是代码分割和懒加载的基础。`,

  vue: {
    "vue-setup": `## setup 函数

\`setup\` 是组合式 API 的入口，在组件创建之前执行：

\`\`\`js
import { ref, reactive, computed, onMounted } from 'vue';

export default {
  setup() {
    // 基本类型用 ref
    const count = ref(0);
    console.log(count.value); // 0

    // 引用类型用 reactive
    const state = reactive({
      name: 'Vue3',
      version: 3
    });

    // 计算属性
    const doubleCount = computed(() => count.value * 2);

    // 方法
    function increment() {
      count.value++;
    }

    // 生命周期
    onMounted(() => {
      console.log('组件已挂载');
    });

    return { count, state, doubleCount, increment };
  }
};
\`\`\`

## <script setup> 语法糖

\`\`\`vue
<script setup>
import { ref, reactive } from 'vue';

const count = ref(0);
const state = reactive({ name: 'Vue3' });

// 自动暴露给模板，无需 return
const increment = () => count.value++;
</script>

<template>
  <div>{{ state.name }}: {{ count }}</div>
  <button @click="increment">+1</button>
</template>
\`\`\`

## ref vs reactive

\`\`\`js
// ref：可以包装任何类型，模板中自动解包
const count = ref(0);
console.log(count.value); // 需要 .value
// 模板中直接用 {{ count }}

// reactive：只能用于对象，不能解构
const state = reactive({ count: 0 });
// 解构会丢失响应式！
const { count } = state; // ❌ 不再响应式

// 使用 toRefs 保持响应式
const { count } = toRefs(state); // ✅
\`\`\`

> 最佳实践：\`ref\` 用于基本类型和独立变量，\`reactive\` 用于相关联的状态对象。`,

    "vue-proxy": `## Proxy 实现响应式

Vue3 使用 Proxy 替代 Vue2 的 Object.defineProperty：

\`\`\`js
// 简化的响应式实现
const targetMap = new WeakMap();

function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key); // 依赖收集
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver);
      trigger(target, key); // 触发更新
      return result;
    }
  });
}

// 收集依赖
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
    }
    dep.add(activeEffect);
  }
}

// 触发更新
function trigger(target, key) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;
  const dep = depsMap.get(key);
  if (dep) {
    dep.forEach(effect => effect());
  }
}
\`\`\`

## Proxy 的优势

| 特性 | Object.defineProperty | Proxy |
|------|----------------------|-------|
| 数组监听 | 需要重写数组方法 | 原生支持 |
| 新增属性 | 需要 Vue.set | 自动响应 |
| 删除属性 | 需要 Vue.delete | 自动响应 |
| 性能 | 递归遍历所有属性 | 惰性代理 |

\`\`\`js
// Vue2 的问题
const obj = { a: 1 };
Object.defineProperty(obj, 'b', { value: 2 }); // 新增属性不响应

// Vue3 直接支持
const obj = reactive({ a:1 });
obj.b = 2; // 自动响应式
delete obj.a; // 自动响应式
\`\`\``,

    "vue-comm": `## 父子组件通信

### Props + Emits（推荐）

\`\`\`vue
<!-- Parent.vue -->
<Child :msg="message" @update="handleUpdate" />

<!-- Child.vue -->
<script setup>
defineProps({ msg: String });
const emit = defineEmits(['update']);
emit('update', newValue);
</script>
\`\`\`

### v-model 双向绑定

\`\`\`vue
<!-- Parent.vue -->
<Child v-model="searchText" />
<!-- 等价于 -->
<Child :modelValue="searchText" @update:modelValue="searchText = $event" />

<!-- Child.vue -->
<script setup>
defineProps({ modelValue: String });
defineEmits(['update:modelValue']);
</script>
\`\`\`

## 跨层级通信

### provide / inject

\`\`\`vue
<!-- 祖先组件 -->
<script setup>
import { provide, ref } from 'vue';
const theme = ref('dark');
provide('theme', theme);
provide('toggleTheme', () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
});
</script>

<!-- 深层后代组件 -->
<script setup>
import { inject } from 'vue';
const theme = inject('theme');
const toggleTheme = inject('toggleTheme');
</script>
\`\`\`

### 全局状态管理（Pinia）

\`\`\`js
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() { this.count++; }
  }
});
\`\`\`

## 总结

| 方式 | 适用场景 |
|------|---------|
| Props/Emits | 父子组件 |
| v-model | 表单组件双向绑定 |
| provide/inject | 祖先-后代深层传递 |
| Pinia | 全局/复杂状态管理 |`,

    "vue-core-yuque": `## Vue 概念介绍

Vue（读音 /vjuː/，类似于 view）是一套**构建用户界面**的**渐进式框架**。

### 什么是构建用户界面？

基于数据动态渲染页面，将数据转换为用户可见的界面。

### 什么是渐进式？

Vue 的设计注重灵活性，可以被逐步集成：

- **Vue 核心包开发**：局部模块改造
- **Vue 核心包 + 插件 + 工程化**：整站开发

## Vue2 vs Vue3 对比

| 特性 | Vue2 | Vue3 |
|------|------|------|
| 响应式系统 | Object.defineProperty | Proxy |
| 核心架构 | Options API | Composition API |
| 逻辑复用 | mixins | 自定义 Composition 函数 |
| TypeScript | 支持薄弱 | 完全使用 TS 编写 |
| 新特性 | - | Fragment / Teleport / Suspense |
| 构建体积 | 较大 | Tree-shaking，更小 |

## 响应式 — reactive vs ref

\`\`\`ts
// reactive — 用于对象类型
const state = reactive({ count: 0 });
state.count++; // 直接访问

// ref — 支持所有类型
const count = ref(0);
count.value++; // 需要 .value
// 模板中可省略 .value
\`\`\`

**推荐**：确定字段的对象用 \`reactive\`，其他一律用 \`ref\`。

## 常用指令

| 指令 | 作用 |
|------|------|
| \`v-text\` | 类似 innerText |
| \`v-html\` | 类似 innerHTML |
| \`v-show\` | 控制 display 显示/隐藏 |
| \`v-if / v-else / v-else-if\` | 条件渲染，创建/移除 DOM |
| \`v-on:事件\` 或 \`@\` | 事件绑定 |
| \`v-bind:属性\` 或 \`:\` | 属性绑定 |
| \`v-model\` | 双向绑定（表单元素） |
| \`v-for\` | 列表渲染 |

## 计算属性 computed

\`\`\`ts
const list = reactive([
  { name: '苹果', price: 10, count: 2 },
  { name: '香蕉', price: 5, count: 3 },
]);

// 基于现有数据计算新数据
const totalPrice = computed(() => {
  return list.reduce((sum, item) => sum + item.price * item.count, 0);
});
\`\`\`

## 侦听器 watch

\`\`\`ts
// 监听单个数据
watch(count, (newVal, oldVal) => {
  console.log('count变化了', newVal);
});

// 监听多个数据
watch([count, keyword], ([newCount, newKeyword]) => { /* ... */ });

// 深度监听对象
watch(
  () => state.user,
  (newVal) => { /* ... */ },
  { deep: true, immediate: true }
);
\`\`\`

## 生命周期

| 阶段 | 组合式 API |
|------|-----------|
| 创建 | setup() 中直接写 |
| 挂载 | onBeforeMount / onMounted |
| 更新 | onBeforeUpdate / onUpdated |
| 销毁 | onBeforeUnmount / onUnmounted |

## ref 获取 DOM

\`\`\`ts
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(() => {
  inputRef.value?.focus();
});
\`\`\``,

    "vue-app-yuque": `## 组件化开发

一个页面拆分成一个个独立组件，每个组件有独立的结构、样式、行为。

好处：便于维护，利于复用，提升开发效率。

### 组件注册

\`\`\`vue
<!-- 局部注册 — 只在当前组件内可用 -->
<script setup>
import HmHeader from './components/HmHeader.vue';
</script>

<!-- 全局注册 — 任意位置可用 -->
// main.ts
app.component('HmButton', HmButton);
\`\`\`

### 样式隔离 — scoped

\`\`\`vue
<style scoped>
/* 样式只作用于当前组件 */
.btn { color: blue; }
</style>
\`\`\`

scoped 原理：给当前组件标签添加 \`data-v-hash\` 属性，CSS 选择器追加属性选择器。

## 组件通信

### 父传子 — Props

\`\`\`vue
<!-- 父组件 -->
<Child :title="msg" :count="num" />

<!-- 子组件 -->
<script setup>
const props = defineProps<{
  title: string;
  count: number;
}>();
</script>
\`\`\`

### 子传父 — Emit

\`\`\`vue
<!-- 子组件 -->
<script setup>
const emit = defineEmits<{
  change: [id: number];
}>();
emit('change', 123);
</script>

<!-- 父组件 -->
<Child @change="handleChange" />
\`\`\`

### 跨级传递 — provide / inject

\`\`\`ts
// 祖先组件
provide('theme', ref('dark'));
provide('toggleTheme', () => { /* ... */ });

// 深层后代
const theme = inject('theme');
const toggle = inject('toggleTheme');
\`\`\`

## 插槽 Slot

\`\`\`vue
<!-- 默认插槽 -->
<MyDialog>
  <p>自定义内容</p>
</MyDialog>

<!-- 具名插槽 -->
<Layout>
  <template #header>头部</template>
  <template #default>内容</template>
  <template #footer>底部</template>
</Layout>

<!-- 作用域插槽 — 子组件传值给插槽 -->
<MyList :items="list">
  <template #default="{ item, index }">
    <span>{{ index }}. {{ item.name }}</span>
  </template>
</MyList>
\`\`\`

## Vue Router

\`\`\`ts
// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/detail/:id', component: Detail },
];

// 声明式导航
<router-link to="/home">首页</router-link>

// 编程式导航
router.push('/detail/123');
router.push({ name: 'detail', params: { id: 123 } });

// 获取参数
const id = route.params.id;
const keyword = route.query.keyword;
\`\`\`

### 路由懒加载

\`\`\`ts
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue')
  }
];
\`\`\`

## Pinia 状态管理

\`\`\`ts
// stores/channel.ts
import { defineStore } from 'pinia';

export const useChannelStore = defineStore('channel', () => {
  const activeId = ref(1);
  const setActiveId = (id: number) => { activeId.value = id };
  return { activeId, setActiveId };
});

// 组件中使用
const channelStore = useChannelStore();
channelStore.setActiveId(5);
\`\`\``,

    "vue-optimize": `## Vue3 性能优化

### 响应式优化

\`\`\`ts
// shallowRef — 不深度监听大型对象
const bigData = shallowRef({ /* 大量数据 */ });

// 用 computed 缓存计算结果
const filtered = computed(() => list.value.filter(item => item.active));

// v-memo — 跳过子树更新（Vue 3.2+）
<div v-for="item in list" :key="item.id" v-memo="[item.id === selectedId]">
  {{ item.name }}
</div>
\`\`\`

### 列表优化

\`\`\`vue
<!-- 始终使用唯一 key -->
<template v-for="item in list" :key="item.id">
  <ListItem :item="item" />
</template>

<!-- 虚拟滚动 — 大列表只渲染可视区域 -->
<VirtualList :items="list" :item-size="50" />
\`\`\``,

    "vue-ts": `## Vue3 + TypeScript

### Props 类型

\`\`\`ts
defineProps<{
  title: string;
  count?: number;
  items: string[];
}>();
\`\`\`

### Emits 类型

\`\`\`ts
const emit = defineEmits<{
  change: [id: number];
  submit: [data: FormData];
}>();
\`\`\`

### 组件 ref 类型

\`\`\`ts
const inputRef = ref<InstanceType<typeof MyInput>>();
inputRef.value?.focus();
\`\`\``,

    "vue-router": `## 基本配置

\`\`\`ts
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/about', component: () => import('@/views/About.vue') },
  { path: '/user/:id', name: 'user', component: () => import('@/views/User.vue') },
  { path: '/:pathMatch(.*)*', component: () => import('@/views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
\`\`\`

## 路由跳转与传参

\`\`\`vue
<!-- 声明式 -->
<router-link to="/about">关于</router-link>
<router-link :to="{ name: 'user', params: { id: 123 } }">用户</router-link>

<!-- 编程式 -->
<script setup>
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

router.push('/about');
router.push({ name: 'user', params: { id: 123 } });
router.replace('/login');
router.back();

// 获取参数
const id = route.params.id;
const keyword = route.query.keyword;
</script>
\`\`\`

## 导航守卫

\`\`\`ts
// 全局前置守卫
router.beforeEach((to, from) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    return { path: '/login', query: { redirect: to.fullPath } };
  }
});

// 路由元信息
const routes = [
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
];
\`\`\`

## 路由懒加载

\`\`\`ts
// 按路由分割代码
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
  },
];
\`\`\``,

    "vue-pinia": `## 定义 Store

\`\`\`ts
// stores/counter.ts
import { defineStore } from 'pinia';

// Options 风格
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Counter' }),
  getters: {
    doubleCount: (state) => state.count * 2,
    doublePlusOne(): number { return this.doubleCount + 1; },
  },
  actions: {
    increment() { this.count++; },
    async fetchCount() {
      const res = await fetch('/api/count');
      this.count = await res.json();
    },
  },
});
\`\`\`

## Setup 风格（推荐）

\`\`\`ts
// stores/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref('');
  const userInfo = ref<UserInfo | null>(null);

  const isLoggedIn = computed(() => !!token.value);

  function login(data: LoginParams) {
    return api.login(data).then(res => {
      token.value = res.token;
      userInfo.value = res.user;
    });
  }

  function logout() {
    token.value = '';
    userInfo.value = null;
  }

  return { token, userInfo, isLoggedIn, login, logout };
});
\`\`\`

## 在组件中使用

\`\`\`vue
<script setup>
import { useCounterStore } from '@/stores/counter';

const counter = useCounterStore();

// 直接访问
console.log(counter.count);

// 解构（保持响应式）
const { count, doubleCount } = storeToRefs(counter);
const { increment } = counter;

// 订阅状态变化
counter.$subscribe((mutation, state) => {
  console.log('状态变化:', state);
});
</script>
\`\`\``,

    "vue-trans": `## Transition 组件

\`\`\`vue
<template>
  <button @click="show = !show">切换</button>
  <Transition name="fade" mode="out-in">
    <div v-if="show" class="box">内容</div>
  </Transition>
</template>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
\`\`\`

## CSS 过渡与动画

\`\`\`vue
<Transition name="slide">
  <div v-if="show">滑动内容</div>
</Transition>

<style>
.slide-enter-active { transition: transform 0.3s ease; }
.slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from { transform: translateX(-100%); }
.slide-leave-to { transform: translateX(100%); }
</style>
\`\`\`

## JavaScript 钩子

\`\`\`vue
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <div v-if="show">内容</div>
</Transition>

<script setup>
function onEnter(el, done) {
  // 使用 GSAP 等动画库
  gsap.from(el, { opacity: 0, y: 20, onComplete: done });
}
</script>
\`\`\`

## TransitionGroup — 列表过渡

\`\`\`vue
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item.text }}</li>
</TransitionGroup>

<style>
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from { opacity: 0; transform: translateY(-20px); }
.list-leave-to { opacity: 0; transform: translateX(20px); }
.list-move { transition: transform 0.3s ease; }
</style>
\`\`\``,

    "vue-direct": `## 自定义指令基础

\`\`\`vue
<script setup>
// 局部指令
const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
};
</script>

<template>
  <input v-focus placeholder="自动聚焦" />
</template>
\`\`\`

## 指令钩子函数

\`\`\`ts
const myDirective = {
  // 绑定到元素前
  created(el, binding, vnode, prevVnode) {},
  // 插入 DOM 前
  beforeMount(el, binding) {},
  // 插入 DOM 后
  mounted(el, binding) {},
  // 组件更新前
  beforeUpdate(el, binding) {},
  // 组件更新后
  updated(el, binding) {},
  // 卸载前
  beforeUnmount(el, binding) {},
  // 卸载后
  unmounted(el, binding) {},
};
\`\`\`

## binding 对象

\`\`\`ts
// <div v-demo:foo.bar="value">
const vDemo = {
  mounted(el, binding) {
    binding.value;    // 传入的值
    binding.arg;      // 'foo'（参数）
    binding.modifiers; // { bar: true }（修饰符）
    binding.instance;  // 使用指令的组件实例
  },
};
\`\`\`

## 实用示例

\`\`\`ts
// v-permission — 权限控制
const vPermission = {
  mounted(el, binding) {
    const permissions = useUserStore().permissions;
    if (!permissions.includes(binding.value)) {
      el.parentNode?.removeChild(el);
    }
  },
};

// v-debounce — 防抖点击
const vDebounce = {
  mounted(el, binding) {
    let timer: ReturnType<typeof setTimeout>;
    el.addEventListener('click', () => {
      clearTimeout(timer);
      timer = setTimeout(() => binding.value(), 300);
    });
  },
};
\`\`\``,

    "vue-tele": `## Teleport — 传送组件

将组件 DOM 传送到指定位置（如 body）：

\`\`\`vue
<template>
  <button @click="showModal = true">打开弹窗</button>

  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay" @click="showModal = false">
      <div class="modal" @click.stop>
        <h3>弹窗标题</h3>
        <p>弹窗内容</p>
        <button @click="showModal = false">关闭</button>
      </div>
    </div>
  </Teleport>
</template>
\`\`\`

> Teleport 只移动了 DOM 位置，组件的逻辑关系和响应式系统不变。

## 多个 Teleport

\`\`\`vue
<!-- 可以有多个 Teleport 到同一目标 -->
<Teleport to="body">
  <Toast message="操作成功" />
</Teleport>

<Teleport to="body">
  <ConfirmDialog />
</Teleport>
\`\`\`

## Suspense — 异步组件

\`\`\`vue
<script setup>
import { defineAsyncComponent } from 'vue';

// 异步加载组件
const AsyncChart = defineAsyncComponent(() => import('./Chart.vue'));
</script>

<template>
  <Suspense>
    <!-- 默认插槽：异步组件 -->
    <template #default>
      <AsyncChart />
    </template>

    <!-- fallback 插槽：加载中 -->
    <template #fallback>
      <div class="loading">加载中...</div>
    </template>
  </Suspense>
</template>
\`\`\`

## 配合 setup 语法糖

\`\`\`vue
<script setup>
// 顶层 await 会自动让组件变为异步
const data = await fetch('/api/data').then(r => r.json());
</script>

<template>
  <!-- 父组件需要 Suspense 包裹 -->
  <Suspense>
    <template #default>
      <AsyncChild />
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
\`\`\`

> Suspense 目前仍是实验性 API，生产环境需谨慎使用。`,
  },


  react: {
    "react-hooks": `## useState

管理组件内部状态：

\`\`\`jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(prev => prev + 1)}>+1 (函数式)</button>
    </div>
  );
}
\`\`\`

**注意**：对象/数组更新需要创建新引用：

\`\`\`jsx
// ❌ 不会触发重新渲染
state.name = 'new';
arr.push(item);

// ✅ 正确做法
setState({ ...state, name: 'new' });
setArr([...arr, item]);
\`\`\`

## useEffect

处理副作用：数据获取、订阅、手动 DOM 操作。

\`\`\`jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  // 组件挂载 + userId 变化时执行
  useEffect(() => {
    let cancelled = false;

    fetch(\`/api/users/\${userId}\`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setUser(data);
      });

    // 清理函数：取消请求，防止内存泄漏
    return () => { cancelled = true; };
  }, [userId]); // 依赖数组

  return <div>{user?.name}</div>;
}
\`\`\`

## useRef

获取 DOM 引用或保存不触发渲染的值：

\`\`\`jsx
import { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // 直接操作 DOM
  }, []);

  return <input ref={inputRef} />;
}

// 保存上一次的值
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => { ref.current = value; });
  return ref.current;
}
\`\`\``,

    "react-custom": `## 什么是自定义 Hook

自定义 Hook 是以 \`use\` 开头的 JavaScript 函数，可以调用其他 Hook：

\`\`\`jsx
// useLocalStorage — 持久化状态
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// 使用
const [theme, setTheme] = useLocalStorage('theme', 'light');
\`\`\`

## 常用自定义 Hook

### useDebounce

\`\`\`jsx
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

// 搜索框防抖
function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounce(keyword, 500);

  useEffect(() => {
    if (debouncedKeyword) {
      fetchSearchResults(debouncedKeyword);
    }
  }, [debouncedKeyword]);

  return <input value={keyword} onChange={e => setKeyword(e.target.value)} />;
}
\`\`\`

### useRequest

\`\`\`jsx
function useRequest(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetcher()
      .then(res => { setData(res); setError(null); })
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, deps);

  return { data, loading, error, reload: () => {/*...*/} };
}

// 使用
const { data: users, loading, error } = useRequest(
  () => fetch('/api/users').then(r => r.json()),
  []
);
\`\`\`

## 设计原则

1. **单一职责**：一个 Hook 做一件事
2. **命名规范**：以 \`use\` 开头
3. **返回值**：优先返回数组（像 useState）或对象
4. **可测试性**：逻辑与 UI 分离`,

    "react-event": `## 事件绑定

React 中事件绑定通过 \`on + 事件名称 = { 处理函数 }\`，遵循驼峰命名：

\`\`\`tsx
function App() {
  const clickHandler = () => {
    console.log('按钮被点击了');
  };

  return <button onClick={clickHandler}>click me</button>;
}
\`\`\`

### 使用事件对象

\`\`\`tsx
const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  console.log('事件对象:', e.target);
};
\`\`\`

### 传递自定义参数

\`\`\`tsx
// 箭头函数包裹
<button onClick={() => clickHandler('jack')}>click me</button>

// 同时传递事件对象和参数
<button onClick={(e) => clickHandler(e, 'jack')}>click me</button>
\`\`\`

## 表单处理

\`\`\`tsx
function App() {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('提交:', value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={value} onChange={handleChange} />
      <button type="submit">提交</button>
    </form>
  );
}
\`\`\``,

    "react-component": `## 组件通信

### 父传子 — Props

\`\`\`tsx
// 父组件
function Parent() {
  return <Child title="hello" count={10} />;
}

// 子组件
interface ChildProps {
  title: string;
  count: number;
}

function Child({ title, count }: ChildProps) {
  return <div>{title}: {count}</div>;
}
\`\`\`

### 子传父 — 回调函数

\`\`\`tsx
function Parent() {
  const [count, setCount] = useState(0);
  const handleChange = (val: number) => setCount(val);
  return <Child onChange={handleChange} />;
}

function Child({ onChange }: { onChange: (val: number) => void }) {
  return <button onClick={() => onChange(1)}>+1</button>;
}
\`\`\`

### 兄弟组件通信

通过共同的父组件作为桥梁：状态提升到父组件，通过 props 分发给兄弟组件。

### Context 跨层级通信

\`\`\`tsx
const ThemeContext = createContext('light');

// 提供者
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// 消费者
const theme = useContext(ThemeContext);
\`\`\``,

    "react-redux": `## Redux 核心概念

Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。

### 三大原则

1. **单一数据源**：整个应用的 state 存储在单一 store 中
2. **State 只读**：唯一改变 state 的方式是触发 action
3. **使用纯函数**：通过 reducer 函数执行修改

### 核心流程

\`\`\`
View → dispatch(action) → reducer → store → View 更新
\`\`\`

## 基本使用

\`\`\`ts
// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// store/counterSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    add: (state, action) => { state.value += action.payload; },
  },
});

export const { increment, decrement, add } = counterSlice.actions;
export default counterSlice.reducer;
\`\`\`

### 组件中使用

\`\`\`tsx
import { useSelector, useDispatch } from 'react-redux';
import { increment } from './store/counterSlice';

function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(increment())}>+1</button>
    </div>
  );
}
\`\`\`

### 异步操作 — createAsyncThunk

\`\`\`tsx
export const fetchUser = createAsyncThunk(
  'user/fetch',
  async (id: number) => {
    const res = await fetch(\`/api/users/\${id}\`);
    return res.json();
  }
);
\`\`\``,

    "react-router2": `## React Router 基础

\`\`\`tsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">首页</Link>
        <Link to="/about">关于</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

## 路由跳转与传参

\`\`\`tsx
// 声明式
<Link to="/detail/123">详情</Link>

// 编程式
const navigate = useNavigate();
navigate('/detail/123');
navigate(-1); // 返回上一页

// 动态路由参数
<Route path="/detail/:id" element={<Detail />} />
const { id } = useParams();

// 查询参数
navigate('/search?keyword=react');
const [searchParams] = useSearchParams();
const keyword = searchParams.get('keyword');
\`\`\`

## 嵌套路由

\`\`\`tsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<Overview />} />
  <Route path="settings" element={<Settings />} />
</Route>

// Dashboard 中渲染子路由
import { Outlet } from 'react-router-dom';
function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
\`\`\`

## 路由守卫

\`\`\`tsx
function AuthRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

// 使用
<Route path="/dashboard" element={<AuthRoute><Dashboard /></AuthRoute>} />
\`\`\``,

    "react-ts": `## React + TypeScript 环境搭建

\`\`\`bash
npx create-react-app my-app --template typescript
# 或
npm create vite@latest my-app -- --template react-ts
\`\`\`

## 组件类型定义

\`\`\`tsx
// Props 类型
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ variant = 'primary', size = 'md', onClick, children }: ButtonProps) => {
  return <button className={\`btn btn-\${variant} btn-\${size}\`} onClick={onClick}>{children}</button>;
};
\`\`\`

## Hooks 类型

\`\`\`tsx
// useState 类型推断
const [count, setCount] = useState(0);        // number
const [user, setUser] = useState<User | null>(null);

// useRef
const inputRef = useRef<HTMLInputElement>(null);

// useReducer
type State = { count: number };
type Action = { type: 'increment' | 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
  }
}
\`\`\`

## 事件类型

\`\`\`tsx
// 常用事件类型
React.ChangeEvent<HTMLInputElement>
React.FormEvent<HTMLFormElement>
React.MouseEvent<HTMLButtonElement>
React.KeyboardEvent<HTMLInputElement>
\`\`\``,

    "react-project": `## 项目前置准备

### 技术栈

- React 18 + TypeScript
- React Router 6 — 路由管理
- Redux Toolkit — 状态管理
- Axios — 网络请求
- Ant Design — UI 组件库

### 项目结构

\`\`\`
src/
├── pages/          # 页面组件
│   ├── Login/
│   ├── Home/
│   └── Dashboard/
├── components/     # 公共组件
├── store/          # Redux 状态
├── utils/          # 工具函数
├── api/            # 接口封装
└── router/         # 路由配置
\`\`\`

## 登录模块

\`\`\`tsx
// 封装 axios 实例
const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// 登录页
function Login() {
  const navigate = useNavigate();
  const onFinish = async (values: { mobile: string; code: string }) => {
    const res = await request.post('/auth/login', values);
    localStorage.setItem('token', res.data.token);
    navigate('/');
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="mobile" rules={[{ required: true }]}>
        <Input placeholder="手机号" />
      </Form.Item>
      <Form.Item name="code" rules={[{ required: true }]}>
        <Input placeholder="验证码" />
      </Form.Item>
      <Button type="primary" htmlType="submit">登录</Button>
    </Form>
  );
}
\`\`\`

## Layout 布局

\`\`\`tsx
function Layout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <Menu items={[
          { key: '/', label: <Link to="/">首页</Link> },
          { key: '/article', label: <Link to="/article">文章</Link> },
        ]} />
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
\`\`\``,

    "react-jsx": `## JSX 表达式

JSX 是 JavaScript 的语法扩展，最终编译为 \`React.createElement\` 调用：

\`\`\`jsx
// 变量和表达式
const name = 'Tom';
const element = <h1>Hello, {name}</h1>;

// 函数调用
const formatName = (user) => \`\${user.firstName} \${user.lastName}\`;
const element = <h1>Hello, {formatName(user)}</h1>;

// 属性（className 替代 class，htmlFor 替代 for）
const element = <img src={url} alt="photo" className="avatar" />;
\`\`\`

## 条件渲染

\`\`\`jsx
// if / else
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) return <h1>欢迎回来！</h1>;
  return <h1>请登录</h1>;
}

// 三元表达式
<div>{isLoggedIn ? <UserPanel /> : <LoginForm />}</div>

// && 短路渲染
{unreadCount > 0 && <Badge count={unreadCount} />}

// null 不渲染
function Warning({ show }) {
  if (!show) return null;
  return <div className="warning">警告信息</div>;
}
\`\`\`

## 列表渲染

\`\`\`jsx
const users = [
  { id: 1, name: 'Tom' },
  { id: 2, name: 'Jerry' },
];

// 必须提供 key
<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>

// 带索引的复杂列表
function UserList({ users }) {
  return (
    <table>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{index + 1}</td>
            <td>{user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
\`\`\`

## Fragment

避免额外的 DOM 节点：

\`\`\`jsx
// 完整写法
import { Fragment } from 'react';
<Fragment><td>A</td><td>B</td></Fragment>

// 短语法（推荐）
<><td>A</td><td>B</td></>

// 带 key 的 Fragment
<Fragment key={item.id}>{item.content}</Fragment>
\`\`\`

> key 帮助 React 识别列表中哪些元素发生变化，不要用 index 作为 key（除非列表不会增删排序）。`,

    "react-context": `## createContext 基础

\`\`\`tsx
import { createContext, useContext, useState } from 'react';

// 创建 Context
const ThemeContext = createContext('light');

// Provider 提供值
function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        切换主题
      </button>
    </ThemeContext.Provider>
  );
}

// Consumer 消费值
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>主题按钮</button>;
}
\`\`\`

## 多 Context 组合

\`\`\`tsx
const ThemeContext = createContext('light');
const UserContext = createContext(null);

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <UserContext.Provider value={{ name: 'Tom' }}>
        <MainContent />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

function MainContent() {
  const theme = useContext(ThemeContext);
  const user = useContext(UserContext);
  return <div className={theme}>欢迎, {user.name}</div>;
}
\`\`\`

## Context + useReducer 状态管理

\`\`\`tsx
const StoreContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: return state;
  }
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function Counter() {
  const { state, dispatch } = useContext(StoreContext);
  return (
    <div>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
    </div>
  );
}
\`\`\`

## 性能优化

\`\`\`tsx
// Context 值变化会导致所有消费者重新渲染
// 方案1：拆分 Context
const ThemeContext = createContext('light');
const UserContext = createContext(null);

// 方案2：useMemo 缓存 value
function App() {
  const [theme, setTheme] = useState('light');
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
\`\`\`

> 适用场景：主题、语言、用户信息等全局配置。高频更新的状态（如表单输入）不适合用 Context。`,
  },


  typescript: {
    "ts-basic": `## 基本类型

\`\`\`ts
// 基础类型注解
let name: string = 'Tom';
let age: number = 25;
let isActive: boolean = true;
let items: string[] = ['a', 'b'];
let tuple: [string, number] = ['Tom', 25];

// 联合类型
let id: string | number = 'abc123';
id = 123;

// 字面量类型
type Direction = 'up' | 'down' | 'left' | 'right';
let move: Direction = 'up';
\`\`\`

## 类型推断

TypeScript 能自动推断类型，不需要显式标注：

\`\`\`ts
let count = 0;        // 推断为 number
let items = [1, 2];   // 推断为 number[]
const name = 'Tom';   // 推断为 'Tom'（字面量类型）

// 函数返回值推断
function add(a: number, b: number) {
  return a + b; // 推断返回值为 number
}
\`\`\`

> **最佳实践**：能推断就不写类型，但函数参数和导出 API 建议显式标注。

## any、unknown、never

\`\`\`ts
// any — 关闭类型检查（尽量避免）
let data: any = 'hello';
data.foo.bar; // 不报错，但运行时可能出错

// unknown — 类型安全的 any
let input: unknown = 'hello';
input.toUpperCase(); // ❌ Error
if (typeof input === 'string') {
  input.toUpperCase(); // ✅ 类型收窄后可用
}

// never — 永远不会有返回值
function throwError(msg: string): never {
  throw new Error(msg);
}

function exhaustive(x: never): never {
  throw new Error('未处理的类型');
}
\`\`\``,

    "ts-interface": `## interface 定义对象形状

\`\`\`ts
interface User {
  id: number;
  name: string;
  email?: string;     // 可选属性
  readonly createdAt: Date; // 只读属性
}

const user: User = {
  id: 1,
  name: 'Tom',
  createdAt: new Date(),
};
\`\`\`

## interface 扩展

\`\`\`ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// 多重继承
interface GuideDog extends Dog, Worker {
  trained: boolean;
}
\`\`\`

## type 类型别名

\`\`\`ts
// 联合类型（interface 做不到）
type Result = 'success' | 'error' | 'pending';
type ID = string | number;

// 交叉类型
type Admin = User & { role: 'admin'; permissions: string[] };

// 函数类型
type Handler = (event: Event) => void;

// 条件类型
type ApiResponse<T> = T extends string ? StringResponse : JsonResponse;
\`\`\`

## interface vs type 怎么选？

| 场景 | 推荐 |
|------|------|
| 定义对象/类的形状 | interface |
| 联合类型/交叉类型 | type |
| 三方库的公共 API | interface（便于扩展）|
| 工具类型 | type |

> 简单原则：**能用 interface 就用 interface**，需要联合/交叉类型时用 type。`,

    "ts-yuque": `## TypeScript 介绍

TypeScript 是一种带有**类型语法**的 JavaScript 语言，在任何使用 JavaScript 的开发场景中都可以使用。

\`\`\`ts
// JavaScript — 没有明确的类型
let age = 18;

// TypeScript — 有明确的类型
let age: number = 18;
\`\`\`

> TS 是 JS 的超集，支持 JS 语法并扩展了类型语法。TS 需要编译才能在浏览器运行。

## TypeScript 编译

\`\`\`bash
# 全局安装
npm install -g typescript

# 查看版本
tsc --version

# 编译 TS 文件
tsc hello.ts    # 生成 hello.js
node hello.js   # 验证执行
\`\`\`

> 开发中一般使用 webpack/vite 等工具自动构建编译，不需要手动 tsc。

## Vite 开发环境

\`\`\`bash
# 创建 Vite + TS 项目
pnpm create vite my-app --template vue-ts

# 安装依赖并启动
cd my-app
pnpm install
pnpm dev
\`\`\`

Vite 提供了内置开发服务器和自动编译，非常适合学习 TS 语法。

## TS 类型系统

### 字面量类型

\`\`\`ts
// 使用 JS 字面量作为类型
let str1 = 'hello';       // 推断类型: string
const str2 = 'Hello TS';  // 推断类型: 'Hello TS'（字面量类型）

// 字面量联合类型 — 限定取值范围
type Direction = 'up' | 'down' | 'left' | 'right';
function move(dir: Direction) { /* ... */ }
\`\`\`

### any 类型

\`\`\`ts
// 显式 any — 关闭类型检查
let data: any = 'hello';
data.foo.bar; // 不报错，但运行时可能出错

// 隐式 any — 声明时未给类型
let x; // 隐式 any
\`\`\`

> any 使用越多，程序漏洞越多。尽量避免使用。

## TS 类型声明文件

### .ts vs .d.ts

| 文件类型 | 作用 |
|---------|------|
| \`.ts\` | 包含类型信息和可执行代码，编译为 .js |
| \`.d.ts\` | 只包含类型声明，不生成 .js，用于提供类型信息 |

### 内置类型声明

TypeScript 为所有 JS 内置 API 提供了类型声明（如 \`lib.es5.d.ts\`、\`lib.dom.d.ts\`）。

### 第三方库类型声明

\`\`\`bash
# 情况1：库自带类型声明（如 axios）
npm install axios

# 情况2：需要额外安装 @types 包（如 jquery）
npm install jquery @types/jquery
\`\`\`

### 自定义类型声明 — 共享类型

\`\`\`ts
// src/types/data.d.ts
export interface User {
  id: number;
  name: string;
}

// main.ts
import { User } from './types/data';
const user: User = { id: 1, name: 'Tom' };
\`\`\`

### 给 JS 文件提供类型

\`\`\`ts
// add/index.js
export function add(a, b) { return a + b; }

// add/index.d.ts — 用 declare 声明类型
export declare function add(a: number, b: number): number;
\`\`\``,

    "ts-enum": `## 枚举

\`\`\`ts
// 数字枚举
enum Direction { Up, Down, Left, Right }
Direction.Up;    // 0
Direction[0];    // 'Up'

// 字符串枚举
enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

// const 枚举 — 编译时内联，更高效
const enum Color { Red, Green, Blue }
\`\`\``,

    "ts-util": `## 工具类型

\`\`\`ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial — 所有属性可选
type UpdateUser = Partial<User>;

// Required — 所有属性必填
type FullUser = Required<User>;

// Pick — 选取部分属性
type UserBasic = Pick<User, 'id' | 'name'>;

// Omit — 排除部分属性
type UserWithoutAge = Omit<User, 'age'>;

// Record — 键值对类型
type UserMap = Record<string, User>;

// ReturnType — 获取函数返回类型
type FnReturn = ReturnType<typeof getUser>;
\`\`\``,

    "ts-declare": `## 声明文件

### 为 JS 文件提供类型

\`\`\`ts
// utils.d.ts
export declare function formatDate(date: Date): string;
export declare function debounce<T extends (...args: any[]) => any>(fn: T, delay: number): T;
\`\`\`

### 扩展全局类型

\`\`\`ts
// global.d.ts
declare global {
  interface Window {
    __APP_CONFIG__: { version: string };
  }
}
export {};
\`\`\`

### 模块声明

\`\`\`ts
declare module 'my-lib' {
  export function doSomething(x: number): string;
}
\`\`\``,

    "ts-generic": `## 泛型

泛型让组件可工作于多种类型，而非单一类型。

### 泛型函数

\`\`\`ts
function identity<T>(arg: T): T {
  return arg;
}

identity<string>('hello'); // 显式指定
identity(42);              // 类型推断
\`\`\`

### 泛型约束

\`\`\`ts
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello');   // ✅ string 有 length
logLength([1, 2, 3]); // ✅ array 有 length
logLength(123);       // ❌ number 没有 length
\`\`\`

### 泛型接口

\`\`\`ts
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

interface User { id: number; name: string; }

const res: ApiResponse<User> = {
  code: 200,
  data: { id: 1, name: 'Tom' },
  message: 'success',
};
\`\`\`

### 泛型工具类型

\`\`\`ts
type PartialUser = Partial<User>;
type RequiredUser = Required<PartialUser>;
type UserBasic = Pick<User, 'id' | 'name'>;
type UserWithoutId = Omit<User, 'id'>;
type UserMap = Record<string, User>;
\`\`\``,

    "ts-advanced": `## 高级类型

### 条件类型

\`\`\`ts
type IsString<T> = T extends string ? 'yes' : 'no';

type A = IsString<string>;  // 'yes'
type B = IsString<number>;  // 'no'
\`\`\`

### infer 关键字

\`\`\`ts
// 提取函数返回类型
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Fn = () => string;
type R = ReturnType<Fn>;  // string
\`\`\`

### 映射类型

\`\`\`ts
type Readonly<T> = {
  readonly [K in keyof T]: T[K];
};

type Optional<T> = {
  [K in keyof T]?: T[K];
};
\`\`\`

### 模板字面量类型

\`\`\`ts
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>;  // 'onClick'
type FocusEvent = EventName<'focus'>;  // 'onFocus'
\`\`\``,

    "ts-decorator": `## 装饰器

装饰器是一种特殊声明，可附加到类、方法、属性、参数上。

### 类装饰器

\`\`\`ts
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class BugReport {
  title: string;
}
\`\`\`

### 方法装饰器

\`\`\`ts
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(\`Calling \${key} with\`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) { return a + b; }
}
\`\`\`

### 开启装饰器

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
\`\`\``,

    "ts-challenge": `## 类型体操实战

> 推荐练习：[type-challenges](https://github.com/type-challenges/type-challenges)

### 实现 Pick

\`\`\`ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

type User = { id: number; name: string; age: number };
type UserBasic = MyPick<User, 'id' | 'name'>;
\`\`\`

### 实现 Omit

\`\`\`ts
type MyOmit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};
\`\`\`

### 实现 ReturnType

\`\`\`ts
type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never;
\`\`\`

### 实现 Exclude / Extract

\`\`\`ts
type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;

type T1 = MyExclude<'a' | 'b' | 'c', 'a'>;     // 'b' | 'c'
type T2 = MyExtract<'a' | 'b' | 'c', 'a' | 'b'>; // 'a' | 'b'
\`\`\``,
  },

  git: {
    "git-basic": `## 基本工作流

\`\`\`bash
# 1. 查看状态
git status

# 2. 添加文件到暂存区
git add index.js          # 添加指定文件
git add .                 # 添加所有变更
git add -p                # 交互式选择要添加的代码块

# 3. 提交
git commit -m "feat: 添加用户登录功能"

# 4. 推送到远程
git push origin main
\`\`\`

## commit 规范

推荐使用 Conventional Commits 规范：

\`\`\`bash
<type>(<scope>): <description>

# 常用 type
feat:     新功能
fix:      修复 bug
docs:     文档更新
style:    代码格式（不影响逻辑）
refactor: 重构
test:     测试
chore:    构建/工具变更
perf:     性能优化

# 示例
git commit -m "feat(auth): 添加微信登录功能"
git commit -m "fix(table): 修复分页数据丢失问题"
git commit -m "docs: 更新 API 接口文档"
\`\`\`

## 常用技巧

\`\`\`bash
# 修改最后一次 commit（还没 push 时）
git commit --amend -m "新的 commit 信息"

# 撤销暂存
git reset HEAD index.js

# 查看提交历史
git log --oneline -10
git log --graph --oneline --all

# 暂存当前修改
git stash
git stash pop
git stash list
\`\`\``,

    "git-branch": `## 分支命名规范

\`\`\`bash
feature/login-page     # 功能分支
bugfix/fix-pagination   # 修复分支
hotfix/urgent-security  # 紧急修复
release/v1.2.0          # 发布分支
\`\`\`

## Git Flow 工作流

\`\`\`bash
# 创建功能分支
git checkout -b feature/user-auth develop

# 开发完成后合并回 develop
git checkout develop
git merge feature/user-auth
git branch -d feature/user-auth

# 发布时从 develop 创建 release 分支
git checkout -b release/v1.0.0 develop
# 测试通过后合并到 main 和 develop
git checkout main
git merge release/v1.0.0
git tag -a v1.0.0 -m "Release v1.0.0"

# 紧急修复
git checkout -b hotfix/security main
# 修复后合并到 main 和 develop
\`\`\`

## rebase 保持线性历史

\`\`\`bash
# 功能开发中同步主分支更新
git checkout feature/my-feature
git rebase develop

# 如果有冲突，解决后
git add .
git rebase --continue

# 强推（仅限个人分支）
git push --force-with-lease
\`\`\`

> **原则**：不要 rebase 已经 push 到共享分支的 commit。`,

    "git-stash": `## Stash 暂存

\`\`\`bash
# 暂存当前修改
git stash
git stash save "work in progress"

# 查看暂存列表
git stash list

# 恢复最近的暂存
git stash pop    # 恢复并删除
git stash apply  # 恢复但保留

# 恢复指定暂存
git stash apply stash@{1}
\`\`\``,

    "git-log": `## 日志查看与版本回退

\`\`\`bash
# 查看提交历史
git log --oneline -10
git log --graph --all --oneline

# 查看某文件的修改历史
git log --follow -p -- filename

# 版本回退
git reset --soft HEAD~1   # 保留暂存区
git reset --mixed HEAD~1  # 默认，保留工作区
git reset --hard HEAD~1   # 全部丢弃

# 撤销已 push 的提交
git revert <commit-hash>
\`\`\``,
  },

    "git-rebase": `## rebase vs merge

| 场景 | 推荐 | 原因 |
|------|------|------|
| 同步主分支更新到个人分支 | rebase | 保持线性历史 |
| 功能分支合入主分支 | merge / squash | 保留分支信息 |
| 共享分支 | merge | rebase 会改写历史 |
| 个人分支 | rebase | 历史更清晰 |

## 交互式 rebase

\`\`\`bash
# 修改最近 3 个 commit
git rebase -i HEAD~3

# 打开编辑器，操作选项：
pick abc1234 feat: 添加登录     # 保留
pick def5678 fix: 修复样式      # 保留
pick ghi9012 fix: 再修样式      # 合并到上一个

# 修改为：
pick abc1234 feat: 添加登录
pick def5678 fix: 修复样式
squash ghi9012 fix: 再修样式    # squash 合并 commit 消息
# 或 fixup ghi9012             # fixup 丢弃此 commit 消息
\`\`\`

## rebase 冲突处理

\`\`\`bash
git checkout feature/my-branch
git rebase main

# 如果有冲突
# 1. 解决冲突文件
# 2. 暂存
git add .
# 3. 继续 rebase
git rebase --continue
# 或放弃
git rebase --abort
\`\`\`

## squash merge

\`\`\`bash
# 将整个分支压缩为一个 commit 合入
git checkout main
git merge --squash feature/my-branch
git commit -m "feat: 完成用户模块"
\`\`\`

> 黄金规则：永远不要 rebase 已经 push 到公共分支的 commit。`,

    "git-conflict": `## 冲突标记

当两个分支修改了同一文件的同一区域时产生冲突：

\`\`\`
<<<<<<< HEAD
const port = 3000;  // 当前分支的修改
=======
const port = 8080;  // 要合并的分支的修改
>>>>>>> feature/new-port
\`\`\`

## 解决步骤

\`\`\`bash
# 1. 查看冲突文件
git status
# 输出: both modified: src/config.js

# 2. 手动编辑冲突文件，选择保留的内容
# 删除冲突标记 <<<<<<< ======= >>>>>>>

# 3. 标记为已解决
git add src/config.js

# 4. 完成合并
git commit
\`\`\`

## 使用工具

\`\`\`bash
# 配置合并工具
git config --global merge.tool vscode
git config --global merge.tool.vscode.cmd 'code --wait \$MERGED'

# 启动合并工具
git mergetool
\`\`\`

## 常用策略

\`\`\`bash
# 接受当前分支（ours）
git checkout --ours src/config.js

# 接受传入分支（theirs）
git checkout --theirs src/config.js

# 合并后全部使用某个版本
git merge -X ours feature/branch    # 冲突时选 ours
git merge -X theirs feature/branch  # 冲突时选 theirs
\`\`\`

## 避免冲突

- 频频 pull / rebase 主分支，减少偏离
- 小步提交，减少冲突范围
- 团队约定文件归属，避免多人改同一文件
- 使用 Prettier/ESLint 统一代码格式`,

    "git-flow": `## Git Flow 分支模型

\`\`\`
main (production)
  ├── develop (开发主线)
  │     ├── feature/login    (功能分支)
  │     └── feature/payment
  ├── release/v1.0.0         (发布分支)
  └── hotfix/security-fix    (热修复)
\`\`\`

## 分支操作

\`\`\`bash
# 从 develop 创建功能分支
git checkout develop
git checkout -b feature/user-auth

# 功能完成，合并回 develop
git checkout develop
git merge --no-ff feature/user-auth
git branch -d feature/user-auth

# 创建发布分支
git checkout -b release/v1.2.0 develop
# 测试修复...
git checkout main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git checkout develop
git merge --no-ff release/v1.2.0

# 紧急修复
git checkout -b hotfix/fix-crash main
# 修复...
git checkout main
git merge --no-ff hotfix/fix-crash
git tag -a v1.2.1
git checkout develop
git merge --no-ff hotfix/fix-crash
\`\`\`

## 分支命名规范

\`\`\`bash
feature/功能名      # feature/user-login
bugfix/修复名       # bugfix/fix-pagination
hotfix/紧急修复名   # hotfix/security-patch
release/版本号      # release/v1.0.0
\`\`\`

> 简化版：只用 main + feature 分支，通过 PR squash merge，适合小团队。`,

    "git-search": `## GitHub 搜索语法

\`\`\`
# 按仓库名/描述搜索
react in:name
react in:name,description
react in:description "state management"

# 按语言筛选
language:typescript
language:vue language:typescript

# 按 star 数量
stars:>1000
stars:100..500

# 按更新时间
pushed:>2025-01-01
created:>2024-06-01

# 按文件内容
filename:package.json vue
filename:.github/workflows ci
\`\`\`

## 代码搜索

\`\`\`
# 搜索代码
useState repo:facebook/react
useRouter path:src language:typescript
\`\`\`

## 组合搜索示例

\`\`\`
# Vue3 相关的高星项目
vue3 stars:>500 language:typescript

# 最近更新的 React 状态管理库
react state management stars:>1000 pushed:>2025-01-01

# TypeScript 编写的 CLI 工具
cli language:typescript stars:>200

# 查找某个用户的仓库
user:vuejs language:vue
\`\`\`

## Issue / PR 搜索

\`\`\`
# 查找 Issue
is:issue is:open label:bug
is:issue is:closed milestone:v1.0

# 查找 PR
is:pr is:open author:username
is:pr is:merged base:main
\`\`\`

> 快捷键：按 \`/\` 在 GitHub 页面聚焦搜索框。`,

  harmonyos: {
    "hm-env": `## DevEco Studio 安装

1. 下载 [DevEco Studio](https://developer.huawei.com/consumer/cn/deveco-studio)
2. 安装时选择 SDK 版本（API 12+）
3. 配置 Node.js 和 ohpm（随 IDE 自动安装）

## 创建项目

\`\`\`bash
# 选择模板
# Empty Ability → ArkTS → API 12

# 项目结构
entry/
├── src/main/
│   ├── ets/              # ArkTS 源码
│   │   ├── entryability/ # 应用入口
│   │   └── pages/        # 页面文件
│   ├── resources/        # 资源文件
│   └── module.json5      # 模块配置
\`\`\`

## 模拟器配置

- Tools → Device Manager → 创建模拟器
- 推荐选择 Phone 类型，API 12
- 真机调试需开启开发者模式 + USB 调试`,

    "hm-arkts": `## ArkTS 基础语法

ArkTS 是鸿蒙应用开发语言，基于 TypeScript 扩展：

\`\`\`ts
// 变量声明
let name: string = 'HarmonyOS';
const version: number = 5;

// 数组
let list: number[] = [1, 2, 3];
let names: Array<string> = ['a', 'b'];

// 接口
interface User {
  name: string;
  age: number;
  email?: string;
}

// 类
class Person implements User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return \`Hello, I'm \${this.name}\`;
  }
}
\`\`\`

## ArkTS 的限制

与标准 TypeScript 的主要区别：

- 不支持 \`any\` 类型（强制类型安全）
- 不支持 \`as\` 类型断言
- 装饰器语法不同（@Entry/@Component 等）
- 禁止在 UI 线程做耗时操作`,

    "hm-arkui": `## 声明式 UI

\`\`\`ts
@Entry
@Component
struct HelloWorld {
  @State message: string = 'Hello HarmonyOS';

  build() {
    Column() {
      Text(this.message)
        .fontSize(24)
        .fontColor('#333')
        .margin({ bottom: 16 })

      Button('点击我')
        .width(120)
        .height(40)
        .onClick(() => {
          this.message = '你好，鸿蒙！';
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
\`\`\`

## 常用组件

- \`Text\` / \`Span\` — 文本
- \`Image\` — 图片
- \`Button\` — 按钮
- \`List\` / \`ListItem\` — 列表
- \`Column\` / \`Row\` — 线性布局
- \`Stack\` — 层叠布局
- \`Scroll\` — 滚动容器
- \`TextInput\` — 输入框`,

    "hm-state": `## @State 装饰器

组件内部状态，变化触发 UI 刷新：

\`\`\`ts
@Component
struct Counter {
  @State count: number = 0;

  build() {
    Column() {
      Text(\`计数: \${this.count}\`)
      Button('+1')
        .onClick(() => this.count++)
    }
  }
}
\`\`\`

## @Prop 和 @Link

父子组件通信：

\`\`\`ts
// 父组件
@Entry
@Component
struct Parent {
  @State title: string = '标题';
  @State list: string[] = ['a', 'b'];

  build() {
    Column() {
      Child({ title: this.title, items: $list })
    }
  }
}

// 子组件
@Component
struct Child {
  @Prop title: string;        // 单向同步
  @Link items: string[];      // 双向同步

  build() {
    Column() {
      Text(this.title)
      ForEach(this.items, (item: string) => {
        Text(item)
      })
    }
  }
}
\`\`\`

## @Provide 和 @Consume

跨层级通信：

\`\`\`ts
@Entry
@Component
struct GrandParent {
  @Provide('theme') theme: string = 'dark';

  build() { /* ... */ }
}

@Component
struct GrandChild {
  @Consume('theme') theme: string;

  build() {
    Text(\`当前主题: \${this.theme}\`)
  }
}
\`\`\``,

    "hm-router": `## 页面路由

\`\`\`ts
// 跳转到新页面
router.pushUrl({
  url: 'pages/Detail',
  params: { id: 123 }
});

// 获取参数
const params = router.getParams() as { id: number };

// 返回上一页
router.back();

// 替换当前页
router.replaceUrl({ url: 'pages/Home' });
\`\`\`

## 路由栈管理

\`\`\`ts
// 清空路由栈并跳转
router.clear();
router.pushUrl({ url: 'pages/Login' });

// 获取栈长度
const length = router.getLength();
\`\`\``,

    "hm-adapt": `## 一多适配概念

一套代码，适配多种设备形态：手机、平板、2in1 设备。

## 断点系统

\`\`\`ts
// 根据屏幕宽度设置断点
@State currentBreakpoint: string = 'sm';

aboutToAppear() {
  this.currentBreakpoint = this.getBreakpoint();
}

getBreakpoint(): string {
  const width = px2vp(window.getLastWindow().width);
  if (width < 600) return 'sm';   // 手机
  if (width < 840) return 'md';   // 平板
  return 'lg';                     // 2in1
}
\`\`\`

## 自适应布局

\`\`ts
// Grid 响应式布局
GridRow({ columns: { sm: 4, md: 8, lg: 12 } }) {
  GridCol({ span: { sm: 4, md: 4, lg: 6 } }) {
    Text('左侧面板')
  }
  GridCol({ span: { sm: 4, md: 4, lg: 6 } }) {
    Text('右侧面板')
  }
}
\`\`\``,

    "hm-lifecycle": `## 生命周期

\`\`\`ts
@Entry
@Component
struct MyPage {
  aboutToAppear() {
    // 组件即将出现
  }

  aboutToDisappear() {
    // 组件即将销毁
  }

  onPageShow() {
    // 页面显示
  }

  onPageHide() {
    // 页面隐藏
  }
}
\`\`\`

应用生命周期（在 Ability 中）：
- onCreate → onDestroy
- onForeground → onBackground`,

    "hm-publish": `## 应用签名与发布

1. 生成密钥和证书请求文件（CSR）
2. 在 AppGallery Connect 申请发布证书
3. 配置签名信息到 build-profile.json5
4. 构建发布包（Build → Build Hap(s)/App(s)）
5. 上传到 AppGallery 审核

\`\`\`json5
// build-profile.json5
"signingConfigs": [{
  "name": "release",
  "material": {
    "certpath": "release_cert.pem",
    "storePassword": "xxx",
    "keyAlias": "xxx",
    "keyPassword": "xxx",
    "profile": "release_profile.p7b",
    "signAlg": "SHA256withECDSA",
    "storeFile": "release.p12"
  }
}]
\`\`\``,
  },

  flutter: {
    "ft-dart": `## Dart 语言基础

\`\`\`dart
// 变量
var name = 'Flutter';
final age = 25;         // 运行时常量
const pi = 3.14159;     // 编译时常量

// 空安全
String? nullableName;   // 可空类型
String nonNullName = 'Dart'; // 非空

// 函数
int add(int a, int b) => a + b;

// 可选参数
void greet(String name, [String? greeting]) {
  print('\${greeting ?? 'Hello'}, \$name!');
}

// 命名参数
void createUser({required String name, int age = 18}) {
  print('\$name, \$age');
}
\`\`\`

## 集合类型

\`\`\`dart
// List
var list = [1, 2, 3];
list.add(4);
list.map((e) => e * 2).toList();

// Map
var user = {'name': 'Tom', 'age': 25};
user['email'] = 'tom@example.com';

// Set
var tags = {'flutter', 'dart'};
tags.add('mobile');
\`\`\``,

    "ft-widget": `## 一切皆 Widget

Flutter 中界面由 Widget 树组成：

\`\`\`dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Flutter Demo')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('Hello Flutter', style: TextStyle(fontSize: 24)),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: () {},
                child: Text('点击我'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
\`\`\`

## StatelessWidget vs StatefulWidget

\`\`\`dart
// StatelessWidget — 无状态
class Greeting extends StatelessWidget {
  final String name;
  const Greeting({required this.name});

  @override
  Widget build(BuildContext context) {
    return Text('Hello, \$name');
  }
}

// StatefulWidget — 有状态
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () => setState(() => _count++),
      child: Text('Count: \$_count'),
    );
  }
}
\`\`\``,

    "ft-state": `## setState（基础）

\`\`\`dart
class _MyWidgetState extends State<MyWidget> {
  int _count = 0;

  void _increment() {
    setState(() { _count++; });
  }
}
\`\`\`

## Provider（推荐）

\`\`\`dart
// 1. 创建 ChangeNotifier
class CounterModel extends ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

// 2. 注册
ChangeNotifierProvider(
  create: (_) => CounterModel(),
  child: MyApp(),
);

// 3. 使用
Consumer<CounterModel>(
  builder: (context, counter, child) {
    return Text('Count: \${counter.count}');
  },
);
\`\`\`

## Riverpod（进阶）

\`\`\`dart
// 定义 Provider
final counterProvider = StateNotifierProvider<CounterNotifier, int>(
  (ref) => CounterNotifier(),
);

// 使用
class MyWidget extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final count = ref.watch(counterProvider);
    return ElevatedButton(
      onPressed: () => ref.read(counterProvider.notifier).increment(),
      child: Text('\$count'),
    );
  }
}
\`\`\``,

    "ft-router": `## 基本导航

\`\`\`dart
// 跳转
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => DetailPage()),
);

// 返回
Navigator.pop(context);

// 带参数跳转
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailPage(id: 123),
  ),
);
\`\`\`

## 命名路由

\`\`\`dart
// 注册路由
MaterialApp(
  routes: {
    '/': (context) => HomePage(),
    '/detail': (context) => DetailPage(),
    '/settings': (context) => SettingsPage(),
  },
);

// 跳转
Navigator.pushNamed(context, '/detail');

// 带参数
Navigator.pushNamed(context, '/detail', arguments: {'id': 123});
\`\`\`

## GoRouter（推荐）

\`\`\`dart
final router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (_, __) => HomePage()),
    GoRoute(
      path: '/detail/:id',
      builder: (_, state) => DetailPage(id: state.pathParameters['id']!),
    ),
  ],
);

// 跳转
context.go('/detail/123');
context.push('/detail/123'); // 保留当前页
\`\`\``,

    "ft-net": `## HTTP 请求

\`\`\`dart
import 'package:http/http.dart' as http;
import 'dart:convert';

// GET 请求
Future<User> fetchUser(String id) async {
  final response = await http.get(
    Uri.parse('https://api.example.com/users/\$id'),
  );
  if (response.statusCode == 200) {
    return User.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to load user');
  }
}

// POST 请求
Future<void> createUser(User user) async {
  await http.post(
    Uri.parse('https://api.example.com/users'),
    headers: {'Content-Type': 'application/json'},
    body: jsonEncode(user.toJson()),
  );
}
\`\`\`

## Dio（推荐）

\`\`\`dart
import 'package:dio/dio.dart';

final dio = Dio(BaseOptions(
  baseUrl: 'https://api.example.com',
  connectTimeout: Duration(seconds: 5),
));

// 添加拦截器
dio.interceptors.add(InterceptorsWrapper(
  onRequest: (options, handler) {
    options.headers['Authorization'] = 'Bearer \$token';
    handler.next(options);
  },
));

// 使用
final res = await dio.get('/users', queryParameters: {'page': 1});
\`\`\``,

    "ft-platform": `## MethodChannel

Dart 调用原生平台代码：

\`\`\`dart
// Dart 端
class BatteryLevel {
  static const platform = MethodChannel('samples.flutter.io/battery');

  Future<int> getBatteryLevel() async {
    try {
      final level = await platform.invokeMethod<int>('getBatteryLevel');
      return level ?? -1;
    } on PlatformException {
      return -1;
    }
  }
}
\`\`\`

\`\`kotlin
// Android 端 (Kotlin)
class MainActivity : FlutterActivity() {
  override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
    MethodChannel(flutterEngine.dartExecutor.binaryMessenger,
      "samples.flutter.io/battery"
    ).setMethodCallHandler { call, result ->
      if (call.method == "getBatteryLevel") {
        result.success(85) // 返回电量
      }
    }
  }
}
\`\`\``,

    "ft-ui": `## 常用 UI 组件

\`\`\`dart
// 布局组件
Column(children: [...])     // 纵向排列
Row(children: [...])        // 横向排列
Stack(children: [...])      // 层叠
Wrap(children: [...])       // 自动换行

// 常用组件
Container(child: ..., padding: ..., margin: ...)
Text('hello', style: TextStyle(fontSize: 18))
Image.network('https://...')
ElevatedButton(onPressed: () {}, child: Text('点击'))
ListView.builder(itemCount: 100, itemBuilder: (ctx, i) => ...)

// 输入
TextField(decoration: InputDecoration(labelText: '用户名'))
\`\`\``,

    "ft-publish": `## 打包发布

\`\`\`bash
# Android
flutter build apk --release
flutter build appbundle --release  # AAB 格式，推荐上架

# iOS
flutter build ios --release

# 检查应用大小
flutter build apk --analyze-size
\`\`\`

### Google Play 上架

1. 创建 Google Play 开发者账号
2. 创建应用 → 上传 AAB
3. 填写商店列表信息
4. 提交审核`,
  },

  practical: {
    "pr-datav": `## 项目初始化

使用 create-vue 初始化大屏可视化项目：

\`\`\`bash
pnpm create vue
# 选择：TypeScript, Router, Pinia, Sass
\`\`\`

### 业务背景

大屏项目属于后台管理系统的子项目，共享用户 token。项目以 cookie 方式获取 token 进行身份验证。

## 项目结构

\`\`\`
src/
├── utils/
│   ├── cookies.ts      # Cookie 存取封装
│   └── request.ts      # Axios 请求封装
├── views/
│   ├── Login.vue       # 登录页
│   └── Screen.vue      # 大屏页面
├── router/
│   └── index.ts        # 路由配置
└── styles/
    └── index.scss      # 全局样式
\`\`\`

## 请求封装

\`\`\`ts
// utils/request.ts
import axios from 'axios';
import { getToken } from './cookies';

const request = axios.create({
  baseURL: 'https://api-hmzs.itheima.net/tj',
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = \`Bearer \${token}\`;
  }
  return config;
});

export default request;
\`\`\`

## 大屏自适应方案

\`\`\`ts
// 基于 V-Scale-Screen 实现自适应
import VScaleScreen from 'v-scale-screen';

// 缩放方案
function setScale() {
  const designWidth = 1920;
  const designHeight = 1080;
  const scaleX = window.innerWidth / designWidth;
  const scaleY = window.innerHeight / designHeight;
  document.body.style.transform = \`scale(\${scaleX}, \${scaleY})\`;
}
\`\`\`

## ECharts 集成

\`\`\`ts
import * as echarts from 'echarts';

const chart = echarts.init(chartRef.value);
chart.setOption({
  tooltip: { trigger: 'axis' },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed'] },
  yAxis: { type: 'value' },
  series: [{
    data: [150, 230, 224],
    type: 'line',
    smooth: true,
  }]
});

// EventBus 多图表联动
window.addEventListener('resize', () => chart.resize());
\`\`\``,

    "pr-miniprogram": `## 小程序概念

小程序是一种**不需要下载安装即可使用**的应用，实现了"触手可及、用完即走"的理念。

特点：
- 无需下载（体积小，不超过 2M）
- 用完即走（随时退出，不占用存储）
- 入口多样：扫一扫、搜一下、群聊

## 注册账号

1. 打开 [微信公众平台](https://mp.weixin.qq.com/) → 立即注册
2. 选择账号类型：小程序
3. 填写账号信息（邮箱不能注册过小程序/公众号）
4. 邮箱激活 → 选择主体类型 → 登记信息
5. 微信扫码设置管理员

> 注意：类目不要选择游戏类型（会变成小游戏开发）

## 获取 AppID

AppID 是小程序的唯一标识，开发和发布时必须填写：

开发 → 开发管理 → 开发设置 → AppID

## 微信开发者工具

官方提供的小程序开发调试工具：

| 功能 | 说明 |
|------|------|
| 创建项目 | 脚手架作用 |
| 代码编辑 | 相当于 VS Code |
| 调试 | 相当于浏览器 DevTools |
| 预览发布 | 上传代码、提交审核 |

[下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 项目结构

\`\`\`
miniprogram/
├── pages/            # 页面文件
│   └── index/
│       ├── index.wxml   # 页面结构（类 HTML）
│       ├── index.wxss   # 页面样式（类 CSS）
│       ├── index.js     # 页面逻辑
│       └── index.json   # 页面配置
├── app.js            # 应用入口
├── app.json          # 全局配置
├── app.wxss          # 全局样式
└── project.config.json  # 项目配置
\`\`\`

## 使用 uni-app 开发

实际项目中推荐使用 uni-app + Vue3 进行跨平台小程序开发：

\`\`\`bash
# 创建项目
npx degit dcloudio/uni-preset-vue#vite-ts my-mini-app
cd my-mini-app
pnpm install
pnpm dev:mp-weixin   # 微信小程序
\`\`\`

优势：一套代码编译到微信/支付宝/抖音等多个小程序平台。`,

    "pr-tauri": `## Tauri 桌面端开发

Tauri 用 Rust 后端 + Web 前端构建轻量级桌面应用。

\`\`\`bash
npm create tauri-app@latest
\`\`\`

### 前后端通信

\`\`\`rust
#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}!", name)
}
\`\`\`

\`\`\`tsx
import { invoke } from '@tauri-apps/api/tauri';
const result = await invoke('greet', { name: 'World' });
\`\`\`

优势：安装包仅 3-10MB（vs Electron 100MB+）。`,
  },

    "pr-echarts": `## 基本使用

\`\`\`ts
import * as echarts from 'echarts';

const chart = echarts.init(document.getElementById('chart')!);
chart.setOption({
  tooltip: { trigger: 'axis' },
  legend: { data: ['销量', '利润'] },
  xAxis: { type: 'category', data: ['一月', '二月', '三月', '四月'] },
  yAxis: { type: 'value' },
  series: [
    { name: '销量', type: 'bar', data: [120, 200, 150, 80] },
    { name: '利润', type: 'line', data: [30, 50, 40, 20] },
  ],
});
\`\`\`

## 常用图表类型

\`\`\`ts
// 折线图
{ type: 'line', smooth: true, areaStyle: {} }

// 柱状图
{ type: 'bar', barWidth: '60%' }

// 饼图
{ type: 'pie', radius: ['40%', '70%'], data: [
  { value: 335, name: '直接访问' },
  { value: 310, name: '搜索引擎' },
]}

// 散点图
{ type: 'scatter', data: [[10, 20], [30, 40]] }
\`\`\`

## 响应式

\`\`\`ts
// 监听窗口变化自动重绘
window.addEventListener('resize', () => chart.resize());

// Vue 中使用
onMounted(() => {
  const chart = echarts.init(chartRef.value!);
  chart.setOption(options);

  const resizeObserver = new ResizeObserver(() => chart.resize());
  resizeObserver.observe(chartRef.value!);

  onUnmounted(() => {
    resizeObserver.disconnect();
    chart.dispose();
  });
});
\`\`\`

## 主题定制

\`\`\`ts
// 使用内置主题
const chart = echarts.init(dom, 'dark');

// 自定义主题
const theme = {
  color: ['#5470c6', '#91cc75', '#fac858'],
  backgroundColor: '#1a1a2e',
  textStyle: { color: '#eee' },
};
echarts.registerTheme('myTheme', theme);
const chart = echarts.init(dom, 'myTheme');
\`\`\``,

    "pr-uniapp": `## 项目创建

\`\`\`bash
# Vue3 + Vite + TypeScript
npx degit dcloudio/uni-preset-vue#vite-ts my-app
cd my-app
pnpm install

# 运行到各平台
pnpm dev:mp-weixin     # 微信小程序
pnpm dev:mp-alipay     # 支付宝小程序
pnpm dev:h5            # H5
pnpm dev:app           # App
\`\`\`

## 项目结构

\`\`\`
src/
├── pages/              # 页面
├── components/         # 组件
├── static/             # 静态资源
├── store/              # 状态管理
├── api/                # 接口封装
├── utils/              # 工具函数
├── pages.json          # 页面路由配置
├── manifest.json       # 应用配置
└── uni.scss            # 全局样式变量
\`\`\`

## 条件编译

\`\`\`vue
<template>
  <!-- #ifdef MP-WEIXIN -->
  <button open-type="getUserInfo">微信登录</button>
  <!-- #endif -->

  <!-- #ifdef H5 -->
  <div>H5 特有的组件</div>
  <!-- #endif -->
</template>

<script setup>
// #ifdef APP-PLUS
plus.navigator.setStatusBarStyle('light');
// #endif

// 平台判断
// #ifdef MP
console.log('小程序环境');
// #endif
</script>

<style>
/* #ifdef H5 */
.container { max-width: 750px; margin: 0 auto; }
/* #endif */
</style>
\`\`\`

## 跨平台 API

\`\`\`ts
// 网络请求（全平台统一）
uni.request({ url: 'https://api.example.com/data' });

// 路由跳转
uni.navigateTo({ url: '/pages/detail?id=123' });
uni.switchTab({ url: '/pages/home' });

// 本地存储
uni.setStorageSync('token', 'xxx');
uni.getStorageSync('token');

// 跨平台适配
uni.getSystemInfoSync().platform; // 'ios' | 'android' | 'devtools'
\`\`\`

> uni-app 的优势：一套代码编译到微信/支付宝/抖音/H5/App 等多个平台。`,

    "pr-websocket": `## 原生 WebSocket

\`\`\`ts
const ws = new WebSocket('wss://example.com/ws');

ws.onopen = () => {
  console.log('连接成功');
  ws.send(JSON.stringify({ type: 'auth', token: 'xxx' }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('收到消息:', data);
};

ws.onclose = (event) => {
  console.log('连接关闭:', event.code, event.reason);
};

ws.onerror = (err) => {
  console.error('连接错误:', err);
};

// 发送消息
ws.send(JSON.stringify({ type: 'chat', content: '你好' }));
\`\`\`

## Socket.io（推荐）

\`\`\`ts
import { io } from 'socket.io-client';

const socket = io('wss://example.com', {
  auth: { token: localStorage.getItem('token') },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
});

// 监听事件
socket.on('connect', () => console.log('已连接'));
socket.on('message', (data) => console.log(data));
socket.on('disconnect', (reason) => console.log('断开:', reason));

// 发送事件
socket.emit('chat', { content: '你好' });
socket.emit('join', { roomId: '123' });

// 离开页面时断开
onUnmounted(() => socket.disconnect());
\`\`\`

## 心跳检测与重连

\`\`\`ts
class WSClient {
  private ws: WebSocket | null = null;
  private heartbeatTimer: ReturnType<typeof setInterval> | null = null;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => this.startHeartbeat();
    this.ws.onclose = () => this.reconnect();
  }

  private startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.ws?.send(JSON.stringify({ type: 'ping' }));
    }, 30000);
  }

  private reconnect() {
    clearInterval(this.heartbeatTimer!);
    this.reconnectTimer = setTimeout(() => this.connect(), 3000);
  }

  send(data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  destroy() {
    clearInterval(this.heartbeatTimer!);
    clearTimeout(this.reconnectTimer!);
    this.ws?.close();
  }
}
\`\`\`

> 生产环境推荐使用 Socket.io，自带心跳、重连、房间管理等功能。`,

  reactnative: {
    "rn-intro": `## React Native 简介

React Native 是 Facebook 开发的跨平台移动应用框架，使用 JavaScript/TypeScript + React 编写原生应用。

### 核心优势

| 特性 | 说明 |
|------|------|
| 跨平台 | 一套代码运行 iOS + Android |
| 原生性能 | 使用原生组件而非 WebView |
| 热更新 | Metro 支持热重载，开发效率高 |
| 生态丰富 | npm 生态 + React 社区 |

## 环境搭建

\`\`\`bash
# 安装 Node.js (>= 18)
# 安装 React Native CLI
npm install -g react-native-cli

# 创建项目
npx react-native@latest init MyApp
cd MyApp

# 运行 iOS
npx react-native run-ios

# 运行 Android
npx react-native run-android
\`\`\`

### 项目结构

\`\`\`
MyApp/
├── App.tsx              # 应用入口
├── index.js             # 注册入口
├── src/                 # 业务代码
├── android/             # Android 原生工程
├── ios/                 # iOS 原生工程
├── metro.config.js      # Metro 打包配置
└── package.json
\`\`\`

## Hello World

\`\`\`tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
\`\`\``,

    "rn-component": `## 核心组件

| 组件 | 对应 Web | 说明 |
|------|----------|------|
| \`View\` | div | 容器组件 |
| \`Text\` | p/span | 文本组件 |
| \`Image\` | img | 图片组件 |
| \`ScrollView\` | overflow:scroll | 可滚动容器 |
| \`FlatList\` | 虚拟列表 | 高性能长列表 |
| \`TextInput\` | input | 输入框 |
| \`TouchableOpacity\` | button | 可点击组件 |
| \`Pressable\` | button | 新版可点击组件 |

## FlexBox 布局

React Native 默认使用 FlexBox 布局，主轴方向为 \`column\`（与 Web 相反）：

\`\`\`tsx
<View style={{
  flex: 1,
  flexDirection: 'row',      // 主轴方向
  justifyContent: 'center',  // 主轴对齐
  alignItems: 'center',      // 交叉轴对齐
  gap: 10,
}}>
  <View style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
  <View style={{ width: 100, height: 100, backgroundColor: 'red' }} />
</View>
\`\`\`

## FlatList 高性能列表

\`\`\`tsx
import { FlatList, Text, View } from 'react-native';

const data = Array.from({ length: 100 }, (_, i) => ({
  id: String(i),
  title: \`Item \${i}\`,
}));

const App = () => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={{ padding: 16, borderBottomWidth: 1 }}>
        <Text>{item.title}</Text>
      </View>
    )}
  />
);
\`\`\``,

    "rn-navigation": `## React Navigation

React Navigation 是 React Native 官方推荐的路由方案。

\`\`\`bash
npm install @react-navigation/native @react-navigation/stack
\`\`\`

### Stack Navigator（堆栈导航）

\`\`\`tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
\`\`\`

### 页面跳转与传参

\`\`\`tsx
// 跳转
navigation.navigate('Detail', { id: 123 });
navigation.push('Detail', { id: 456 }); // 允许重复
navigation.goBack();

// 接收参数
const { id } = route.params;
\`\`\`

### Bottom Tab Navigator（底部标签）

\`\`\`tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

<Tab.Navigator>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Profile" component={ProfileScreen} />
</Tab.Navigator>
\`\`\``,

    "rn-state": `## 状态管理

### useState（基础）

\`\`\`tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

### useContext（跨组件）

\`\`\`tsx
const ThemeContext = createContext('light');

// Provider
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// Consumer
const theme = useContext(ThemeContext);
\`\`\`

### Zustand（推荐）

\`\`\`tsx
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
}

const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));
\`\`\`

## 网络请求

\`\`\`tsx
// fetch API
const fetchData = async () => {
  const res = await fetch('https://api.example.com/data');
  const json = await res.json();
  setData(json);
};

// Axios（推荐）
import axios from 'axios';
const res = await axios.get('/api/users', {
  params: { page: 1 },
});
\`\`\`

## AsyncStorage（本地持久化）

\`\`\`tsx
import AsyncStorage from '@react-native-async-storage/async-storage';

// 存储
await AsyncStorage.setItem('token', 'xxx');

// 读取
const token = await AsyncStorage.getItem('token');

// 删除
await AsyncStorage.removeItem('token');
\`\`\``,

    "rn-harmony": `## React Native 鸿蒙化概述

RN 鸿蒙化：使用 React Native 语法开发鸿蒙应用。通过 \`@react-native-oh/react-native-harmony\` 桥接层，将 RN 组件映射为鸿蒙原生组件。

### 架构示意

\`\`\`
┌─────────────────────────┐
│   React Native JS 层    │
│  (React Components)     │
├─────────────────────────┤
│  Bridge / JSI 通信层    │
├─────────────────────────┤
│ @react-native-oh/harmony│  ← 鸿蒙适配层
├─────────────────────────┤
│   ArkUI 原生渲染层      │
│  (鸿蒙原生组件)         │
└─────────────────────────┘
\`\`\`

### 核心模块

| 模块 | 说明 |
|------|------|
| \`RNAbility\` | 继承 UIAbility，封装 RN 启动生命周期 |
| \`RNApp\` | 启动和管理 RNInstance + RNSurface |
| \`RNSurface\` | RN 渲染表面，承载 RN 视图 |
| \`RNInstance\` | RN 运行实例，管理 JS 引擎和模块 |

### 前置条件

1. 安装 React Native 环境
2. 安装 Harmony OS NEXT 环境（DevEco Studio）
3. Node.js >= 16`,

    "rn-hm-env": `## 环境配置

### hdc 环境变量

hdc 是鸿蒙调试命令行工具，位于 DevEco SDK 的 toolchains 目录：

\`\`\`
{DevEco安装路径}/sdk/{SDK版本}/openharmony/toolchains
\`\`\`

将该路径添加到系统 PATH 环境变量，并设置端口变量：

\`\`\`
HDC_SERVER_PORT = 7035
\`\`\`

### CAPI 版本环境变量

\`\`\`
RNOH_C_API_ARCH = 1
\`\`\`

## 创建 React Native 项目

\`\`\`bash
# 仅支持 0.72.5 版本
npx react-native@0.72.5 init AwesomeProject --version 0.72.5
\`\`\`

### 添加鸿蒙运行配置

\`\`\`json
// package.json scripts 中添加
{
  "scripts": {
    "dev": "react-native bundle-harmony --dev"
  }
}
\`\`\`

### 安装鸿蒙化依赖

\`\`\`bash
npm i @react-native-oh/react-native-harmony@0.72.67
\`\`\`

### Metro 配置适配

\`\`\`js
const { mergeConfig, getDefaultConfig } = require('@react-native/metro-config');
const { createHarmonyMetroConfig } = require('@react-native-oh/react-native-harmony/metro.config');

module.exports = mergeConfig(
  getDefaultConfig(__dirname),
  createHarmonyMetroConfig({
    reactNativeHarmonyPackageName: '@react-native-oh/react-native-harmony',
  }),
  { transformer: { getTransformOptions: async () => ({ transform: { experimentalImportSupport: false, inlineRequires: true } }) } }
);
\`\`\`

### 生成 Bundle

\`\`\`bash
npm run dev
# 生成 bundle.harmony.js → 放入鸿蒙工程 rawfile 目录
\`\`\``,

    "rn-hm-native": `## CPP 侧代码

### CMakeLists.txt

在鸿蒙工程 \`src/main/cpp/\` 下创建 CMakeLists.txt，将 RNOH 适配层编译为 \`.so\` 库：

\`\`\`cmake
project(rnapp)
cmake_minimum_required(VERSION 3.4.1)

set(OH_MODULE_DIR "\${CMAKE_CURRENT_SOURCE_DIR}/../../../oh_modules")
set(RNOH_CPP_DIR "\${OH_MODULE_DIR}/@rnoh/react-native-openharmony/src/main/cpp")

add_subdirectory("\${RNOH_CPP_DIR}" ./rn)

add_library(rnoh_app SHARED
  "./PackageProvider.cpp"
  "\${RNOH_CPP_DIR}/RNOHAppNapiBridge.cpp"
)
target_link_libraries(rnoh_app PUBLIC rnoh)
\`\`\`

### PackageProvider.cpp

\`\`\`cpp
#include "RNOH/PackageProvider.h"
using namespace rnoh;

std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx) {
  return {};
}
\`\`\`

## ArkTS 侧代码

### EntryAbility 改写

\`\`\`ts
import { RNAbility } from '@rnoh/react-native-openharmony';

export default class EntryAbility extends RNAbility {
  getPagePath() {
    return 'pages/Index';
  }
}
\`\`\`

### Index.ets 页面

核心配置项：

\`\`\`ts
RNApp({
  rnInstanceConfig: {
    createRNPackages,
    enableNDKTextMeasuring: true,   // 必须 true
    enableCAPIArchitecture: true,   // 必须 true
  },
  appKey: "AwesomeProject",        // 须与 registerComponent 一致
  jsBundleProvider: new AnyJSBundleProvider([
    new MetroJSBundleProvider(),    // 开发时热加载
    new ResourceJSBundleProvider(...), // 打包后的 bundle
  ]),
})
\`\`\`

> **关键**：\`appKey\` 必须与 RN 工程中 \`AppRegistry.registerComponent\` 注册的名字一致，否则白屏。`,

    "rn-hm-hotreload": `## 热加载配置

### 鸿蒙设备端口转发

在鸿蒙工程目录打开终端：

\`\`\`bash
hdc rport tcp:8081 tcp:8081
\`\`\`

### RN 工程启动 Metro

\`\`\`bash
npm run start
\`\`\`

连接后设备上即可实时看到代码修改效果，无需重新打包。

## 打包发布流程

1. RN 工程生成 bundle：\`npm run dev\`
2. 将 \`bundle.harmony.js\` 和 \`assets\` 放入鸿蒙工程 \`rawfile\`
3. DevEco Studio 构建并签名
4. 真机安装测试

## 相关资源

- [React Native 鸿蒙化仓库](https://gitcode.com/openharmony-sig/ohos_react_native)
- [React Native 官方文档](https://reactnative.dev/)
- [HarmonyOS 开发者平台](https://developer.huawei.com/consumer/cn/)

## RNAbility vs RNApp vs RNSurface

| 模块 | 作用 |
|------|------|
| **RNAbility** | 继承 UIAbility，处理应用生命周期（启动/前台/后台/销毁） |
| **RNApp** | 封装创建 RNInstance + RNSurface 的流程，适合单实例场景 |
| **RNSurface** | RN 的渲染表面，管理 RN 视图的渲染和更新 |

> 推荐使用 RNApp 快速启动，除非需要多实例或自定义 Surface 管理。`,
  },

  nodejs: {
    "node-fs": `## fs 文件系统模块

Node.js 内置的 fs 模块用于对文件进行读写操作。

### 读取文件 readFile

\`\`\`js
const fs = require('fs')

fs.readFile('./files/1.txt', 'utf8', function(err, dataStr) {
  // 读取成功：err 为 null，dataStr 为文件内容
  // 读取失败：err 为错误对象，dataStr 为 undefined
  console.log(err)
  console.log(dataStr)
})
\`\`\`

> **注意**：如果不指定 \`'utf8'\` 编码，dataStr 返回的是 Buffer 对象。

### 写入文件 writeFile

\`\`\`js
fs.writeFile('./files/3.txt', 'ok123', function(err) {
  // 写入成功：err 为 null
  // 写入失败：err 为错误对象
  if (err) return console.log('文件写入失败！' + err.message)
  console.log('文件写入成功！')
})
\`\`\`

> \`writeFile\` 会覆盖已有文件内容。如果文件不存在则自动创建。

### 实际案例：整理成绩

将成绩文件中的 \`=\` 替换为 \`：\`，并按行拆分：

\`\`\`js
fs.readFile('../素材/成绩.txt', 'utf8', function(err, dataStr) {
  if (err) return console.log('读取文件失败！' + err.message)

  const arrOld = dataStr.split(' ')
  const arrNew = []
  arrOld.forEach(item => {
    arrNew.push(item.replace('=', '：'))
  })
  const newStr = arrNew.join('\\r\\n')

  fs.writeFile('./files/成绩-ok.txt', newStr, function(err) {
    if (err) return console.log('写入文件失败！' + err.message)
    console.log('成绩写入成功！')
  })
})
\`\`\`

### 路径动态补全问题

\`\`\`js
// ./ 开头的相对路径，是相对于终端的工作目录，而非文件所在目录
fs.readFile('./files/1.txt', 'utf8', function(err, dataStr) { ... })

// 使用 path.join + __dirname 可靠拼接（见 path 模块）
fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, dataStr) { ... })
\`\`\``,


    "node-path": `## path 路径处理模块

Node.js 内置的 path 模块用于处理文件路径，解决不同操作系统路径分隔符差异。

### path.join() — 拼接路径

\`\`\`js
const path = require('path')

// ../ 会抵消前面的路径
path.join('/a', '/b/c', '../../', './d', 'e')
// 结果：\\a\\b\\d\\e
\`\`\`

**配合 __dirname 读取文件（推荐方式）：**

\`\`\`js
fs.readFile(path.join(__dirname, './files/1.txt'), 'utf8', function(err, dataStr) {
  if (err) return console.log(err.message)
  console.log(dataStr)
})
\`\`\`

### path.basename() — 获取文件名

\`\`\`js
const fpath = '/a/b/c/index.html'

path.basename(fpath)           // 'index.html'
path.basename(fpath, '.html')  // 'index'
\`\`\`

### path.extname() — 获取扩展名

\`\`\`js
path.extname('/a/b/c/index.html')  // '.html'
path.extname('/a/b/c/index.js')    // '.js'
path.extname('/a/b/c/index')       // ''
\`\`\`

### 时钟案例 — 提取 HTML 中的 CSS 和 JS

读取 index.html，用正则提取 \`<style>\` 和 \`<script>\` 标签内容，拆分为独立文件：

\`\`\`js
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, './素材/index.html'), 'utf8', function(err, dataStr) {
  if (err) return console.log(err.message)

  // 用正则匹配 style 标签
  const regStyle = /<style>[\\s\\S]*<\\/style>/
  const regScript = /<script>[\\s\\S]*<\\/script>/

  const cssStr = regStyle.exec(dataStr)[0].replace('<style>', '').replace('</style>', '')
  const jsStr = regScript.exec(dataStr)[0].replace('<script>', '').replace('</script>', '')

  fs.writeFile(path.join(__dirname, './clock/index.css'), cssStr, function(err) {
    if (err) return console.log(err.message)
    console.log('CSS 写入成功')
  })
  fs.writeFile(path.join(__dirname, './clock/index.js'), jsStr, function(err) {
    if (err) return console.log(err.message)
    console.log('JS 写入成功')
  })
})
\`\`\`

> **最佳实践**：始终使用 \`path.join(__dirname, './相对路径')\` 避免路径问题。`,

    "node-http": `## http 模块 — 创建 Web 服务器

Node.js 内置的 http 模块可以创建 Web 服务器，处理 HTTP 请求和响应。

### 创建基本 Web 服务器

\`\`\`js
const http = require('http')

// 创建服务器实例
const server = http.createServer()

// 监听 request 事件
server.on('request', function (req, res) {
  console.log('Someone visit our web server.')
})

// 启动服务器，监听 8080 端口
server.listen(8080, function () {
  console.log('server running at http://127.0.0.1:8080')
})
\`\`\`

### 根据 url 响应不同内容

\`\`\`js
server.on('request', (req, res) => {
  const url = req.url
  let content = '<h1>404 Not found!</h1>'

  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>'
  }

  // 设置 Content-Type 解决中文乱码
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(content)
})
\`\`\`

### req 请求对象

\`\`\`js
req.url      // 请求路径，如 '/' 或 '/about.html'
req.method   // 请求方法，如 'GET', 'POST'
req.headers  // 请求头对象
\`\`\`

### 时钟案例 — 读取文件响应

\`\`\`js
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const url = req.url
  const filePath = path.join(__dirname, 'clock', url === '/' ? 'index.html' : url)

  fs.readFile(filePath, (err, data) => {
    if (err) return res.end('404 Not Found')

    // 根据扩展名设置 Content-Type
    const ext = path.extname(filePath)
    const mimeTypes = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' }
    res.setHeader('Content-Type', (mimeTypes[ext] || 'text/plain') + '; charset=utf-8')
    res.end(data)
  })
})

server.listen(8080, () => {
  console.log('clock server running at http://127.0.0.1:8080')
})
\`\`\``,


    "node-module": `## 模块化 — CommonJS 规范

Node.js 遵循 CommonJS 模块化规范，每个 .js 文件就是一个独立模块。

### 模块作用域

每个模块内的变量和方法都是私有的，避免全局变量污染：

\`\`\`js
// m1.js
const username = '张三'   // 模块私有，外部无法直接访问

// m2.js
const username = '李四'   // 不同模块，互不干扰
\`\`\`

### module.exports 导出

\`\`\`js
// 在模块内挂载属性和方法
module.exports.username = 'zs'
module.exports.sayHello = function() {
  console.log('Hello!')
}
module.exports.age = 20
\`\`\`

### require 导入

\`\`\`js
const m1 = require('./m1')

console.log(m1.username)    // 'zs'
console.log(m1.age)         // 20
m1.sayHello()               // 'Hello!'
\`\`\`

### exports 与 module.exports 的关系

\`\`\`js
// exports 是 module.exports 的简写形式（引用关系）
console.log(exports === module.exports)  // true

// 挂载属性（两者等价）
exports.username = 'zs'
module.exports.username = 'zs'

// ⚠️ 不能给 exports 赋值新对象，会切断引用
exports = { username: 'zs' }  // ❌ 失效

// ✅ 应该用 module.exports
module.exports = { username: 'zs' }
\`\`\`

### 自定义模块示例：dateFormat.js

\`\`\`js
// 定义补零函数
function padZero(n) {
  return n > 9 ? n : '0' + n
}

// 格式化日期
function dateFormat(dt) {
  const y = dt.getFullYear()
  const m = padZero(dt.getMonth() + 1)
  const d = padZero(dt.getDate())
  const hh = padZero(dt.getHours())
  const mm = padZero(dt.getMinutes())
  const ss = padZero(dt.getSeconds())
  return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

module.exports = { dateFormat }

// 使用
const { dateFormat } = require('./dateFormat')
console.log(dateFormat(new Date()))
\`\`\``,


    "node-npm": `## npm 包管理工具

npm（Node Package Manager）是 Node.js 的包管理工具，随 Node.js 一起安装。

### 初始化项目

\`\`\`bash
npm init -y    # 快速生成 package.json（-y 跳过问答）
\`\`\`

### 安装与卸载依赖

\`\`\`bash
# 安装运行时依赖（dependencies）
npm install express
npm i express          # 简写

# 安装开发时依赖（devDependencies）
npm install nodemon -D

# 全局安装
npm install -g typescript

# 卸载
npm uninstall express

# 根据 package.json 安装所有依赖
npm install
\`\`\`

### package.json 中的 scripts

\`\`\`json
{
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js"
  }
}
\`\`\`

\`\`\`bash
npm run dev      # 执行 nodemon app.js
npm start        # 执行 node app.js（start 可省略 run）
\`\`\`

### dependencies 与 devDependencies

- **dependencies**：项目运行时必须的包（如 express、mysql）
- **devDependencies**：仅开发阶段使用的包（如 nodemon、eslint）

### 包版本号规则

- \`^4.18.2\` — 允许小版本和补丁更新（>=4.18.2 <5.0.0）
- \`~4.18.2\` — 只允许补丁更新（>=4.18.2 <4.19.0）
- \`4.18.2\` — 精确版本，不允许自动更新

### npx 执行包命令

\`\`\`bash
npx create-react-app my-app   # 无需全局安装，直接执行
npx nodemon app.js
\`\`\``,


    "node-express": `## Express 框架入门

Express 是基于 Node.js 的 Web 开发框架，提供了简洁的 API 来创建 Web 服务器和路由。

### 创建服务器与基本路由

\`\`\`js
const express = require('express')
const app = express()

// GET 请求 — 返回 JSON
app.get('/user', (req, res) => {
  res.send({ name: 'zs', age: 20, gender: '男' })
})

// POST 请求
app.post('/user', (req, res) => {
  res.send('请求成功')
})

app.listen(80, () => console.log('express server running at http://127.0.0.1'))
\`\`\`

### 获取查询参数 req.query

\`\`\`js
// GET /?name=zs&age=20
app.get('/', (req, res) => {
  console.log(req.query)  // { name: 'zs', age: '20' }
  res.send(req.query)
})
\`\`\`

### 获取动态路由参数 req.params

\`\`\`js
// GET /user/1/zs
app.get('/user/:ids/:username', (req, res) => {
  console.log(req.params)  // { ids: '1', username: 'zs' }
  res.send(req.params)
})
\`\`\`

### 托管静态资源 express.static

\`\`\`js
// 访问 /files/xxx → 实际 ./files/xxx
app.use('/files', express.static('./files'))

// 无前缀，直接访问 /index.html → 实际 ./clock/index.html
app.use(express.static('./clock'))
\`\`\`

> 多个静态资源目录可以多次调用 \`express.static\`，Express 会按顺序查找。`,


    "node-router": `## Express 路由与模块化路由

路由是 Express 处理客户端请求的核心机制，模块化路由可以让项目结构更清晰。

### 模块化路由

将路由抽离到单独文件中，使用 \`express.Router()\` 创建路由模块：

**router.js：**

\`\`\`js
const express = require('express')
const router = express.Router()

router.get('/user/list', (req, res) => {
  res.send('Get user list')
})

router.post('/user/add', (req, res) => {
  res.send('Add user')
})

module.exports = router
\`\`\`

**app.js：**

\`\`\`js
const express = require('express')
const app = express()

// 导入路由模块并注册
const router = require('./router')
app.use('/api', router)
// 实际路径：/api/user/list, /api/user/add

app.listen(80, () => console.log('server running'))
\`\`\`

### 路由前缀

\`\`\`js
// 统一前缀 /api，所有 router 中定义的路径前都自动添加
app.use('/api', router)

// 可以注册多个路由模块
app.use('/api', userRouter)
app.use('/api', articleRouter)
\`\`\``,


    "node-middleware": `## Express 中间件机制

中间件是 Express 的核心概念，本质是一个函数，接收 req、res、next 三个参数。

### 全局中间件

通过 \`app.use()\` 注册，所有请求都会依次经过：

\`\`\`js
app.use((req, res, next) => {
  console.log('这是最简单的中间件函数')
  next()  // 必须调用 next()，否则请求会挂起
})
\`\`\`

### 错误级别中间件

必须有 4 个参数 \`（err, req, res, next）\`，放在所有路由之后：

\`\`\`js
app.use((err, req, res, next) => {
  console.log('发生了错误！' + err.message)
  res.send('Error：' + err.message)
})
\`\`\`

### 内置中间件

\`\`\`js
// 解析 JSON 格式的请求体
app.use(express.json())

// 解析 URL-encoded 格式的请求体（如 form 表单）
app.use(express.urlencoded({ extended: true }))

// 托管静态资源文件
app.use(express.static('./public'))
\`\`\`

### 中间件分类

| 类型 | 说明 |
|------|------|
| 应用级中间件 | app.use() / app.METHOD() |
| 路由级中间件 | router.use() |
| 错误处理中间件 | 4 个参数 (err, req, res, next) |
| 内置中间件 | express.json() / express.static() |
| 第三方中间件 | cors / morgan / body-parser |

### 中间件执行流程

\`\`\`js
app.use((req, res, next) => {
  console.log('中间件 A')
  next()
})

app.use((req, res, next) => {
  console.log('中间件 B')
  next()
})

app.get('/', (req, res) => {
  console.log('路由处理')
  res.send('ok')
})

// 输出顺序：中间件 A → 中间件 B → 路由处理
\`\`\``,

    "node-mysql": `## MySQL 数据库操作

在 Node.js 中使用 mysql 包连接并操作 MySQL 数据库。

### 创建数据库连接池

\`\`\`js
const mysql = require('mysql')

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_db_01'
})
\`\`\`

> 使用连接池（createPool）而非单次连接（createConnection），可自动管理连接生命周期。

### 查询数据 SELECT

\`\`\`js
db.query('SELECT * FROM users', (err, results) => {
  if (err) return console.log(err.message)
  console.log(results)  // 返回数组
})
\`\`\`

### 插入数据 INSERT

\`\`\`js
const user = { username: 'Spider-Man', password: 'pcc321' }
const sqlStr = 'INSERT INTO users SET ?'

db.query(sqlStr, user, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('插入成功')
})
\`\`\`

> 使用 \`?\` 占位符可以自动转义，防止 SQL 注入。

### 更新数据 UPDATE

\`\`\`js
const user = { id: 7, username: 'Iron Man', password: 'pcc321' }
const sqlStr = 'UPDATE users SET ? WHERE id = ?'

db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('更新成功')
})
\`\`\`

### 删除数据 DELETE

\`\`\`js
const sqlStr = 'DELETE FROM users WHERE id = ?'

db.query(sqlStr, 7, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('删除成功')
})
\`\`\`

### 标记删除（软删除）

实际项目中通常不物理删除数据，而是用状态字段标记：

\`\`\`js
const sqlStr = 'UPDATE users SET is_delete=1 WHERE id = ?'

db.query(sqlStr, 7, (err, results) => {
  if (err) return console.log(err.message)
  if (results.affectedRows === 1) console.log('标记删除成功')
})

// 查询时过滤已删除数据
// SELECT * FROM users WHERE is_delete=0
\`\`\``,

    "node-auth": `## Session 与 JWT 认证

Web 应用中常见的两种身份认证方式：Session（服务端存储）和 JWT（客户端存储）。

### Session 认证 — express-session

\`\`\`js
const session = require('express-session')

app.use(session({
  secret: 'itheima',
  resave: false,
  saveUninitialized: true
}))
\`\`\`

**在登录接口中存储 session：**

\`\`\`js
app.post('/api/login', (req, res) => {
  req.session.user = req.body
  req.session.islogin = true
  res.send('登录成功')
})
\`\`\`

**在其他接口中读取 session：**

\`\`\`js
app.get('/api/username', (req, res) => {
  if (!req.session.islogin) return res.send('未登录')
  res.send('欢迎：' + req.session.user.username)
})
\`\`\`

### JWT 认证 — jsonwebtoken

Session 不适合分布式系统，JWT 将用户信息加密为 token 字符串，由客户端保存。

\`\`\`js
const jwt = require('jsonwebtoken')
const { expressjwt } = require('express-jwt')

const config = { jwtSecretKey: 'itheima No1. ^_^' }

// 登录时生成 token
app.post('/api/login', (req, res) => {
  const user = { id: 1, username: 'zs' }
  const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
  res.send({ status: 0, message: '登录成功', token: 'Bearer ' + tokenStr })
})

// 用 express-jwt 中间件解析 token
app.use(expressjwt({ secret: config.jwtSecretKey, algorithms: ['HS256'] })
  .unless({ path: [/^\\/api\\/login/] }))

app.get('/api/userinfo', (req, res) => {
  console.log(req.auth)
  res.send(req.auth)
})
\`\`\`

### 密码加密 — bcryptjs

\`\`\`js
const bcrypt = require('bcryptjs')

// 加密（第2个参数为 salt 长度）
const encryptedPwd = bcrypt.hashSync('123456', 10)

// 校验密码
const isMatch = bcrypt.compareSync('123456', encryptedPwd)
console.log(isMatch)  // true
\`\`\``,

    "node-project": `## Express API 项目实战

综合运用 Express、MySQL、JWT、Joi 等技术构建完整的 API 项目。

### 项目结构

\`\`\`
api_server/
├── app.js              # 入口文件
├── config.js           # 全局配置（密钥、数据库）
├── db/
│   └── index.js        # 数据库连接池
├── router/
│   ├── user.js         # 用户路由
│   └── artcate.js      # 文章分类路由
├── router_handler/
│   ├── user.js         # 用户处理函数
│   └── artcate.js      # 文章分类处理函数
└── schema/
    ├── user.js         # 用户验证规则
    └── artcate.js      # 分类验证规则
\`\`\`

### 统一响应封装 res.cc

\`\`\`js
// app.js 中挂载到 res 对象
app.use((req, res, next) => {
  // status = 0 成功，status = 1 失败
  res.cc = function(err, status = 1) {
    res.send({ status, message: err instanceof Error ? err.message : err })
  }
  next()
})
\`\`\`

### Joi 数据验证

\`\`\`js
const Joi = require('joi')

const username = Joi.string().alphanum().min(1).max(10).required()
const password = Joi.string().pattern(/^\\\\S{6,12}$/).required()

exports.reg_login_schema = {
  body: { username, password }
}

// 在路由中使用 @escook/express-joi 自动验证
const expressJoi = require('@escook/express-joi')
router.post('/reguser', expressJoi(reg_login_schema), handler)
\`\`\`

### 完整用户注册与登录 API

\`\`\`js
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
  const userinfo = req.body
  const sqlStr = 'SELECT * FROM ev_users WHERE username = ?'
  db.query(sqlStr, userinfo.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length > 0) return res.cc('用户名已被占用！')
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    const sql = 'INSERT INTO ev_users SET ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      if (err) return res.cc(err)
      if (results.affectedRows !== 1) return res.cc('注册失败！')
      res.cc('注册成功！', 0)
    })
  })
}

exports.login = (req, res) => {
  const userinfo = req.body
  const sql = 'SELECT * FROM ev_users WHERE username = ?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.cc(err)
    if (results.length !== 1) return res.cc('登录失败！')
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) return res.cc('登录失败！')
    const user = { ...results[0], password: '', user_pic: '' }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: '10h' })
    res.send({ status: 0, message: '登录成功！', token: 'Bearer ' + tokenStr })
  })
}
\`\`\`

> 项目中还需处理跨域（cors）、路由守卫（express-jwt）、文件上传（multer）等环节。`,
  },
};

// 文章详情内容
export const articleContents: Record<number, string> = {
  1: `## 需求

一个 list 列表，当删除子元素时，做到用户无感删除，不需要频繁请求 loading 请求列表。

## 思路

不重新请求列表刷新数据，做到无感删除。

### 面临问题

1. 列表是懒加载，删除元素时，如果调用下一页的懒加载，会丢失上一页的部分数据
2. 因为删除数据后，数据会自动前补齐索引

例如：1页10条，删除2条数据，第一页剩8条在前端展示，第一页后2条是后端补齐但没有请求回来。

### 解决方法

#### 1. 先删除 DOM，后请求删除接口

\`\`\`js
arr.splice(index, 1);
\`\`\`

#### 2. 计算请求总数

\`\`\`js
let page = 1;        // 当前页数
let pageSize = 10;   // 每页条数
let arr = [];        // 前端操作后数据数组
let totalNum = page * pageSize;  // 请求总数
let total = 0;       // 请求回来的实时总数
\`\`\`

#### 3. 计算差条数

\`\`\`js
let val = totalNum - arr.length;

// 差条数 > 0 且不是最后一页 → 需要补齐
if (val > 0 && total !== arr.length) {
  // 需要补充数据
  let multipleNum = (totalNum % arr.length / pageSize) | 0;
  page = page - multipleNum;
} else {
  page++;     // 正常页数++
  getfn();    // 正常请求下一页
}
\`\`\`

#### 4. 懒加载时请求逻辑处理

\`\`\`js
let resList = { total: 100, data: [...] }; // 请求回来的数据
let lengthNum = 0;

if (resList.data.length < pageSize) {
  // 最后一页，差总数几个就补几个
  lengthNum = total - arr.length;
} else {
  if (multipleNum > 0) {
    // 页数改变了
    lengthNum = pageSize - (arr.length % pageSize);
  } else {
    // 未改变，补齐删除的当页条数
    lengthNum = val;
  }
}

// 截取数据，补齐数据
arr.push(...resList.data.splice(resList.data.length - lengthNum, lengthNum));
\`\`\`

## 核心要点

- 先更新 DOM（splice），再异步请求删除接口，用户无感知
- 维护一个 \`totalNum = page * pageSize\` 的期望总数
- 删除后计算差值，决定是补齐数据还是正常请求下一页`,

  2: `## iOS Safari 兼容

### 1. 100vh 问题

iOS Safari 地址栏会动态变化，\`100vh\` 不等于视口实际高度：

\`\`\`css
/* 不要用 */
.full-height { height: 100vh; }

/* 用 CSS 变量 */
.full-height { height: 100dvh; }
/* 或用 JS */
.full-height { height: calc(var(--vh, 1vh) * 100); }
\`\`\`

\`\`\`js
// 设置 CSS 变量
function setVh() {
  document.documentElement.style.setProperty(
    '--vh',
    \`\${window.innerHeight * 0.01}px\`
  );
}
window.addEventListener('resize', setVh);
setVh();
\`\`\`

### 2. 日期格式

\`\`\`js
// iOS 不支持 '2025-01-01' 格式（横杠）
new Date('2025-01-01'); // iOS 返回 Invalid Date

// 用斜杠
new Date('2025/01/01'); // ✅ 兼容
new Date(2025, 0, 1);   // ✅ 推荐
\`\`\`

### 3. 滚动穿透

弹窗打开时，底层页面跟随滚动：

\`\`\`js
// 打开弹窗时
document.body.style.overflow = 'hidden';
document.body.style.position = 'fixed';
document.body.style.width = '100%';

// 关闭弹窗时还原
document.body.style.overflow = '';
document.body.style.position = '';
document.body.style.width = '';
\`\`\`

## Android 兼容

### 4. 软键盘弹起

\`\`\`js
// 监听窗口大小变化
window.addEventListener('resize', () => {
  if (document.activeElement.tagName === 'INPUT') {
    // 软键盘弹起，滚动到可视区域
    setTimeout(() => {
      document.activeElement.scrollIntoView({ block: 'center' });
    }, 300);
  }
});
\`\`\`

### 5. click 事件 300ms 延迟

\`\`\`css
/* 禁用双击缩放 */
html { touch-action: manipulation; }
\`\`\`

## 通用兼容

### 6. 安全区域适配

\`\`\`css
.container {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
}
\`\`\``,
  3: `## 加载性能优化

### 1. 路由懒加载

\`\`\`js
// Vue Router
const routes = [
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue')
  }
];

// React Router
const Dashboard = lazy(() => import('@/pages/Dashboard'));
\`\`\`

### 2. 图片优化

\`\`\`html
<!-- 懒加载 -->
<img loading="lazy" src="image.webp" alt="..." />

<!-- 响应式图片 -->
<picture>
  <source srcset="image.avif" type="image/avif" />
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>
\`\`\`

### 3. 代码分割

\`\`\`js
// Vite 自动按路由分割
// webpack 魔法注释
const Module = () => import(
  /* webpackChunkName: "module" */
  './Module'
);
\`\`\`

## 渲染性能优化

### 4. 虚拟列表

\`\`\`vue
<!-- 长列表只渲染可视区域 -->
<VirtualList
  :items="list"
  :item-height="60"
  :visible-count="10"
/>
\`\`\`

### 5. 防抖与节流

\`\`\`js
// 搜索防抖
const debouncedSearch = debounce(search, 300);

// 滚动节流
const throttledScroll = throttle(onScroll, 100);
window.addEventListener('scroll', throttledScroll);
\`\`\`

## 缓存策略

### 6. HTTP 缓存

\`\`\`
Cache-Control: max-age=31536000, immutable  # 静态资源（带 hash）
Cache-Control: no-cache                       # HTML（每次协商）
ETag: "abc123"                                # 协商缓存
\`\`\`

### 7. 本地缓存

\`\`\`js
// Service Worker 缓存
// localStorage / sessionStorage
// IndexedDB 大量结构化数据
\`\`\``,
  4: `## 原理

利用 CSS \`@keyframes\` 动画实现无缝滚动，通过复制一份内容实现视觉上的无缝衔接。

## 实现代码

\`\`\`html
<div class="marquee-container">
  <div class="marquee-content">
    <span>公告1</span>
    <span>公告2</span>
    <span>公告3</span>
  </div>
</div>
\`\`\`

\`\`\`css
.marquee-container {
  overflow: hidden;
  width: 100%;
}

.marquee-content {
  display: flex;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
}

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
\`\`\`

\`\`\`vue
<template>
  <div class="marquee-wrapper">
    <div class="marquee-track" :style="{ animationDuration: duration }">
      <span v-for="(item, i) in items" :key="i" class="marquee-item">
        {{ item }}
      </span>
      <!-- 复制一份实现无缝 -->
      <span v-for="(item, i) in items" :key="'dup-' + i" class="marquee-item">
        {{ item }}
      </span>
    </div>
  </div>
</template>
\`\`\`

## 鼠标悬停暂停

\`\`\`css
.marquee-track {
  animation: marquee 15s linear infinite;
}

.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}
\`\`\`

## 适用场景

- 公告栏滚动
- 新闻标题轮播
- 数据大屏指标滚动
- 商品价格行情展示`,
  5: `## 问题描述

前端下载文件时，后端返回的是二进制文件流（Blob），而不是直接的下载链接。需要前端将二进制流转为可下载的文件。

## 方案一：Blob + a 标签

\`\`\`js
async function downloadFile(url, filename) {
  const response = await fetch(url, {
    headers: { Authorization: 'Bearer ' + token }
  });

  if (!response.ok) throw new Error('下载失败');

  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  // 清理
  window.URL.revokeObjectURL(downloadUrl);
  document.body.removeChild(a);
}

// 使用
downloadFile('/api/export', '报表.xlsx');
\`\`\`

## 方案二：axios 处理

\`\`\`js
import axios from 'axios';

async function exportExcel(params) {
  const res = await axios({
    url: '/api/export',
    method: 'post',
    data: params,
    responseType: 'blob', // 关键：指定响应类型
  });

  // 从响应头获取文件名
  const disposition = res.headers['content-disposition'];
  let filename = 'download.xlsx';
  if (disposition) {
    filename = decodeURIComponent(
      disposition.split('filename=')[1].replace(/"/g, '')
    );
  }

  const blob = new Blob([res.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
\`\`\`

## 获取下载进度

\`\`\`js
const res = await fetch(url);
const reader = res.body.getReader();
const contentLength = +res.headers.get('Content-Length');

let receivedLength = 0;
const chunks = [];

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  chunks.push(value);
  receivedLength += value.length;

  const percent = (receivedLength / contentLength * 100).toFixed(1);
  console.log(\`下载进度: \${percent}%\`);
}

const blob = new Blob(chunks);
\`\`\``,
  6: `## 什么是 Kiosk 模式

Chrome 的 Kiosk 模式是一种全屏、无边框的运行模式，常用于：

- 自助终端机
- 数字标牌 / 广告屏
- 展厅信息展示
- POS 收银系统

## 启动方式

### Windows

\`\`\`bash
# 基本全屏
chrome.exe --kiosk https://example.com

# Kiosk + 禁用安全功能
chrome.exe --kiosk --no-first-run --disable-pinch https://example.com

# 创建快捷方式
# 右键 → 新建快捷方式 → 目标填入上面的命令
\`\`\`

### macOS

\`\`\`bash
/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --kiosk https://example.com
\`\`\`

## 常用参数

| 参数 | 说明 |
|------|------|
| \`--kiosk\` | 全屏无边框模式 |
| \`--no-first-run\` | 跳过首次运行引导 |
| \`--disable-pinch\` | 禁用触摸缩放 |
| \`--overscroll-history-navigation=0\` | 禁用滑动前进后退 |
| \`--disable-touch-editing\` | 禁用触摸编辑 |
| \`--incognito\` | 隐私模式（关闭后清除数据） |

## 退出 Kiosk

- \`Alt + F4\`（Windows）
- \`Cmd + Q\`（macOS）
- \`Ctrl + Shift + Q\`（部分版本）

## 实际项目经验

在 130 原棉测水仪项目中，桌面应用内嵌浏览器窗口使用 Kiosk 模式展示大屏数据，配合 Tauri 的窗口管理 API 实现全屏展示：

\`\`\`js
// Tauri 窗口配置
{
  "label": "kiosk-window",
  "title": "数据大屏",
  "fullscreen": true,
  "decorations": false,
  "resizable": false
}
\`\`\``,
  7: `## Composition API vs Options API

### Options API 的问题

随着组件复杂度增加，相同逻辑关注点被分散在不同选项中：

\`\`\`js
export default {
  data() {
    return { count: 0, user: null, posts: [] };
  },
  created() { this.fetchUser(); },
  methods: {
    fetchUser() { /* ... */ },
    increment() { this.count++; }
  },
  computed: {
    doubleCount() { return this.count * 2; }
  },
  watch: {
    userId() { this.fetchUser(); }
  }
};
\`\`\`

### Composition API 的优势

\`\`\`vue
<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useUser } from '@/composables/useUser';
import { usePosts } from '@/composables/usePosts';

const count = ref(0);
const increment = () => count.value++;
const doubleCount = computed(() => count.value * 2);

// 用户相关逻辑封装在一起
const { user, fetchUser } = useUser();
const { posts, fetchPosts } = usePosts(user);

onMounted(fetchUser);
</script>
\`\`\`

## 组合式函数（Composables）

\`\`\`js
// composables/useUser.js
import { ref, shallowRef } from 'vue';

export function useUser() {
  const user = shallowRef(null);
  const loading = ref(false);
  const error = ref(null);

  async function fetchUser(id) {
    loading.value = true;
    try {
      const res = await fetch(\`/api/users/\${id}\`);
      user.value = await res.json();
    } catch (e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  return { user, loading, error, fetchUser };
}
\`\`\`

## 最佳实践

1. **用 \`<script setup>\`** 简化代码
2. **基本类型用 \`ref\`**，对象类型用 \`reactive\` 或 \`shallowRef\`
3. **封装组合式函数** 复用逻辑
4. **用 \`shallowRef\`** 优化大型对象的响应式性能`,
  8: `## Tauri 简介

Tauri 是一个构建小型、快速、安全的桌面应用的框架，前端使用 Web 技术，后端使用 Rust。

### Tauri vs Electron

| 特性 | Tauri | Electron |
|------|-------|---------|
| 安装包大小 | ~3-10 MB | ~100+ MB |
| 内存占用 | 更低 | 较高 |
| 后端语言 | Rust | Node.js |
| 安全性 | 更严格 | 较宽松 |

## 项目搭建

\`\`\`bash
# 创建项目
npm create tauri-app@latest my-app -- --template vue-ts

# 目录结构
my-app/
├── src/              # Vue 前端代码
├── src-tauri/        # Rust 后端代码
│   ├── src/main.rs
│   ├── tauri.conf.json
│   └── Cargo.toml
└── package.json
\`\`\`

## 前后端通信

### 前端调用 Rust

\`\`\`rust
// src-tauri/src/main.rs
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

#[tauri::command]
async fn read_serial(port: String) -> Result<String, String> {
    // 串口通讯逻辑
    let mut serial = serialport::new(&port, 9600)
        .open()
        .map_err(|e| e.to_string())?;

    let mut buf = [0u8; 256];
    serial.read(&mut buf).map_err(|e| e.to_string())?;
    Ok(String::from_utf8_lossy(&buf).to_string())
}
\`\`\`

\`\`\`vue
<script setup>
import { invoke } from '@tauri-apps/api/tauri';

async function onConnect() {
  const result = await invoke('read_serial', { port: 'COM3' });
  console.log('串口数据:', result);
}
</script>
\`\`\`

## 打包发布

\`\`\`bash
npm run tauri build
# 输出：src-tauri/target/release/bundle/
\`\`\``,

  9: `## WebSocket 概述

WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议，实现服务器主动推送数据。

### 原生 WebSocket

\`\`\`js
// 创建连接
const ws = new WebSocket('ws://localhost:8080');

// 连接成功
ws.onopen = () => {
  console.log('连接已建立');
  ws.send('Hello Server');
};

// 接收消息
ws.onmessage = (event) => {
  console.log('收到消息:', event.data);
};

// 连接关闭
ws.onclose = () => {
  console.log('连接已关闭');
};

// 错误处理
ws.onerror = (err) => {
  console.error('WebSocket 错误:', err);
};
\`\`\`

## Socket.io 方案

Socket.io 在 WebSocket 基础上提供了自动重连、事件系统、广播等高级功能。

\`\`\`js
// 服务端
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('用户连接:', socket.id);

  socket.on('message', (data) => {
    io.emit('message', data); // 广播
  });

  socket.on('disconnect', () => {
    console.log('用户断开');
  });
});

// 客户端
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');
socket.emit('message', { text: 'hello' });
socket.on('message', (data) => console.log(data));
\`\`\`

## 心跳检测与断线重连

\`\`\`js
class WSClient {
  constructor(url) {
    this.url = url;
    this.heartbeatInterval = 30000;
    this.reconnectAttempts = 0;
    this.maxReconnect = 5;
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('已连接');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
    };

    this.ws.onclose = () => {
      this.stopHeartbeat();
      this.reconnect();
    };

    this.ws.onmessage = (e) => {
      if (e.data === 'pong') return; // 心跳回复
      this.handleMessage(e.data);
    };
  }

  startHeartbeat() {
    this.heartbeatTimer = setInterval(() => {
      this.ws.send('ping');
    }, this.heartbeatInterval);
  }

  stopHeartbeat() {
    clearInterval(this.heartbeatTimer);
  }

  reconnect() {
    if (this.reconnectAttempts >= this.maxReconnect) {
      console.log('重连次数用尽');
      return;
    }
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  handleMessage(data) {
    console.log('收到消息:', data);
  }
}
\`\`\`

> 指数退避策略：重连间隔 1s → 2s → 4s → 8s → 16s → 30s（上限），避免服务器压力。`,

  10: `## 项目初始化

\`\`\`bash
pnpm create vue
# 选择：TypeScript, Router, Pinia, Sass
\`\`\`

### 业务背景

大屏项目属于后台管理系统的子项目，共享用户 token。项目以 cookie 方式获取 token 进行身份验证。

## 自适应方案

\`\`\`ts
// V-Scale-Screen 自适应缩放
import VScaleScreen from 'v-scale-screen';

// 等比缩放方案
function setScale() {
  const designWidth = 1920;
  const designHeight = 1080;
  const scaleX = window.innerWidth / designWidth;
  const scaleY = window.innerHeight / designHeight;
  const scale = Math.min(scaleX, scaleY);
  document.body.style.transform = \`scale(\${scale})\`;
  document.body.style.transformOrigin = 'left top';
}

window.addEventListener('resize', setScale);
setScale();
\`\`\`

## ECharts 图表集成

\`\`\`ts
import * as echarts from 'echarts';

const chart = echarts.init(chartRef.value);

chart.setOption({
  tooltip: { trigger: 'axis' },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    axisLine: { lineStyle: { color: '#fff' } }
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#fff' } }
  },
  series: [{
    data: [150, 230, 224, 218, 135],
    type: 'line',
    smooth: true,
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: 'rgba(59,130,246,0.5)' },
        { offset: 1, color: 'rgba(59,130,246,0)' }
      ])
    }
  }]
});

// 窗口自适应
window.addEventListener('resize', () => chart.resize());
\`\`\`

## EventBus 多图表联动

\`\`\`ts
// 点击图表A时，图表B高亮对应数据
chartA.on('click', (params) => {
  EventBus.emit('highlight', params.name);
});

EventBus.on('highlight', (name) => {
  chartB.dispatchAction({
    type: 'highlight',
    name
  });
});
\`\`\`

## 请求封装

\`\`\`ts
// utils/request.ts
import axios from 'axios';
import { getToken } from './cookies';

const request = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

export default request;
\`\`\``,

  11: `## uni-app 概述

uni-app 是 DCloud 推出的跨平台框架，一套代码编译到微信/支付宝/抖音小程序、H5、App 等多个平台。

## 项目创建

\`\`\`bash
npx degit dcloudio/uni-preset-vue#vite-ts my-app
cd my-app && pnpm install

# 开发
pnpm dev:mp-weixin    # 微信小程序
pnpm dev:h5           # H5
pnpm dev:app          # App
\`\`\`

## 条件编译

\`\`\`vue
<template>
  <view>
    <!-- #ifdef MP-WEIXIN -->
    <button open-type="getUserInfo">微信登录</button>
    <!-- #endif -->

    <!-- #ifdef H5 -->
    <button @click="h5Login">H5登录</button>
    <!-- #endif -->
  </view>
</template>

<script>
// #ifdef MP-WEIXIN
wx.login({ success(res) { /* ... */ } });
// #endif
</script>
\`\`\`

## 跨平台适配要点

| 平台 | 平台标识 | 注意事项 |
|------|---------|---------|
| 微信小程序 | MP-WEIXIN | open-type、授权弹窗 |
| 支付宝小程序 | MP-ALIPAY | my. API 差异 |
| 抖音小程序 | MP-TOUTIAO | tt. API 差异 |
| H5 | H5 | 兼容 PC 端 |
| App | APP-PLUS | 原生能力调用 |

## 多端样式适配

\`\`\`css
/* 使用 rpx 单位自动适配 */
.box {
  width: 750rpx;   /* 满宽 */
  padding: 20rpx;
  font-size: 28rpx;
}

/* 条件编译 CSS */
/* #ifdef MP-WEIXIN */
.wx-specific { margin-top: env(safe-area-inset-top); }
/* #endif */
\`\`\`

> uni-app 优势：学习成本低（Vue 语法）、生态丰富（插件市场）、一次开发多端发布。`,

  12: `## ArkUI 组件体系

\`\`\`ts
@Entry
@Component
struct HelloWorld {
  @State message: string = 'Hello HarmonyOS';

  build() {
    Column() {
      Text(this.message)
        .fontSize(24)
        .fontColor('#333')
        .margin({ bottom: 16 })

      Button('点击我')
        .width(120)
        .height(40)
        .onClick(() => {
          this.message = '你好，鸿蒙！';
        })
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }
}
\`\`\`

## 常用布局组件

| 组件 | 说明 | 类比 |
|------|------|------|
| Column | 纵向排列 | flex-direction: column |
| Row | 横向排列 | flex-direction: row |
| Stack | 层叠布局 | position: absolute |
| List | 长列表 | VirtualScroll |
| Grid | 网格布局 | CSS Grid |
| Flex | 弹性布局 | flex |

## 状态管理

\`\`\`ts
@Component
struct Counter {
  @State count: number = 0;

  build() {
    Column() {
      Text(\`计数: \${this.count}\`)
      Button('+1').onClick(() => this.count++)
    }
  }
}

// 父子通信
@Component
struct Parent {
  @State title: string = '标题';

  build() {
    Child({ title: this.title })
  }
}

@Component
struct Child {
  @Prop title: string;

  build() {
    Text(this.title)
  }
}
\`\`\`

## 一多适配（多设备）

\`\`\`ts
// 断点系统
@StorageLink('breakpoint') breakpoint: string = 'sm';

// GridRow 响应式布局
GridRow({ columns: { sm: 4, md: 8, lg: 12 } }) {
  GridCol({ span: { sm: 4, md: 4, lg: 6 } }) {
    Text('左侧面板')
  }
  GridCol({ span: { sm: 4, md: 4, lg: 6 } }) {
    Text('右侧面板')
  }
}
\`\`\`

## 应用发布流程

1. 生成密钥和证书请求文件（CSR）
2. 在 AppGallery Connect 申请发布证书
3. 配置签名信息到 build-profile.json5
4. 构建发布包（Build → Build Hap(s)/App(s)）
5. 上传到 AppGallery 审核`,
};
