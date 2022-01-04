const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        default: 'http://localhost:3000/uploads/69c0b7739612d175fe4c6b7d89367a3a'
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        res:'Category'
    },
    body: {
        type: String,
        default:'无'
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    content:{
        type:String,
        default:'http://49.234.78.16/filePDF/NodeJs.pdf'
    },
})


module.exports = mongoose.model('Book', schema)