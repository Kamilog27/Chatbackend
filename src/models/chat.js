const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    adminNickname: {
        type: String,
        required: true
    },
    users: [
        {
            email: {
                type: String,
                required: true,
                match: RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            },
            nickname: {
                type: String,
                required: true,
                maxlength: 15
            },
            imageUrl: {
                type: String
            }
        }
    ],
    messages: [
        {
            id: {
                type: String,
                required: true
            },
            sender: {
                email: {
                    type: String,
                    required: true,
                    match: RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                },
                nickname: {
                    type: String,
                    required: true,
                    maxlength: 15
                },
                imageUrl: {
                    type: String
                }
            },
            date: {
                type: Number,
                required: true
            },
            body: {
                type: String,
                required: true,
            }
        }
    ]
})

const Chat = mongoose.model("Chat", chatSchema)
module.exports = Chat