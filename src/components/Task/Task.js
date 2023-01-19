import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import { ReactComponent as Check} from "../../assets/images/check.svg";
import { ReactComponent as Delete} from "../../assets/images/delete.svg";
import "./Task.scss";
import { updateTask, deleteTask } from '../../actions/TaskAction';

export default function Task(props) {
    const { task, setReloadTask } = props;    
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const completeTask = () => {        
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
    

    return (
        <div className="task">
            <div>
                <Check 
                    className={task.Completed ? "completed" : ""}
                    onClick={completeTask} />
            </div>
            <div>
                {task?.NameTask}
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
        </div>
        
    );
}