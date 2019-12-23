import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'
const LOCAL_STORAGE_KEY = 'todoApp.todo'

function App() {
  //const [todos, setTodo] = useState([{id: 1, name: 'T1', completed: false}])
  const [todos, setTodo] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodo(storedTodos)
  }, [])

  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  },[todos] )

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodo(newTodos)
  }

  function handleClearTodo(){
    setTodo(todos.filter(x => !x.completed))
  }

  

  function handleAddTodo(e) {
      const name = todoNameRef.current.value
      if (name === '') return
      //console.log(name)
      setTodo(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, completed: false}]
      })
      todoNameRef.current.value = null
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodo}>Clear Todo</button>
    <div>{todos.filter(todo => !todo.completed).length} left to do</div>
    </>
  );
}

export default App;