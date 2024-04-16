const Workout = require('../models/index').Workout
const User = require('../models/index').User

const workoutController = {
    createWorkout: async (req, res) => {
        try {
            const { date, type, description } = req.body
            const { userId } = req.user

            const newWorkout = await Workout.create({
                userId,
                date,
                type,
                description
            });

            res.status(201).json(newWorkout)

        } catch (err) {
            console.error('Error creating workout:', err)
            res.status(500).json({ message: 'Error while creating workout.' })
        }
    },

    getUserWorkouts: async (req, res) => {
        try {
            const { userId } = req.user
            const user = await User.findByPk(userId)

            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const userWorkouts = await user.getWorkouts()

            res.status(200).json({ message: 'Workouts fetched succesfully', userWorkouts })

        } catch (error) {
            console.error('Error finding user workouts:', error)
            res.status(500).json({ message: 'Error while finding user workouts.' })
        }
    },

    deleteWorkout: async (req, res) => {
        try {
            const { userId } = req.user
            const { workoutId } = req.params

            const user = await User.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const workout = await Workout.findOne({
                where: {
                    workoutId: workoutId,
                    userId: userId
                }
            })
            if (!workout) {
                return res.status(404).json({ message: 'Workout not found' })
            }

            await workout.destroy()

            res.status(200).json({ message: 'Workout deleted successfully' })

        } catch (error) {
            console.error('Error deleting workout:', error)
            res.status(500).json({ message: 'Error while deleting workout.' })
        }
    },

    updateWorkout: async (req, res) => {
        try {
            const { userId } = req.user
            const { workoutId } = req.params
            const { date, type, description } = req.body

            const user = await User.findByPk(userId)
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }

            const workout = await Workout.findOne({
                where: {
                    workoutId: workoutId,
                    userId: userId
                }
            })
            if (!workout) {
                return res.status(404).json({ message: 'Workout not found' })
            }

            await workout.update({
                date,
                type,
                description
            })

            res.status(200).json({ message: 'Workout updated successfully' })

        } catch (err) {
            console.error('Error updating workout:', error)
            res.status(500).json({ message: 'Error while updating workout.' })
        }
    }

}

module.exports = workoutController
