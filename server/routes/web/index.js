module.exports = app => {
    const express = require('express')
    const router = express.Router()

    const path = require('path')
    const open = require('open')
    const Book = require('../../models/Book')
    const User = require('../../models/User')
    const Category = require('../../models/Category')
    const multer = require('multer')
    //openFile
    app.get('/web/api/openFile/:url', async (req, res) => {
        const url = req.params.url
        const file = path.join(__dirname + `/../../uploads/${url}`);
        console.log(file);
        open(file, { app: 'chrome' })
    })

    //获取所有图书
    router.get('/findAllBooks', async (req, res) => {
        const allBooks = await Book.find().populate('owner')
        res.send(allBooks)
    })
    //获取一本图书信息
    router.get('/findTheBook/:id', async (req, res) => {
        const theBook = await Book.findById(req.params.id).populate('owner')
        res.send(theBook)
    })

    //上传图书
    router.post('/uploadBook', async (req, res) => {
        const { name, category } = req.body
        if (!name) {
            return res.status(422).send({
                message: '请输入图书名称！'
            })
        } else {
            if (!category) {
                return res.status(422).send({
                    message: '请选择图书所属分类！'
                })
            } else {
                const theBook = await Book.create(req.body)
                res.send(theBook)
            }
        }
    })
    //获取分类
    router.get('/getAllCategory', async (req, res) => {
        const model = await Category.find()
        res.send(model)
    })
    //register
    router.post('/register', async (req, res) => {
        const { username, password } = req.body
        if (!username) {
            return res.status(422).send({
                message: '请输入用户名！'
            })
        }
        if (!password) {
            return res.status(422).send({
                message: '请输入密码！'
            })
        }
        const user = await User.findOne({ username })
        if (user) {
            return res.status(422).send({
                message: '用户已存在！'
            })
        } else {
            const model = await User.create(req.body)
            res.send(model)
        }
    })
    //获取个人信息
    router.get('/getPersonalInformation/:id', async (req, res) => {
        const model = await User.findById(req.params.id).populate('collect')
        res.send(model)
    })
    //修改个人信息
    router.put('/updatePersonalInformation/:id', async (req, res) => {
        const model = await User.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //注销用户
    router.delete('/deletePerson/:id', async (req, res) => {
        await User.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //login
    app.post('/web/api/login', async (req, res) => {
        const { username, password } = req.body
        if (!username) {
            return res.status(422).send({
                message: '请输入用户名！'
            })
        }
        if (!password) {
            return res.status(422).send({
                message: '请输入密码！'
            })
        }
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(422).send({
                message: '用户不存在！'
            })
        } else {
            if (user.password !== password) {
                return res.status(422).send({
                    message: '密码错误！'
                })
            } else {
                res.send(user)
            }
        }
    })
    //上传

    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/web/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    app.use('/web/api', router)
}