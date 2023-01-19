import React, {useState, useEffect} from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import {map, size} from "lodash";
import AddTask from "./components/AddTask/AddTask";
import { getAllTask } from './actions/TaskAction';

import Task from "./components/Task";

import "./App.scss";

export default function App() {

  const [tasks, setTask] = useState(null);
  const [reloadTask, setRealoadTask] = useState(false);
  
  useEffect(() => {
    getAllTask().then(response => {      
      const arrayTasks = [];
      if (response.data.IsSuccess){
        setTask(response.data.Data);
      }
    });
    setRealoadTask(false);
  }, [reloadTask]);

  return (
    <Container fluid className="app">
      <div className="title">
        <h1>Sixto José Romero Martínez</h1>
      </div>
      <Row className="todo">
        <Col 
          className="todo__title"
          xs={{ span: 10, offset: 1}}
          md={{span: 6, offset: 3}}
        >
          <h2>Today</h2>
        </Col>
        <Col
          className="todo__list"
          xs={{ span: 10, offset: 1}}
          md={{span: 6, offset: 3}}>
          
          {!tasks ? (
            <div className="loading">
              <Spinner animation="border" />
              <span>Cargando...</span>
            </div>
          ) : size(tasks) === 0 ? (
            <h3>No hay tareas</h3>
          ) : (map(tasks, (task, index)=> <Task key={index} task={task} setReloadTask={setRealoadTask} />))}

        </Col>
        <Col
          className="todo__input"
          xs={{ span: 10, offset: 1}}
          md={{span: 6, offset: 3}}>
            <AddTask setReloadTask={setRealoadTask} />
        </Col>
      </Row>
    </Container>
  );
}