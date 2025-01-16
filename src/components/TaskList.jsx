import React, { useContext } from "react";
import { taskContext } from "../context/Task_Services";
import { Link, useNavigate } from "react-router-dom";

function TaskList() {
  const { taskData } = useContext(taskContext);
  const navigate = useNavigate();

  const newTaskBtn = () => {
    navigate("/taskForm");
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/Tasks/${id}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between  items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-700">Tasks</h1>
        <button
          onClick={newTaskBtn}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md shadow"
        >
          New Task
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        {taskData.length === 0 ? (
          <p className="text-center text-white font-medium py-4 bg-gray-500">
            There are no tasks to display. Create a New Task
          </p>
        ) : (
          ""
        )}
        <table className="w-full text-sm text-left text-gray-700 bg-white border border-gray-300">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Comments</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map(
              ({ id, assignedTo, status, dueDate, priority, description }) => (
                <tr key={id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{assignedTo}</td>
                  <td className="px-4 py-2">{status}</td>
                  <td className="px-4 py-2">{dueDate}</td>
                  <td className="px-4 py-2">{priority}</td>
                  <td className="px-4 py-2">{description}</td>
                  <td className="px-4 py-2 space-x-2">
                    <Link
                      to={`/${id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;
