const Router = require('koa-router');
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const router = new Router();

router.prefix('/api/user');

router.post('/login', async function (ctx, next) {
    const { username, password } = ctx.request.body;
    const data = await login(username, password)
    console.log('蔡徐坤');
    console.error('橙丝带')
    /*
    if (data.username) {
        // 设置 session
        ctx.session.usename = data.usename;
        ctx.session.realname = data.realname;

        ctx.body = new SuccessModel()
        return
    }
    ctx.body = new ErrorModel('登录失败')
    */
    ctx.session.usename = data.usename;
    ctx.session.realname = data.realname;

    ctx.body = new SuccessModel()
    return
})

// 文件下载测试
router.get('/download', async function (ctx, next) {
    console.log('蔡徐坤')
    ctx.set({
        'Content-Disposition':  'attachment;filename="james.txt"'
    })
    ctx.body = 'shabia'
})

module.exports = router