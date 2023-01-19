import React, { useState } from "react";

import { ReactComponent as Check} from "../../assets/images/check.svg";
import { ReactComponent as Delete} from "../../assets/images/delete.svg";
import "./Task.scss";
import { updateTask, deleteTask } from '../../actions/TaskAction';

import { Form, Modal, Button, InputGroup } from "react-bootstrap";

export default function Task(props) {
    const { task, setReloadTask } = props;    
    const [taskName, setTaskName] = useState("");
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(false);

    const changeStateTask = () => {        
        const model = {
            id: task.Id,
            nameTask: task.NameTask,
            completed: !task.Completed
        }

        updateTask(model).then(response => {            
            if (response.data.IsSuccess){                
                setReloadTask(true);
            }
        });
    }

    const updateTaskName = () => {        
        const model = {
            id: task.Id,
            nameTask: taskName,
            completed: task.Completed
        }
        
        updateTask(model).then(response => {            
            if (response.data.IsSuccess){                
                setReloadTask(true);
                setShowEdit(false);
            }
        });
    }    

    const confirmRemove = ()=>{
        setShow(true);
    }

    const removeTask = () => {        
        
        handleClose();

        deleteTask(task.Id).then(response => {            
            if (response.data.IsSuccess){                
                setReloadTask(true);
            }
        });
    }

    const confirEdit = (taskName) => {        
        setTaskName(taskName);
        setShowEdit(true);
    }

    return (
        <div className="task">
            <div>
                <Check 
                    className={task.Completed ? "completed" : ""}
                    onClick={changeStateTask} />
            </div>
            <div>
                <Button variant="link" onClick={() => {confirEdit(task?.NameTask)}}>{task?.NameTask}</Button>
            </div>
            <div>
                <Delete onClick={confirmRemove} />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Eliminar tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>Está seguro de eliminar el registro?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={removeTask}>
                    Aceptar
                </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                <Modal.Title>Actualizar tarea</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input 
                        type="text"
                        onChange={(e) => setTaskName(e.target.value)}
                        value={taskName}
                    />
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseEdit}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={updateTaskName}>
                    Aceptar
                </Button>
                </Modal.Footer>
            </Modal>

        </div>
        
    );
}