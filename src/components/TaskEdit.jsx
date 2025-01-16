import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

const EditTask = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    assignedTo: "",
    status: "Not Started",
    dueDate: "",
    priority: "Normal",
    description: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/Tasks/${Id}`);
        if (response.ok) {
          const task = await response.json();
          setFormData({
            ...task,
            dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
          });
        } else {
          alert("Failed to fetch task data");
        }
      } catch (error) {
        console.error("Error fetching task data:", error);
      }
    };
    fetchTask();
  }, [Id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/Tasks/${Id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Task updated successfully");
        navigate(-1);
      } else {
        alert("Failed to update the task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100  p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full h-fit mx-auto p-6   border border-gray-400 shadow-md rounded-lg space-y-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl"
      >
        <h2 className="text-lg font-semibold text-gray-700">Edit Task</h2>

        <div className="space-y-2">
          <label className="block text-gray-600">Assigned To</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="">Select User</option>
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-600">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="space-y-2 ">
          <label className="block text-gray-600">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Save
          </button>

        </div>
      </form>
    </div>
  );
};

export default EditTask;
