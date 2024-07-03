/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiFillEdit } from "react-icons/ai"
import { BsFillTrashFill } from "react-icons/bs"

const ToDo = ({todo, updateTodo, deleteTodo, doneTodo}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateTodo(todo.id, editedTodo);
        setIsEditing(false);
    };

    const handleStatus = (e) => {
        e.preventDefault();
        const updatedTodo = {
            ...editedTodo,
            isDone: e.target.checked
        }
        updateTodo(todo.id, updatedTodo);
    }

    return (
        <div className="flex justify-between items-center bg-violet-800 text-white py-3 px-4 rounded-md mb-1 cursor-pointer">
            {isEditing ? (
                <>
                <form>
                    <input
                    type="text"
                    className="outline-none border border-gray-500 text-black p-2 rounded placeholder:text-gray-300"
                    name="description"
                    value={editedTodo.description}
                    onChange={handleEditChange}
                    />
                </form>
              <div className="flex items-center gap-x-4">
                <button 
                    type="submit" 
                    className="bg-gray-500 border-none p-2 text-white cursor-pointer rounded"
                    onClick={handleEditSubmit}
                    >Save</button>
              </div>
              </>
            ) : (
                <>
                <p className={"font-primary " + (todo.isDone && 'line-through')}>{todo.description}</p>
                <div className="flex items-center gap-x-4">
                    <input type="checkbox" name="isDone" checked={todo.isDone} onChange={handleStatus}/>
                    <AiFillEdit className="text-xl" onClick={() => setIsEditing(true)}/>
                    <BsFillTrashFill className="text-xl" onClick={() => deleteTodo(todo.id)} />
                </div>
                </>
            )}
        </div>
    )
}

export default ToDo