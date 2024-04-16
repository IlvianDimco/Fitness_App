const express = require('express')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/userRoutes')
const workoutRoutes = require('./routes/workoutRoutes')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/workout', workoutRoutes)

app.listen(5050, () => {
        console.log(`Server is running on port 5050`)
})