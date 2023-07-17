const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const auth = async (req, res, next) => {
    const headers = req.header('authorization').split(' ')
    const token = headers[1]
    try {
        const decodedCredentials = jwt.verify(token, 'cssr')
        const user = await User.findOne({_id: decodedCredentials.id, 'tokens.token': token})
        if(!user) {
            throw new Error('No auth token found')
        }
        req.token = token
        req.user = user
        next()
    } catch (error) {
        return res.status(403).send({message: error.message})
    }
}

module.exports = auth