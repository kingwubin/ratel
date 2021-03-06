const env = process.env.NODE_ENV // 环境参数

let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'yourpassword',
        port: '3306',
        database: 'myblog'
    };
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'MyNewPass4!',
        port: '3306',
        database: 'myblog'
    };

    // redis
    REDIS_CONF = {
        port: 6379,
        host: 'localhost'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF,
}