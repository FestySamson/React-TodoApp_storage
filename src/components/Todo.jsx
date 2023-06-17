import React, { useState, useEffect } from 'react';
import Dexie from 'dexie';
import './todo.css'

const db = new Dexie('TodoDB');
db.version(1).stores({
  todos: '++id, text, completed',
});

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const todos = await db.todos.toArray();
      setTodos(todos);
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveTodo = async (todo) => {
    try {
      await db.todos.add(todo);
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await db.todos.delete(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completeTodo = async (id) => {
    try {
      const todo = await db.todos.get(id);
      todo.completed = !todo.completed;
      await db.todos.put(todo);
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: todo.completed } : t))
      );
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') return;
    const todo = {
      text: newTodo,
      completed: false,
    };
    try {
      const id = await saveTodo(todo);
      setTodos([...todos, { id, ...todo }]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCompleteTodo = async (id) => {
    try {
      await completeTodo(id);
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <h2>My Todos</h2>
      </div>

      <div className="input">
          <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Enter a new todo"
          />
          <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <div className="lists">
         
            
              {todos.map((todo) => (
                <div className='li' key={todo.id} >
                  <div>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleCompleteTodo(todo.id)}
                    />
                  </div>

                  <div>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                      {todo.text}
                    </span>
                  </div>

                  <button onClick={() => handleDeleteTodo(todo.id)}>X</button>
              </div>
              ))}

      </div>
    </div>
  );
};

export default Todo;
