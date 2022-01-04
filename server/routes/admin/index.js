module.exports = app => {
    const express = require("express")

    const router = express.Router()//express子路由

    const Book = require("../../models/Book")
    const User = require("../../models/User")
    const Category = require("../../models/Category")

    //新增图书
    router.post('/books', async (req, res) => {
        const model = await Book.create(req.body)
        res.send(model)
    })
    //BookList
    router.get('/books', async (req, res) => {
        const books = await Book.find().populate('owner')
        res.send(books)
    })

    //编辑图书
    router.get('/books/:id', async (req, res) => {
        const model = await Book.findById(req.params.id)
        res.send(model)
    })
    //修改图书
    router.put('/books/:id', async (req, res) => {
        const model = await Book.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    //删除图书
    router.delete('/books/:id', async (req, res) => {
        await Book.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //新增用户
    router.post('/users', async (req, res) => {
        const model = await User.create(req.body)
        res.send(model)
    })
    //UserList
    router.get('/users', async (req, res) => {
        const users = await User.find().limit(100)
        res.send(users)
    })
    //编辑用户
    router.get('/users/:id', async (req, res) => {
        const model = await User.findById(req.params.id).populate('collect')
        res.send(model)
    })
    //修改用户
    router.put('/users/:id', async (req, res) => {
        const model = await User.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除用户
    router.delete('/users/:id', async (req, res) => {
        await User.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    //新增分类
    router.post('/categories', async (req, res) => {
        const model = await Category.create(req.body)
        res.send(model)
    })

    //CategoryList
    router.get('/categories', async (req, res) => {
        const model = await Category.find()
        res.send(model)
    })
    //编辑分类
    router.get('/categories/:id', async (req, res) => {
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    //修改分类
    router.put('/categories/:id', async (req, res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })
    //删除分类
    router.delete('/categories/:id', async (req, res) => {
        await Category.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })
    //上传图片
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    //上传文件
    app.post('/admin/api/uploadFile', upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })
    //login
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        if (!username) {
            return res.status(422).send({
                message: '请输出用户名！'
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
                const jwt = require('jsonwebtoken')
                const token = jwt.sign({ id: user._id }, app.get('secret'))
                res.send({ token, user })
            }
        }
    })
    app.use('/admin/api', router)
}