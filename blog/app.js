/**
 * Module dependencies.
 */

var render = require('./lib/render');
var convert = require('koa-convert');
var logger = require('koa-logger');
var route = require('koa-route');
var parse = require('koa-bodyparser');
var koa = require('koa');
var app = module.exports = new koa();

// "database"

var posts = [];

// middleware

app.use(convert(logger()));
app.use(parse());

// route middleware

app.use(convert(route.get('/', list)) );
app.use(convert(route.get('/post/new', add)) );
app.use(convert(route.get('/post/:id', show)) );
app.use(convert(route.post('/post', create)) );

// app.use(route.get('/', ));
// route definitions

/**
 * Post listing.
 */

// Generator/yield 写法
// function *list() {
//     this.body = yield render('list', {posts: posts});
// }

// yield 替换成await, function *() 替换成 async function ()
// Async/await 写法:
async function list(ctx, next) {
    this.body = await render('list', {posts: posts});
    // next();
};

// async (ctx, next) => {
//     const user = await Users.getById(this.session.user_id);
//     await next();
//     ctx.body = {message: 'some message'};
// }

/**
 * Show creation form.
 */

// function *add() {
//     this.body = yield render('new');
// }
async function add(ctx, next) {
    this.body = await render('new');
}
/**
 * Show post :id.
 */

// function *show(id) {
//     var post = posts[id];
//     if (!post) this.throw(404, 'invalid post id');
//     this.body = yield render('show', {post: post});
// }
// ctx: 需要使用该参数时,必须传入该参数
async function show(ctx, id) {
    var post = posts[id];
    if (!post) this.throw(404, 'invalid post id');
    ctx.body = await render('show', {post: post});
}

/**
 * Create a post.
 */

// function *create() {
//     var post = yield parse(this);
//     var id = posts.push(post) - 1;
//     post.created_at = new Date();
//     post.id = id;
//     this.redirect('/');
// }
function create(ctx, next) {
    var post = ctx.request.body;
    var id = posts.push(post) - 1;
    post.created_at = new Date();
    post.id = id;
    ctx.redirect('/');
}

// listen
if (!module.parent) app.listen(3000);

