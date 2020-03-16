const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    text: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Message", MessageSchema);