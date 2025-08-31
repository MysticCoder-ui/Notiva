const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true,
    },
    tag: {
        type: "string"
    },
})

module.exports = mongoose.model('Notes', notesSchema);