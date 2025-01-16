import { Link, Route, Routes } from "react-router";
import React from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskEdit from "./TaskEdit";

function AccessRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TaskList />} />
      <Route path="/taskForm" element={<TaskForm />} />
      <Route path="/:Id" element={<TaskEdit />} />
    </Routes>
  );
}

export default AccessRoutes;
