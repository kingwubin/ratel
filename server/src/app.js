const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const fs = require('fs');
const morgan = require('koa-morgan');

const user = require('./routes/user');

const { REDIS_CONF } = require('./config/db');

// error handler
onerror(app);
// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger());

const ENV = process.env.NODE_ENV;

if (ENV !== 'production') {
    // 开发环境 / 测试环境
    app.use(morgan('dev'))
} else {
    // 线上环境
    const logFileName = path.join(__dirname, 'log', 'access.log')
    const writeStream = fs.createWriteStream(logFileName, {
        flags: 'a'
    })
    app.use(morgan('combined', {
        stream: writeStream
    }))
}

// session 配置
app.keys = ['jamesKing666'];
app.use(session({
    // 配置 cookie
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    },
    // 配置 redis
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}));

// routes
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app