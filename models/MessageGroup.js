const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    holders: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model("MessageGroup", MessageSchema);