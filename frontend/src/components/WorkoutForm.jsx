import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import axios from 'axios'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps }

        try {
            const response = await axios.post("http://localhost:4000/api/workouts", workout, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.status === 200) {
                setError(null)
                setTitle('')
                setLoad('')
                setReps('')
                dispatch({type: 'CREATE_WORKOUT', payload: workout})
            }
        } catch (error) {
            if (error.response) {
                const { data } = error.response
                setError(data.error)
            } else {
                console.log('Error adding workout:', error)
            }
        }
    }

    return (
        <form className='create' onSubmit={handleSubmit}>
            <h3>Add a new Workout</h3>

            <label>Exercise Title:</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title} />

            <label>Load (in kg):</label>
            <input type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load} />

            <label>Reps:</label>
            <input type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps} />

            <button type='submit'>Add</button>
        </form>
    )
}

export default WorkoutForm