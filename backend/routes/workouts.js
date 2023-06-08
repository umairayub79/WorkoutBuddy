const express = require('express')

const router = express.Router()

// GET all workouts
router.get('/', (req, res) => {
    res.json({ message: "GET all workouts" })
})

// GET sigle workout
router.get('/:id', (req, res) => {
    res.json({ message: "GET single workout" })
})

// POST a new workout
router.post('/', (req, res) => {
    res.json({ message: "POST a new work out" })
})

// DELETE a workout
router.delete('/:id', (req, res) => {
    res.json({ message: "DELETE a work out" })
})

// UPDATE a workout
router.patch('/:id', (req, res) => {
    res.json({ message: "UPDATE a work out" })
})

module.exports = router