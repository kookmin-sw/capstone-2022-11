const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    character: {
        type: Number,
        default: 0
    },
    listName: {
        type: Array,
        default: ["uploadList"]
    },
    uploadList: {
        type: Array,
        default: []
    },
    preferredGenres: {
        type: Array,
        default: []
    },
    totalNum: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now
    },
    follow: {
        type: Array,
        default: []
    },
    follower: {
        type: Array,
        default: []
    },
}, {strict:false});

const User = mongoose.model("user", UserSchema);

module.exports = User;