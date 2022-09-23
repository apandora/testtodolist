const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: false,
        type: String
    },
    position: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('Todo', todoSchema)