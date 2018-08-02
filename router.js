var express = require('express')
var router = express.Router()
var User = require('./models/user')

router.get('/', function (req, res) {
    res.render('index.html', {
        name: 'jack'
    })
});
router.get('/login', function (req, res) {
    res.render('login.html', {})
});
router.get('/register', function (req, res) {
    res.render('register.html', {})
});
router.post('/register', function (req, res) {
    var body = req.body
    console.log(body)
    User.findOne({
        $or: [{
                email: body.email
            },
            {
                nickname: body.nickname
            }
        ]
    }, function (err, data) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: '服务端发生错误'
            })
        }
        if (data) {
            return res.status(200).json({
                success: true,
                message: '邮箱和昵称已存在'
            })
        }
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: '数据保存错误'
                })
            }
            return res.status(200).json({
                success: true,
                message:'success'
            })
        })

    })
});
module.exports = router