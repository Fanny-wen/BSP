const mongoose = require('mongoose')
const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        select: true,
        required: true
    },
    nickname:{
        type:String,
        default:'我是一只小猫咪'
    },
    photo: {
        type: String,
        default: 'http://localhost:3000/uploads/354feea69f53966a623379f6e850a84b'
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    collect:[{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Book',
    }]
    
})

module.exports = mongoose.model('User', schema)