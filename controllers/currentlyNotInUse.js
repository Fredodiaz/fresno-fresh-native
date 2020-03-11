// Functions I may use later on, but don't want commented in one file.

// @desc Gets user based of id
// @route GET api/user/users
getUsers = async (req, res) => {
    const { body } = req

    await User.find({}, (err, users) => {
        if(err) {
            return res.status(400).json({success: false, error: err})
        }
        if(!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

// @desc Deletes user based of id
// @route DELETE api/user/duser/:id
deleteUser = async (req, res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if(err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}