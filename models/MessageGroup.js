const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("MessageGroup", MessageSchema);