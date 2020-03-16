const User = require('../models/User')
const MessageGroup = require('../models/MessageGroup')
const Message = require('../models/Message')

// @desc Creates Message => Required: receiver username
// @route POST api/messages/create
// @access PRIVATE
createMessage = (req, res) => {
    const { text, receiver } = req.body;
    const { username, id } = req.user // Data from token

    // Validation
    if (!text || !receiver || text === '') {
        return res.status(400).json({ msg: 'Enter a message or receiver\'s username'});
    }

    User.findOne({username: receiver})
    .then(receiver => {
        if(!receiver) {
            return res.status(404).json({
                msg: 'Person attempting to send to is not found!'
            })   
        }

        const message = new Message({
            text: req.body.text,
            sender: id,
            receiver: receiver._id,
        })
        message.save()
        .then( () => {
            return res.status(201).json({
                msg: `Message created: (${text}). From: (${username}). To: (${receiver.username})`,
                msgId: message._id,
            })
        })
        .catch( error => {
            return res.status(400).json({
                error: error.message,
                msg: 'Message Failed to send'
            })
        })
    }).catch(err => {
        return err
    });
}

// @desc Adds Message to Reciever and Sender's Conversation 
//      * Required: id of created message
// @route POST api/messages/send
// @access PRIVATE
sendMessage = (req, res) => {
    const { id } = req.body

    Message.findOne({ _id: id })
    .then(message => {
        if(!message){
            return res.status(404).json({
                msg: 'Message not found!'
            })
        }

        // Function that finds User and adds conversation or message from sender
        const insertMessageToUser = (userToFindId, messageHolderId) => {
            // Find user who holds the message
            User.findOne({ _id: userToFindId })
            .then(user => {
                user.populate('conversations').execPopulate((err, populatedUser) => {
                    if(err) return (err);

                    // Finds messages from sender or receiver and if there's none it starts new convo
                    const conversation = populatedUser.conversations.find(group => {
                        if(!group.holders) { // Checks if grabbing messages instead of holder
                            return false 
                        }
                        if(group.holders.length === 0) { // In case holders are empty
                            return false
                        }
                        const holderOne = group.holders[0].toString() === messageHolderId
                        const holderTwo = group.holders[1].toString() === messageHolderId
                        return holderOne || holderTwo
                    })

                    if(!conversation) {
                        const group = MessageGroup({
                            messages: message._id,
                            holders: [message.receiver, message.sender]
                        })
                        populatedUser.conversations.push(group._id)
                        group.save()
                    } else {
                        conversation.messages.push(message._id)
                        conversation.save()
                    }

                    populatedUser.save()
                })
            })
        }

        insertMessageToUser(message.sender, message.receiver.toString())
        insertMessageToUser(message.receiver, message.sender.toString())

        res.status(201).json({
            msg: `Message sent: (${message.text}). From: (${message.sender}). To: (${message.receiver})`,
        })
    })
}

// @desc Returns Messages From Two Person Conversation 
//      * Required: id of conversation (from MessageGroup model)
// @route POST api/messages/view
// @access PRIVATE
showConversation = (req, res) => {
    // Note: Any logged user can view conversation if they have the conversation id
    //       Later add logic for only conversation holders to view conversation
    const { id } = req.body
    MessageGroup.findOne({_id: id}).then(conversation => {
        if(!conversation) {
            return res.status(404).json({
                msg: 'Group not found!'
            })
        }
        conversation.populate('messages').execPopulate((err, populatedConvo) => {
            res.status(201).json({
                conversation: populatedConvo
            })
        })
    })
}

// @desc Returns Overview of All Conversations of a User 
//      * Required: User Token
// @route POST api/messages/all
// @access PRIVATE
viewConversations = (req, res) => {
    // Note: Someone with a token can view all brief messages, add better auth later
    const { username } = req.user // Data from token
    User.findOne({username})
    .then(user => {
        if(!user){
            return res.status(404).json({msg: 'User not found!'})
        }

        // Populates conversations, and then populates messages, sender and receiver respectively
        user.populate(
            { path: 'conversations', populate: [
                { path: 'messages', select: ['text', 'sentAt', 'receiver'], 
                    options: { sort: { sentAt: -1 }, limit: 1 }
                },
                { path: 'holders', select: 'username' }
            ]}
        )
        .execPopulate((err, populatedUser) => {
            const conversations = populatedUser.conversations
            return res.status(201).json(conversations)
        })

    })
}

module.exports = {
    createMessage,
    sendMessage,
    showConversation,
    viewConversations,
}