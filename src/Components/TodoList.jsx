import React, { useState } from "react";
import "./style.css";
import Icons from "./Icons";
import Icon2 from "./Icon2";
import { motion, AnimatePresence } from "framer-motion";

function TodoList() {
    const [task, setTask] = useState([]);
    const [compTask, setCompTask] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editValue, setEditValue] = useState("");

    const addTodo = () => {
        const value = document.getElementById("inputF").value;
        if (value.trim() === "") return;
        setTask((v) => [...v, value]);
        document.getElementById("inputF").value = "";
    };

    const removeTodo = (index) => {
        const newTask = task.filter((_, i) => i !== index);
        setTask(newTask);
    };

    const addComp = (index) => {
        const comTask = task.filter((_, i) => i === index);
        setCompTask((v) => [...v, ...comTask]);
        removeTodo(index);
    };

    const clrComp = () => {
        setCompTask([]);
    };

    const startEdit = (index) => {
        setEditIndex(index);
        setEditValue(task[index]);
    };

    const saveEdit = () => {
        if (editValue.trim() === "") return;
        const updatedTasks = task.map((val, i) => (i === editIndex ? editValue : val));
        setTask(updatedTasks);
        setEditIndex(-1);
        setEditValue("");
    };

    return (
        <div className="todoList">
            <h1>Taskly</h1>

            <input type="text" name="task" id="inputF" placeholder="Enter todo" />
            <button type="button" id="addBtn" onClick={addTodo}>
                Add
            </button>

            <div>
                <AnimatePresence>
                    {task.map((val, index) => (
                        <motion.div
                            className="Todo"
                            key={index}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            layout
                        >
                            {editIndex === index ? (
                                <div className="editSection">
                                    <input
                                        className="editIn"
                                        type="text"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                    <div>
                                        <button className="save" onClick={saveEdit}>Save</button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Icon2 />
                                    <p>{val}</p>
                                    <div className="actions">
                                        <button className="edit" onClick={() => startEdit(index)}>
                                            <Icons />
                                        </button>
                                        <button className="dn" onClick={() => addComp(index)}>
                                            Done
                                        </button>
                                        <button className="rmv" onClick={() => removeTodo(index)}>
                                            Remove
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="compTask">
                {compTask.length > 0 && (
                    <>
                        <h3>
                            Completed Tasks
                            <button className="clrComp" onClick={clrComp}>
                                Clear
                            </button>
                        </h3>
                        <ol>
                            <AnimatePresence>
                                {compTask.map((val, index) => (
                                    <motion.div
                                        className="TodoComp"
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        layout
                                    >
                                        <p>{val}</p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </ol>
                    </>
                )}
            </div>
        </div>
    );
}

export default TodoList;
