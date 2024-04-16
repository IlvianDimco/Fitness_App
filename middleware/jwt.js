const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: 'Access denied' })
    try {
        const decoded = jwt.verify(token, 'ID 03-12-1993')
        console.log('Decoded token outside middleware:', (decoded.user))

        // arrFromObj = Object.entries(decoded.user)
        // const [key1, value1] = arrFromObj[0]
        // const decodedUserId = { [key1]: value1}
        // console.log(decodedUserId)
        // req.user = decodedUserId

        // const payload  = [
        //     { userId: decoded.user.userId},
        //     { username: decoded.user.username},
        //     { email: decoded.user.email},
        //     { password: decoded.user.password},
        // ]
        // console.log('-----------', payload[0])
        // req.user = payload[0]

        const { userId, username, email } = decoded.user
        const payload = { userId, username, email }
        req.user = payload
        next()

    } catch (error) {
        console.error('Error verifying token:', error)
        res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = verifyToken