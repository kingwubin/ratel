const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF);
// 开始链接
con.connect();

// 统一执行 sql 的函数
function exec(sql) {
    console.log(sql, 'sql')
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                console.log(err, 'MySQL连接失败')
                reject(err)
                return
            }
            resolve(result)
        })
    })
    return promise
}

module.exports = {
    exec,
    escape: mysql.escape,
}