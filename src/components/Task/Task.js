import React from "react";
import { ReactComponent as Check} from "../../assets/images/check.svg";
import { ReactComponent as Delete} from "../../assets/images/delete.svg";
import "./Task.scss";
import { updateTask, deleteTask } from '../../actions/TaskAction';

export default function Task(props) {
    const { task, setReloadTask } = props;    
    
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

    const removeTask = () => {
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
                <Delete onClick={removeTask} />
            </div>
        </div>
    );
}