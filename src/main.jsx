// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import Task_Services from "./context/Task_Services.jsx";


createRoot(document.getElementById("root")).render(
  // <StrictMode>

  <BrowserRouter>
    <Task_Services>
      <App />
    </Task_Services>
  </BrowserRouter>
  // </StrictMode>,
);
