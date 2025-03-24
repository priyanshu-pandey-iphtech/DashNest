import React, { useState } from "react";
import "../assets/todo.css";
import plusIcon from "../assets/plus.png";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";

export const Todo = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);


    const addNewTask = () => {
        const newTask = { id: tasks.length + 1, text: "", description: "", isNew: true };

        setTasks((prevTasks) => [...prevTasks, newTask]); // Always add new tasks at the end
    };

    // Function to update task text and description
    const updateTaskText = (id, newText, newDescription) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: newText, description: newDescription, isNew: false } : task
        ));
        setIsEditing(false);
    };

    // Function to delete task
    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
        setIsEditing(false);
    };

    return (
        <>

            <div className="bckbtn">
                <button className='back_btn_todo' onClick={() => navigate("/cards")}> <IoChevronBack />Back</button>
            </div>
            <div className="heading_container">

                <h1>Todo List</h1>
            </div>

            <div className="todo_container">
                {/* Render task cards first */}
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        updateTaskText={updateTaskText}
                        deleteTask={deleteTask}
                    />
                ))}

                {/* Move "Add New Task" button to the end */}
                <div className="todo_card add_card" onClick={addNewTask}>
                    <img src={plusIcon} alt="Add Task" className="plus_icon" />
                </div>
            </div>
        </>
    );
};

// TaskCard component (starts in edit mode if new)
const TaskCard = ({ task, updateTaskText, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(task.isNew);
    const [inputValue, setInputValue] = useState(task.text);
    const [description, setDescription] = useState(task.description);
    const [showMenu, setShowMenu] = useState(false);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };


    const handleSave = () => {
        if (inputValue.trim() === "" && description.trim() === "") return; // Prevent empty tasks
        const formattedDescription = description.replace(/\n/g, "<br>");
        updateTaskText(task.id, inputValue, formattedDescription);
        setIsEditing(false);
        setShowMenu(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setShowMenu(false); // Hide menu when entering edit mode
    };

    return (
        <div className="todo_card">
            {/* Three-dot menu */}
            <div className="menu_container">
                <button className="menu_button" onClick={() => setShowMenu(!showMenu)}>⋮</button>
                {showMenu && (
                    <div className="menu_dropdown">
                        {!isEditing && <button onClick={handleEdit}>Edit</button>}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </div>
                )}
            </div>

            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Task Heading"
                        className={`task_input ${isEditing && !task.isNew ? "editing" : ""}`}
                        autoFocus
                        maxLength={20}
                    />
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter tasks here..."
                        className={`task_textarea ${isEditing && !task.isNew ? "editing" : ""}`}
                        rows="3"
                    />
                    <button className="update_button" onClick={handleSave}>
                        {task.isNew ? "Create" : "Update"}
                    </button>
                </>
            ) : (
                <>
                    <p>{task.text}</p>
                    <small dangerouslySetInnerHTML={{ __html: task.description }}></small>

                </>
            )}
        </div>
    );
};

export default Todo;