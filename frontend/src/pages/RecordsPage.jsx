import React, { useState, useEffect, useContext } from "react";
import AddWorkoutModal from "../components/modals/AddWorkoutModal";
import { AuthContext } from "../context/Auth/AuthContext";
import useToast from "../hooks/useToast";
import { Button, Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
import axios from "axios";

function RecordsPage() {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // New state for loading
  const { state } = useContext(AuthContext);
  const showToast = useToast();
  const [selectedRecord, setSelectedRecord] = useState({})

  const fetchRecords = async () => {
    try {
      const response = await axios.get("/api/v1/workouts", {
        headers: {
          Authorization: `Bearer ${state?.token}`,
        },
      });
      setRecords(response.data);
    } catch (error) {
      console.error(error);
      showToast({ type: "error", message: "Failed to fetch records." });
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or failure
    }
  };
  
  useEffect(() => {
    if (state?.token) {
      fetchRecords();
    }
  }, [state?.token]);

  const handleDelete = async (recordId) => {
    try {
      await axios.delete(`/api/v1/workouts/${recordId}`, {
        headers: {
          Authorization: `Bearer ${state?.token}`,
        },
      });
      setRecords(records.filter(record => record._id !== recordId));
      showToast("success","Record deleted successfully.", 100, 2000);
    } catch (error) {
      console.error(error);
      showToast("error","Failed to delete record.", 100, 200);
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record)
    openModal()
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchRecords()
  };

  return (
    <div className="p-8">
      <Card className="p-4">
          <Typography variant="h5" color="blue-gray" className="mb-2">
          Add a Workout Record
        </Typography>
          <p className="text-gray-600 mb-4">
            Click the button below to add a new workout record.
          </p>
          <Button
            color="blue"
            size="md"
            onClick={openModal}
          >
            Add Workout
          </Button>
      </Card>
      <AddWorkoutModal
        isOpen={isModalOpen}
        onClose={closeModal}
        recordData={selectedRecord}
      />

      {isLoading ? ( // Dissecondplay a loading spinner while loading
        <div className="flex justify-center mt-8">
          <Spinner color="blue" size="large" />
        </div>
      ) : (
        <div className="mt-8">
          {records.map((item) => (
           <div key={item._id} className="border p-4 mb-4">
           <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
           <p>Reps: {item.reps}</p>
           <p>Load: {item.load}</p>
           <div className="flex gap-3">
           <button
             onClick={() => handleDelete(item._id)}
             className="bg-red-500 text-white px-2 py-1 mt-2 rounded"
           >
             Delete
           </button>
           <button
             onClick={() => handleEdit(item)}
             className="bg-blue-500 text-white px-2 py-1 mt-2 rounded"
           >
             Edit
           </button>
           </div>
         </div>         
          ))}
        </div>
      )}
    </div>
  );
}

export default RecordsPage;