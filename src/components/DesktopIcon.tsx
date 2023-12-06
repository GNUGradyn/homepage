import "./DesktopIcon.css"
import Draggable from "./Draggable";

interface DesktopIconProps {
    name: string
    icon: string
}

const DesktopIcon = (props: DesktopIconProps) => {
    return <Draggable>
        <div className="desktop-icon">
            <img src={props.icon}/>
            <p>{props.name}</p>
        </div>
    </Draggable>
}

export default DesktopIcon;