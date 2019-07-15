const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(main); // 返回 ctx 对象，包括 HTTP 请求和 HTTP 回复

app.listen(3000);
