const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const Art = module.exports = mongoose.model('Articles', schema);