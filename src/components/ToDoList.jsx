/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from 'axios';
import Form from "./Form";
import ToDo from "./ToDo";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7030/api/ToDoes')
          .then(response => setTodos(response.data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);
    
    // useEffect(() => {
    // fetch('https://localhost:7030/api/ToDoes')
    //     .then(response => response.json())
    //     .then(data => setTodos(data))
    //     .catch(error => {
    //     console.error('There was an error fetching the todos!', error);
    //     });
    // }, []);

    const createTodo = (todo) => {
        const newToDo = {
            description: todo,
            isDone:false
        }
        axios.post('https://localhost:7030/api/ToDoes', newToDo)
        .then(response => {
            setTodos([...todos, response.data]);
        });
    };
    
    const updateTodo = (id, updatedTodo) => {
        axios.put(`https://localhost:7030/api/ToDoes/update/${id}`, updatedTodo)
            .then(response => {
                setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
            });
    };

    const deleteTodo = (id) => {
        axios.delete(`https://localhost:7030/api/ToDoes/${id}`)
          .then(() => {
            setTodos(todos.filter(todo => todo.id !== id));
          });
      };
    
    const statusTodo = (id, updatedTodo) => {
    axios.put(`https://localhost:7030/api/ToDoes/update/${id}`, updatedTodo)
        .then(response => {
            setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
        });
    };

    return (
        <>
        <div className="bg-gray-700 p-8 rounded-3xl mx-2 sm:mx-20 mt-20">
            <div className="text-center">
                <h1 className="mb-6 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">To Do List</h1>
            </div>
            <Form createTodo={createTodo} />
            {todos.map((todo, idx) => (
                <ToDo 
                    todo={todo} 
                    key={idx} 
                    updateTodo={updateTodo}
                    deleteTodo={deleteTodo}
                    doneTodo={statusTodo}
                />
            ))}
        </div>
        </>
    )
}

export default ToDoList;