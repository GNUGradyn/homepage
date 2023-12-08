import "./TaskbarIcon.css"
import React from "react";

interface TaskbarIconProps {
    onclick: () => void
    icon: string
    name: string
    open: boolean
}

const TaskbarIcon: React.FC<TaskbarIconProps> = (props: TaskbarIconProps) => {
    return <div className={props.open ? "taskbar-icon selected" : "taskbar-icon"} onClick={props.onclick}>
        <div>
            <img src={props.icon}/>
            <p>{props.name}</p>
        </div>
    </div>
}

export default TaskbarIcon;