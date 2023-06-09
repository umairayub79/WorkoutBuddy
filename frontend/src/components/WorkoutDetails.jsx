import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import axios from 'axios'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/workouts/${workout._id}`);
      const json = response.data;
  
      if (response.status === 200) {
        dispatch({ type: 'DELETE_WORKOUT', payload: json });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>delete</span>

    </div>
  )
}

export default WorkoutDetails