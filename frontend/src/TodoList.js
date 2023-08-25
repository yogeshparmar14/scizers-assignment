
import React, { useEffect, useState } from 'react';
const TodoList = ({ tasks, deleteTask, updateTitle, search }) => {
     const [itemTasks, setItemTasks] = useState([])
    const [sortedTasks, setSortedTasks] = useState([])
   const [searchInput,setSearchInput]= useState("")
    useEffect(() => {
        if (tasks) {
            const currentItems = tasks.slice(0, 3);
            setSortedTasks(currentItems)
            setItemTasks(tasks)
        }
    }, [tasks])



    return (
        <div>
            <div className="todo-list">
                <div style={{
                    position: "relative",
                    top: "-10px"
                }}>
                    <input
                        type="text"
                        placeholder="Search tasks by Name or Mobile"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button style={{
                        marginLeft: "20px",
                        "padding": "0px 15px 0px 18px",
                        "position": "absolute"
                    }}
                    onClick={()=>{search(searchInput)}}
                    >Search</button>
                </div>
                {sortedTasks.map((task, index) => (
                    <div key={task._id} className="task-item">
                        <h3>{task.contactName}</h3>
                        <p>{task.mobileNumber}</p>
                        <div className="task-buttons">
                            <button onClick={() => { updateTitle(task) }}>
                                edit
                            </button>
                            <button onClick={() => deleteTask(task._id)}>Delete</button>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default TodoList;



