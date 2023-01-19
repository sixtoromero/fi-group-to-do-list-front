import React, { useState } from "react";
import { Form, Button} from "react-bootstrap";
import { ReactComponent as Send } from "../../assets/images/send.svg";
import { isEmpty } from "lodash";

import { registerTask } from '../../actions/TaskAction';

import "./AddTask.scss";



export default function AddTask(props) {
    const { setReloadTask } = props;
    const [task, setTask] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if (!isEmpty(task)){

            const model = {
                id: 0,
                nameTask: task,
                completed: false
            }

            registerTask(model).then(response => {
                console.log('Se registro exitosamente', response);
                if (response.data.IsSuccess){
                    setTask("");
                    setReloadTask(true);
                }
            });
        }
    }

    return (
        <Form onSubmit={onSubmit} className="add-task">
            <input 
                type="text" 
                placeholder="Nueva tarea..." 
                onChange={(e) => setTask(e.target.value)}
                value={task}
            />
            <Button type="submit">
                <Send />
            </Button>
        </Form>
    );
}

