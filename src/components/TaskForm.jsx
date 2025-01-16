import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { taskContext } from "../context/Task_Services";

const TodoForm = () => {

    let { taskData } = useContext(taskContext)

    const [formData, setFormData] = useState({
        assignedTo: "",
        status: "",
        dueDate: "",
        priority: "",
        description: "",
    });
    const [taskFormData, setTaskFormData] = useState([formData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    console.log(formData);




    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Task Data:", formData);
        await fetch("http://localhost:3000/Tasks", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        })

        alert("Task Successfully Added!")

    };

    const handleCancel = () => {
        setFormData({
            assignedTo: "",
            status: "Not Started",
            dueDate: "",
            priority: "Normal",
            description: "",
        });
    };

    return (
        <div className="border  bg-slate-100 p-2 w-full ">

            <form
                onSubmit={handleSubmit}
                className="max-w-md w-full h-fit mx-auto p-6   border border-gray-400 shadow-md rounded-lg space-y-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl"
            >
                <h2 className="text-lg font-semibold text-gray-700">New Task</h2>
                <div className="space-y-2">
                    <label className="block text-gray-600">Assigned To</label>
                    <select
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
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
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
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
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-gray-600">Priority</label>
                    <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
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
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-yellow-400"
                        required
                    ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full sm:w-auto bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                        Save
                    </button>
                       
                </div>

            </form>



        </div>
    );
};

export default TodoForm;
