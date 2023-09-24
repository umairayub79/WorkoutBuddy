import React, { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import useToast from "../../hooks/useToast";
import { AuthContext } from "../../context/Auth/AuthContext";
import axios from "axios";

const AddWorkoutDialog = ({ isOpen, onClose, recordData }) => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showToast = useToast();
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (recordData) {
      setTitle(recordData.title || "");
      setReps(recordData.reps || "");
      setLoad(recordData.load || "");
    }
  }, [recordData]);

  const handleClose = () => {
    setTitle("");
    setReps("");
    setLoad("");
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Allow only positive numbers
    const isValidInput = /^[+]?\d+(\.\d+)?$/.test(value);

    if (isValidInput) {
      if (name === "load") {
        setLoad(value);
      } else if (name === "reps") {
        setReps(value);
      }
    }
  };

  const handleSave = async () => {
    if (!state?.token) {
      showToast("error", "You must be logged in", 100, 2200);
      return;
    }

    try {
      setIsLoading(true);

      let response;

      if (recordData) {
        // Editing an existing record
        response = await axios.patch(
          `/api/v1/workouts/${recordData._id}`,
          { title, reps, load },
          {
            headers: {
              Authorization: `Bearer ${state?.token}`,
            },
          }
        );
      } else {
        // Adding a new record
        response = await axios.post(
          "/api/v1/workouts",
          { title, reps, load },
          {
            headers: {
              Authorization: `Bearer ${state?.token}`,
            },
          }
        );
      }

      if (response.status === 200) {
        showToast("success", "Workout saved", 100, 2000);
        handleClose();
      }
    } catch (error) {
      showToast(
        "error",
        error.response.status
          ? "All fields are required"
          : "Something went wrong",
        100,
        2200
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog size="sm" open={isOpen} handler={handleClose}>
      <DialogHeader>Add Workout Record</DialogHeader>
      <DialogBody>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            className="border rounded w-full py-2 px-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Reps
          </label>
          <input
            type="number"
            className="border rounded w-full py-2 px-3"
            onChange={handleInputChange}
            value={reps}
            name="reps"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Load (Kgs)
          </label>
          <input
            type="number"
            className="border rounded w-full py-2 px-3"
            onChange={handleInputChange}
            value={load}
            name="load"
          />
        </div>
      </DialogBody>
      <DialogFooter className="flex gap-3">
        <Button color="blue" onClick={handleSave} disabled={isLoading}>
          {isLoading ? (recordData ? "Updating..." : "Saving...") : "Save"}
        </Button>
        <Button color="gray" onClick={handleClose}>
          Cancel
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddWorkoutDialog;
