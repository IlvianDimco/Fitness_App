const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'idimco@ritech.co',
        pass: 'Ilvian1993'
    }
})

const emails = {
    sendLoginEmail: async (email) => {
        try {
            const mailOptions = {
                from: 'idimco@ritech.co',
                to: email,
                subject: 'Login Notification',
                text: 'You have successfully logged in to your account.'
            }
    
            await transporter.sendMail(mailOptions)
            console.log('Login email sent successfully.')
        } catch (error) {
            console.error('Error sending login notification email:', error)
            throw error
        }
    }
}

module.exports = emails