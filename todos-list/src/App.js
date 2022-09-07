import "./App.css";
import Header from "./MyComponents/Header";
import { Todos } from "./MyComponents/Todos";
import { Footer } from "./MyComponents/Footer";
import { AddTodo } from "./MyComponents/AddTodo";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { About } from "./MyComponents/About";

console.log("0000000000000000");
function App() {
  let initTodo;
  console.log("111111111111");
  if (localStorage.getItem("todos") === null) {
    console.log("222222222222");
    initTodo = [];
  } else {
    console.log("33333333333333");
    initTodo = JSON.parse(localStorage.getItem("todos"));
    console.log(initTodo);
  }
  const onDelete = (todo) => {
    console.log("444444444444444444", todo);
    // Deleting this way in react does not work
    // let index = todos.indexOf(todo);
    // todos.splice(index, 1);
    setTodos(
      todos.filter((e) => {
        return e !== todo;
      })
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const addTodo = (title, desc) => {
    console.log("555555555555555555", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;
    }
    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    };
    setTodos([...todos, myTodo]);
    console.log(myTodo, "myTodoooooooooooo");
  };
  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    console.log("66666666666666666666");
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <AddTodo addTodo={addTodo} />
                <Todos todos={todos} onDelete={onDelete} />
              </>
            }
            // render={() => {
            //   return (
            // <>
            //   <AddTodo addTodo={addTodo} />
            //   <Todos todos={todos} onDelete={onDelete} />
            // </>
            //   );
            // }}
          />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
