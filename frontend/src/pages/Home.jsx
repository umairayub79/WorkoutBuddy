import React, { useEffect, useState } from 'react'
import axios from 'axios';
import WorkoutDetails from '../components/WorkoutDetails';

const Home = () => {
  const [workouts, setWorkouts] = useState(null)

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/workouts");
        const { data } = response;

        if (response.status === 200) {
          setWorkouts(data);
        }
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
    </div>
  )
}

export default Home