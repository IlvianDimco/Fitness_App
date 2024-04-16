const express = require('express')
const workoutController = require('../controllers/workoutController')
const jwt = require('../middleware/jwt')
const router = express.Router()

router.use(jwt);

router.post('/createWorkout', workoutController.createWorkout)
router.get('/getUserWorkouts', workoutController.getUserWorkouts)
router.delete('/deleteWorkout/:workoutId', workoutController.deleteWorkout)
router.put('/updateWorkout/:workoutId', workoutController.updateWorkout)

module.exports = router