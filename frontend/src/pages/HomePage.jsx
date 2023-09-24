import React from "react";
import {Card, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <Card className="p-8 max-w-md">
      <Typography variant="h3" color="blue-gray" className="mb-4 text-center">
        Your Fitness Journey Starts Here!
      </Typography>
      <Typography color="blue-gray" className="mb-6 text-center">
        Log your workouts, track your progress, and achieve your fitness goals with ease.
      </Typography>
      <div className="flex justify-center space-x-4">
        <Link to="/signup" className="text-white">
          <button className="bg-blue-500 px-6 py-3 rounded-lg">Sign Up</button>
        </Link>
        <Link to="/login" className="text-white">
          <button className="bg-blue-500 px-6 py-3 rounded-lg">Log In</button>
        </Link>
      </div>
    </Card>
  </div>
  )
}

export default HomePage