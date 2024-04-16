const User = require('../models/index').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const emails = require('../middleware/emails')

const auth = {

    register: async (req, res) => {
        try {
            const { username, email, password, confirmPassword } = req.body

            const checkUser = await User.findOne({ where: { email } })
            if (checkUser) {
                return res.status(400).json({ message: 'This email address already exists' })
            }

            if (password !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords dont match.' })
            }

            const hashedPass = await bcrypt.hash(password, 10)

            const newUser = await User.create({
                username,
                email,
                password: hashedPass,
            })
            console.log('User registered successfully:', newUser)
            res.status(201).json(newUser)

        } catch (err) {
            console.error('Error registering user:', err)
            res.status(500).json({ message: 'Error while registering user.' })
        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(401).json({ message: 'Invalid email.' })
            }

            const checkPass = await bcrypt.compare(password, user.password)
            if (!checkPass) {
                return res.status(401).json({ message: 'Invalid password.' })
            }

            const token = jwt.sign({ user }, 'ID 03-12-1993', { expiresIn: '1h' })

            await emails.sendLoginEmail(email)

            res.cookie("token", token, { httpOnly: true })
            return res.status(200).json({ message: 'Login successful.', token })

        } catch (err) {
            console.error('Error logging in:', err)
            res.status(500).json({ message: 'Error while logging in.' })
        }
    },

    forgotPassword: async (req, res) => {
        try {
            const { email, newPassword } = req.body

            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(404).json({ message: 'User not found.' })
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10)
            user.password = hashedNewPassword
            await user.save()

            res.status(200).json({ message: 'Password updated successfully.' })
        } catch (err) {
            console.error('Error updating password:', err)
            res.status(500).json({ message: 'Error updating password.' })
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie("token")
            res.status(200).json({ message: 'Logout successful.' })
        } catch (err) {
            console.error('Error logging out:', err)
            res.status(500).json({ message: 'Error logging out.' })
        }
    },

    deleteUser: async (req, res) => {
        try {
            const { userId } = req.user
            const user = await User.findOne({ where: { userId }})
            console.log('---------------', user)
            if (!user) {
                return res.status(404).json({ message: 'User not found.'})
            }

            await user.destroy()
            res.status(200).json({ message: 'User deleted'})
        } catch (err) {
            console.error('Error deleting user.', err)
            res.status(500).json({ message: 'Error deleting user.'})
        }
    }
}

module.exports = auth