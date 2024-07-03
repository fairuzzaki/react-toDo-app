/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";


const Form = ({createTodo}) => {
    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        createTodo(value);
        setValue('')
    } 

    return (
        <form className="flex justify-center font-primary w-full mb-8" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="description"
                className="outline-none bg-transparent border border-gray-500 p-4 w-[300px] text-white rounded placeholder:text-gray-300" 
                placeholder="Input here..." 
                onChange={(e) => setValue(e.target.value)} 
                value={value}
            />
            <button className="bg-gray-500 border-none p-4 text-white cursor-pointer rounded ml-2">Add Task</button>
        </form>
    )
}

export default Form;