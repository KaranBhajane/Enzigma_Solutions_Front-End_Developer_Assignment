import React, { createContext, useEffect, useState } from 'react'
export let taskContext = createContext()

function Task_Services({ children }) {
    const [taskData, setTaskData] = useState([])
    async function getData() {
        let data = await fetch("http://localhost:3000/Tasks");
        let orgData = await data.json();
        setTaskData(orgData);
    }

    useEffect(() => {

        getData()
    }, [taskData])



    return (
        <taskContext.Provider value={{ taskData }} >
            {children}

        </taskContext.Provider>
    )
}

export default Task_Services